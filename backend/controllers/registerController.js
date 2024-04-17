const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { topGenresPipeline } = require("../utils/DataPipelines");
require("dotenv").config();

const registerController = async (req, res) => {
  try {
    const user = {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 15),
    };
    const createdUser = await userModel.create(user);
    const token = jwt.sign(
      { _id: createdUser._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { _id: createdUser._id },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "7d" }
    );

    const pipeline = topGenresPipeline(createdUser);
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
      });

    res.json({
      status: "success",
      data: {
        userID: createdUser._id,
        userPic: createdUser.photo,
        userName: createdUser.name,
        userEmail: createdUser.email,
        topGenres,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
module.exports = registerController;
