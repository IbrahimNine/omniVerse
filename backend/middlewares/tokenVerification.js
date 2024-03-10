const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenVerification = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res
      .status(401)
      .json({ status: "fail", message: "Token not provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const newToken = jwt.sign(
      { _id: decoded._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.cookie("token", newToken, {
      maxAge: 86400000,
      httpOnly: true,
      secure: true,
    });
    next();
  } catch (error) {
    return res.status(401).json({ status: "fail", message: "Invalid token" });
  }
};

module.exports = tokenVerification;
