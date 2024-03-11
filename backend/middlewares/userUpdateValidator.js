const { check, validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userUpdateValidator = [
  (req, res, next) => {
    req.user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY);
    next();
  },
  check("newName")
    .notEmpty()
    .withMessage("User name is required!")
    .isLength({ min: 3, max: 25 })
    .withMessage("User name must be between 3 and 25 characters!")
    .isString()
    .withMessage("User name must be a string!")
    .custom(async (value,{req}) => {
      const exsitingName = await userModel.findOne({
        name: value,
        _id: { $ne: req.user._id },
      });
      if (exsitingName) {
        throw new Error("User name already exist!");
      }
    }),

  check("newEmail")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email must be in email form!")
    .custom(async (value,{req}) => {
      const existingEmail = await userModel.findOne({
        email: value,
        _id: { $ne: req.user._id },
      });
      if (existingEmail) {
        throw new Error("The email entered is already used by another user!");
      }
    }),

 
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .json({ status: "fail", data: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = userUpdateValidator;
