const { check, validationResult } = require("express-validator");

const userLoginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email must be in email form"),
  check("password").notEmpty().withMessage("Password is required!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({status:"fail", data: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = userLoginValidator;
