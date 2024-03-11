const { validationResult, check } = require("express-validator");

const updatePasswordValidator = [
  check("newPassword")
    .notEmpty()
    .withMessage("new password is required!")
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 0,
    })
    .withMessage(
      "Password must be more then 8 characters long inculding letters and numbers!"
    )
    .isString()
    .withMessage("Password must have letters!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: "fail", data: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = updatePasswordValidator;
