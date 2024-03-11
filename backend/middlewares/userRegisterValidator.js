const { check, validationResult } = require("express-validator");
const userModel = require("../models/userModel");

const userRegisterValidator = [
  check("name")
    .notEmpty()
    .withMessage("User name is required!")
    .isLength({ min: 3, max: 25 })
    .withMessage("User name must be between 3 and 25 characters!")
    .isString()
    .withMessage("User name must be a string!")
    .custom(async (value) => {
      const exsitingName = await userModel.findOne({ name: value });
      if (exsitingName) {
        throw new Error("User name already exist!");
      }
    }),

  check("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email must be in email form!")
    .custom(async (value) => {
      const existingEmail = await userModel.findOne({ email: value });
      if (existingEmail) {
        throw new Error("The email entered is already used by another user!");
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 0,
    })
    .withMessage(
      "Password must be more then 8 characters long including letters and numbers!"
    )
    .isString()
    .withMessage("Password must have letters!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .json({ status: "fail", data: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = userRegisterValidator;
