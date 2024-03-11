const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
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
          { expiresIn: "1d" }
        );
        res
          .cookie("token", token, {
            maxAge: 86400000,
            httpOnly: true,
            secure: true,
          })
          .json({
            status: "success",
            data: {
              userID: searchedUser._id,
              userPic: searchedUser.photo,
              userName: searchedUser.name,
              userEmail: searchedUser.email,
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
