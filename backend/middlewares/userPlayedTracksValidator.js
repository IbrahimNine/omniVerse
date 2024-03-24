const { check, validationResult } = require("express-validator");

const userPlayedTracksValidator = [
  check("playedTracks").isArray().withMessage("playedTracks must be an array"),
  check("playedTracks.*.trackTitle")
    .isString()
    .withMessage("trackTitle must be a string"),
  check("playedTracks.*.trackAlbum")
    .isString()
    .withMessage("trackAlbum must be a string"),
  check("playedTracks.*.trackAlbumPic")
    .isString()
    .withMessage("trackAlbumPic must be a string"),
  check("playedTracks.*.trackAlbumID")
    .isString()
    .withMessage("trackAlbumID must be a string"),
  check("playedTracks.*.TrackArtist")
    .isString()
    .withMessage("TrackArtist must be a string"),
  check("playedTracks.*.trackArtistPic")
    .isString()
    .withMessage("trackArtistPic must be a string"),
  check("playedTracks.*.TrackArtistID")
    .isString()
    .withMessage("TrackArtistID must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: "fail", data: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = userPlayedTracksValidator;
