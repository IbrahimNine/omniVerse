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
      res.json({ status: "fail", data: { weekly: [], monthly: [], total: 0 } });
    }

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const lastWeekStart = new Date();
    lastWeekStart.setDate(lastWeekStart.getDate() - 14);
    const lastWeekEnd = new Date();
    lastWeekEnd.setDate(lastWeekEnd.getDate() - 7);
    const lastMonthStart = new Date();
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 2);
    const lastMonthEnd = new Date();
    lastMonthEnd.setMonth(lastMonthEnd.getMonth() - 1);

    const weeklyPipeline = [
      {
        $match: {
          _id: searchedUser._id,
          "playedTracks.createdAt": { $gte: oneWeekAgo },
        },
      },
      { $unwind: "$playedTracks" },
      { $match: { "playedTracks.createdAt": { $gte: oneWeekAgo } } },
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

    const monthlyPipeline = [
      {
        $match: {
          _id: searchedUser._id,
          "playedTracks.createdAt": { $gte: oneMonthAgo },
        },
      },
      { $unwind: "$playedTracks" },
      { $match: { "playedTracks.createdAt": { $gte: oneMonthAgo } } },
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

    const currentWeekPipeline = [
      {
        $match: {
          _id: searchedUser._id,
          "playedTracks.createdAt": { $gte: oneWeekAgo },
        },
      },
      { $unwind: "$playedTracks" },
      { $match: { "playedTracks.createdAt": { $gte: oneWeekAgo } } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ];
    const currentMonthPipeline = [
      {
        $match: {
          _id: searchedUser._id,
          "playedTracks.createdAt": { $gte: oneMonthAgo },
        },
      },
      { $unwind: "$playedTracks" },
      { $match: { "playedTracks.createdAt": { $gte: oneMonthAgo } } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ];
    const lastWeekPipeline = [
      {
        $match: {
          _id: searchedUser._id,
          "playedTracks.createdAt": { $gte: lastWeekStart, $lt: lastWeekEnd },
        },
      },
      { $unwind: "$playedTracks" },
      {
        $match: {
          "playedTracks.createdAt": { $gte: lastWeekStart, $lt: lastWeekEnd },
        },
      },
      { $group: { _id: null, count: { $sum: 1 } } },
    ];
    const lastMonthPipeline = [
      {
        $match: {
          _id: searchedUser._id,
          "playedTracks.createdAt": {
            $gte: lastMonthStart,
            $lt: lastMonthEnd,
          },
        },
      },
      { $unwind: "$playedTracks" },
      {
        $match: {
          "playedTracks.createdAt": {
            $gte: lastMonthStart,
            $lt: lastMonthEnd,
          },
        },
      },
      { $group: { _id: null, count: { $sum: 1 } } },
    ];

    const [
      weeklyResult,
      monthlyResult,
      currentWeekTotal,
      currentMonthTotal,
      lastWeekTotal,
      lastMonthTotal,
    ] = await Promise.all([
      userModel.aggregate(weeklyPipeline),
      userModel.aggregate(monthlyPipeline),
      userModel.aggregate(currentWeekPipeline),
      userModel.aggregate(currentMonthPipeline),
      userModel.aggregate(lastWeekPipeline),
      userModel.aggregate(lastMonthPipeline),
    ]);

    const totalPlayedTracks = searchedUser.playedTracks.length;
    res.json({
      status: "success",
      data: {
        weekly: weeklyResult.length > 0 ? weeklyResult[0].playedTrack : [],
        monthly: monthlyResult.length > 0 ? monthlyResult[0].playedTrack : [],
        total: totalPlayedTracks,
        totalCurrentWeek:
          currentWeekTotal.length > 0 ? currentWeekTotal[0].count : 0,
        totalCurrentMonth:
          currentMonthTotal.length > 0 ? currentMonthTotal[0].count : 0,
        totalLastWeek: lastWeekTotal.length > 0 ? lastWeekTotal[0].count : 0,
        totalLastMonth: lastMonthTotal.length > 0 ? lastMonthTotal[0].count : 0,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//______________________________________________________________
const updateUserPlayedTracks = async (req, res) => {
  try {
    const user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY);
    const {
      trackTitle,
      trackAlbum,
      trackAlbumPic,
      trackAlbumID,
      trackArtist,
      trackArtistID,
    } = req.body;

    const searchedUser = await userModel.findById(user._id);
    if (!searchedUser) {
      return res.json({ status: "fail", message: "User not found" });
    }

    searchedUser.playedTracks.push({
      trackTitle,
      trackAlbum,
      trackAlbumPic,
      trackAlbumID,
      trackArtist,
      trackArtistID,
    });

    await searchedUser.save();
    res.json({ status: "success" });
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
