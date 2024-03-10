const collectionModel = require("../models/collectionModel");

//____________________________________________________________________
const addingNewCollection = async (req, res) => {

  try {
    const data = await collectionModel.create({
      ...req.body,
    });
    res.json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//____________________________________________________________________
const updateCollection = async (req, res) => {
  const { id } = req.params;
  req.body;
  try {
    const data = await collectionModel.findByIdAndUpdate(id, {...req.body}, {
      new: true,
    });
    res.json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//____________________________________________________________________
const deleteCollection = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await collectionModel.findByIdAndDelete(id);
    res.json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//____________________________________________________________________
const getUserCollections = async (req, res) => {
  const { id } = req.headers;
  try {
    const data = await collectionModel.find({ owner: id }).select("-owner");
    res.json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

module.exports = {
  addingNewCollection,
  updateCollection,
  deleteCollection,
  getUserCollections,
};
