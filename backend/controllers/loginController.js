const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

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
        res.json({ status: "success", data: searchedUser });
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
