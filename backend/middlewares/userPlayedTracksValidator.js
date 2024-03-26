const { check, validationResult } = require("express-validator");

const userPlayedTracksValidator = [
  check("trackTitle").isString().withMessage("trackTitle must be a string"),
  check("trackAlbum").isString().withMessage("trackAlbum must be a string"),
  check("trackAlbumPic")
    .isString()
    .withMessage("trackAlbumPic must be a string"),
  check("trackAlbumID").isString().withMessage("trackAlbumID must be a string"),
  check("trackArtist").isString().withMessage("trackArtist must be a string"),
  check("trackArtistID")
    .isString()
    .withMessage("trackArtistID must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: "fail", data: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = userPlayedTracksValidator;
