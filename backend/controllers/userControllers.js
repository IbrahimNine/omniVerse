const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
require("dotenv").config();

//______________________________________________________________
const getUser = async (req, res) => {
  try {
    const user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY);
    const searchedUser = await userModel.findById(user._id);
    res.json({
      status: "success",
      data: {
        userID: searchedUser._id,
        userPic: searchedUser.photo,
        userName: searchedUser.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//______________________________________________________________
const updateUser = async (req, res) => {
  const { newName, newEmail, oldPassword, newPassword } = req.body;
  try {
    const user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY);
    const searchedUser = await userModel.findById(user._id);
    const passwordMatch = await bcrypt.compare(
      oldPassword,
      searchedUser.password
    );
    if (passwordMatch) {
      const updatedUser = await userModel.findByIdAndUpdate(
        user._id,
        {
          name: newName,
          email: newEmail,
          password: await bcrypt.hash(newPassword, 15),
        },
        { new: true }
      );
      res.json({
        status: "success",
        data: {
          userID: updatedUser._id,
          userPic: updatedUser.photo,
          userName: updatedUser.name,
        },
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "The old password entered was wrong!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//______________________________________________________________
const deleteUser = async (req, res) => {
  const { password } = req.body;
  try {
    const user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY);
    const searchedUser = await userModel.findById(user._id);
    const passwordMatch = await bcrypt.compare(password, searchedUser.password);
    if (passwordMatch) {
      const data = await userModel.findByIdAndDelete(user._id);
      res.json({ status: "success", data });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Incorrect password!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

module.exports = { getUser, updateUser, deleteUser };
