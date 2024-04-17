const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { topGenresPipeline } = require("../utils/DataPipelines");
require("dotenv").config();

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const searchedUser = await userModel.findOne({ email: email });
    if (searchedUser) {
      const passwordMatch = await bcrypt.compare(
        password,
        searchedUser.password
      );
      if (passwordMatch) {
        const token = jwt.sign(
          { _id: searchedUser._id },
          process.env.TOKEN_SECRET_KEY,
          { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
          { _id: searchedUser._id },
          process.env.REFRESH_TOKEN_SECRET_KEY,
          { expiresIn: "7d" }
        );

            const pipeline = topGenresPipeline(searchedUser);
            const topGenres = await userModel.aggregate(pipeline);

        res
          .cookie("token", token, {
            maxAge: 3600000, // 1 hour
            httpOnly: true,
            secure: true,
            sameSite: "none",
          })
          .cookie("refreshToken", refreshToken, {
            maxAge: 604800000, // 7 days
            httpOnly: true,
            secure: true,
            sameSite: "none",
          })
          .json({
            status: "success",
            data: {
              userID: searchedUser._id,
              userPic: searchedUser.photo,
              userName: searchedUser.name,
              userEmail: searchedUser.email,
              topGenres,
            },
          });
      } else {
        res.json({ status: "fail", data: "Incorrect password" });
      }
    } else {
      res.json({ status: "fail", data: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

module.exports = loginController;
