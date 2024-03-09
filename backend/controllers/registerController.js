const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const registerController = async (req, res) => {
  try {
    const user = {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 15),
    };
    const data = await userModel.create(user);
    res.json({ status: "success", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
module.exports = registerController;
