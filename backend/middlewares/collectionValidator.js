const { check, validationResult } = require("express-validator");

const collectionValidator = [
  check("title")
    .notEmpty()
    .withMessage("Collection title is required!")
    .isString()
    .withMessage("Collection title must have letters"),

  check("elements").isArray().withMessage("elementsID must be an array"),
  check("elements.*.elementID")
    .isString()
    .withMessage("elementID must be a string"),
  check("elements.*.elementPic")
    .isString()
    .withMessage("elementPic must be a string"),
  check("elements.*.elementTitle")
    .isString()
    .withMessage("elementTitle must be a string"),
  check("elements.*.isArtist")
    .isBoolean()
    .withMessage("isArtist must be a boolean"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: "fail", data: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = collectionValidator;
