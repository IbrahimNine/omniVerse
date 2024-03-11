const { check, validationResult } = require("express-validator");

const userDeleteValidator = [
  check("password").notEmpty().withMessage("Password is required!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: "fail", data: errors.array()[0].msg });
    } 
    next();
  },
];
module.exports = userDeleteValidator;
