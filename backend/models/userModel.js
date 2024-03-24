const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    photo: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/dj-wireless-music-headphones-silhouette-earphones-flat-icon-headset-silhouette-musician-equipment-vector-isolated-white-icon-emblem-clothing-print-design-element_981050-186.jpg",
    },
    playedTracks: [
      {
        trackTitle: String,
        trackAlbum: String,
        trackAlbumPic: String,
        trackAlbumID: String,
        TrackArtist: String,
        trackArtistPic: String,
        TrackArtistID: String,
      },
    ],
  },
  { timestamps: true }
);

userSchema.path("playedTracks").default([]);

module.exports = model("User", userSchema);
