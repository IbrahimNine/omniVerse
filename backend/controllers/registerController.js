const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
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
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      maxAge: 86400000,
      httpOnly: true,
      secure: true,
    });
    res.json({
      status: "success",
      data: {
        userID: createdUser._id,
        userPic: createdUser.photo,
        userName: createdUser.name,
        userEmail: createdUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
module.exports = registerController;
