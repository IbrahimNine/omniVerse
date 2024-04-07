const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenVerification = async (req, res, next) => {
  const token = req.cookies?.token;
  const refreshToken = req.cookies?.refreshToken;
  if (!token && !refreshToken) {
    return res.json({ status: "fail", message: "Token not provided" });
  }
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      req.user = decoded;
      next();
    } else if (refreshToken) {
      const decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY
      );
      const newToken = jwt.sign(
        { _id: decodedRefreshToken._id },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.cookie("token", newToken, {
        maxAge: 3600000, // 1 hour
        httpOnly: true,
        secure: true,
      });
      req.user = decodedRefreshToken;
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

module.exports = tokenVerification;
