const { Schema, model } = require("mongoose");

const playedTrackSchema = new Schema(
  {
    trackTitle: String,
    trackAlbum: String,
    trackAlbumPic: String,
    trackAlbumID: String,
    trackArtist: String,
    trackArtistID: String,
    trackGenres: String,
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    photo: {
      type: String,
      default: "/default5.png",
    },
    playedTracks: [playedTrackSchema],
  },
  { timestamps: true }
);

userSchema.path("playedTracks").default([]);

module.exports = model("User", userSchema);
