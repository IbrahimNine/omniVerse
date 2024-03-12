const { Schema, model } = require("mongoose");

const collectionSchema = new Schema(
  {
    title: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    elements: [
      {
        elementID: String,
        elementPic: String,
        elementTitle: String,
        isArtist: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Collection", collectionSchema);
