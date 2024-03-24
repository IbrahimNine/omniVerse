const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
require("dotenv").config();

//______________________________________________________________
const getUser = async (req, res) => {
  try {
    const user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY);
    const searchedUser = await userModel.findById(user._id);
    res.json({
      status: "success",
      data: {
        userID: searchedUser._id,
        userPic: searchedUser.photo,
        userName: searchedUser.name,
        userEmail: searchedUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//______________________________________________________________
const updateUser = async (req, res) => {
  const { newName, newEmail } = req.body;
  try {
    const user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY);

    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      {
        name: newName,
        email: newEmail,
      },
      { new: true }
    );
    res.json({
      status: "success",
      data: {
        userID: updatedUser._id,
        userPic: updatedUser.photo,
        userName: updatedUser.name,
        userEmail: updatedUser.email,
      },
      message: "Changes have been saved",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//______________________________________________________________
const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY);
    const searchedUser = await userModel.findById(user._id);
    const passwordMatch = await bcrypt.compare(
      oldPassword,
      searchedUser.password
    );
    if (passwordMatch) {
      const updatedUser = await userModel.findByIdAndUpdate(
        user._id,
        {
          password: await bcrypt.hash(newPassword, 15),
        },
        { new: true }
      );
      res.json({
        status: "success",
        data: `${updatedUser.name} Password has been changed`,
      });
    } else {
      res.json({
        status: "fail",
        data: "The old password is wrong!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//______________________________________________________________
const deleteUser = async (req, res) => {
  const { password } = req.body;
  try {
    const user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY);
    const searchedUser = await userModel.findById(user._id);
    const passwordMatch = await bcrypt.compare(password, searchedUser.password);
    if (passwordMatch) {
      const data = await userModel.findByIdAndDelete(user._id);
      res.clearCookie("token");
      res.json({
        status: "success",
        data: `${data.name} account has been deleted`,
      });
    } else {
      res.json({
        status: "fail",
        data: "Incorrect password!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//______________________________________________________________
const getUserPlayedTracks = async (req, res) => {
  try {
    const user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY);
    const searchedUser = await userModel.findById(user._id);

    if (!searchedUser.playedTracks) {
      res.json({ status: "fail", data: [] });
    }
    const pipeline = [
      { $match: { _id: searchedUser._id } },
      { $unwind: "$playedTracks" },
      {
        $group: {
          _id: "$playedTracks.trackTitle",
          count: { $sum: 1 },
          playedTrack: { $first: "$playedTracks" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ];

    const result = await userModel.aggregate(pipeline);
    if (result.length > 0) {
      res.json({ status: "success", data: result[0].playedTrack });
    } else {
      res.json({ status: "fail", data: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//______________________________________________________________
const updateUserPlayedTracks = async (req, res) => {
  try {
    const user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY);
    const { trackTitle, trackAlbum, trackAlbumID, trackArtist, trackArtistID } =
      req.body;

    const searchedUser = await userModel.findById(user._id);
    if (!searchedUser) {
      return res.json({ status: "fail", message: "User not found" });
    }

    searchedUser.playedTracks.push({
      trackTitle,
      trackAlbum,
      trackAlbumID,
      trackArtist,
      trackArtistID,
    });

    await searchedUser.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  updatePassword,
  getUserPlayedTracks,
  updateUserPlayedTracks,
};
