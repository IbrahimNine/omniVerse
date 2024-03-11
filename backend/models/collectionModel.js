const { Schema, model } = require("mongoose");

const collectionSchema = new Schema(
  {
    title: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    elementsID: [{ elementID: String, isArtist: Boolean }],
  },
  { timestamps: true }
);

module.exports = model("Collection", collectionSchema);
