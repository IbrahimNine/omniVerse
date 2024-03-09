const { Schema, model } = require("mongoose");

const collectionSchema = new Schema({
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  elementsID: [{ elementID: String, isArtist: Boolean }],
});

module.exports = model("Collection", collectionSchema);
