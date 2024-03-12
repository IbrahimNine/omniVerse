const collectionModel = require("../models/collectionModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

//____________________________________________________________________
const addingNewCollection = async (req, res) => {
  const user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY);
  try {
    const data = await collectionModel.create({
      ...req.body,
      owner: user._id,
    });
    res.json({ status: "success", data: `${data.title} has been created` });
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
    const data = await collectionModel.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true,
      }
    );
    res.json({ status: "success", data:`${data.title} has been updated` });
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
    res.json({
      status: "success",
      data: `${data.title} was removed successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//____________________________________________________________________
const getUserCollections = async (req, res) => {
  const user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY);
  try {
    const data = await collectionModel
      .find({ owner: user._id })
      .select("-owner");
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
