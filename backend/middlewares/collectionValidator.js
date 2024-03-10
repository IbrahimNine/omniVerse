const { check, validationResult } = require("express-validator");

const collectionValidator = [
  check("title")
    .notEmpty()
    .withMessage("Collection title is required!")
    .isString()
    .withMessage("Collection title must have letters"),
  check("owner").notEmpty().withMessage("Owner id is required!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: "fail", data: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = collectionValidator;
