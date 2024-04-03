const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    let updatedUser = {
      name: newName,
      email: newEmail,
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updatedUser.photo = result.secure_url;
    }

    updatedUser = await userModel.findByIdAndUpdate(user._id, updatedUser, {
      new: true,
    });
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
  const { userName } = req.params;
  try {
    // const user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY);
    // const searchedUser = await userModel.findById(user._id);
    const searchedUser = await userModel.findOne({ name: userName });

    if (!searchedUser?.playedTracks || searchedUser === null) {
      res.json({ status: "fail", data: { weekly: [], monthly: [], total: 0 } });
    }

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const lastWeekStart = new Date();
    const currentDay = lastWeekStart.getDay();
    lastWeekStart.setDate(lastWeekStart.getDate() - currentDay - 6);
    const lastWeekEnd = new Date(lastWeekStart);
    lastWeekEnd.setDate(lastWeekEnd.getDate() + 6);

    // const lastMonthStart = new Date();
    // lastMonthStart.setMonth(lastMonthStart.getMonth() - 2);
    // const lastMonthEnd = new Date();
    // lastMonthEnd.setMonth(lastMonthEnd.getMonth() - 1);

    const lastMonthStart = new Date();
    lastMonthStart.setDate(1);
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);

    const lastMonthEnd = new Date();
    lastMonthEnd.setDate(0);
    lastMonthEnd.setMonth(lastMonthEnd.getMonth());

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
          _id: "$playedTracks.trackAlbumID",
          count: { $sum: 1 },
          playedTrack: { $first: "$playedTracks" },
        },
      },
      { $sort: { _id: 1 } },
      { $sort: { count: -1 } },
      { $limit: 1 },
      {
        $group: {
          _id: null,
          weeklyCount: { $first: "$count" },
          weeklyResult: { $push: "$playedTrack" },
        },
      },
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
          _id: "$playedTracks.trackAlbumID",
          count: { $sum: 1 },
          playedTrack: { $first: "$playedTracks" },
        },
      },
      { $sort: { _id: 1 } },
      { $sort: { count: -1 } },
      { $limit: 1 },
      {
        $group: {
          _id: null,
          monthlyCount: { $first: "$count" },
          monthlyResult: { $push: "$playedTrack" },
        },
      },
    ];

    const yearlyPipeline = [
      {
        $match: {
          _id: searchedUser._id,
          "playedTracks.createdAt": { $gte: oneYearAgo },
        },
      },
      { $unwind: "$playedTracks" },
      { $match: { "playedTracks.createdAt": { $gte: oneYearAgo } } },
      {
        $group: {
          _id: "$playedTracks.trackAlbumID",
          count: { $sum: 1 },
          playedTrack: { $first: "$playedTracks" },
        },
      },
      { $sort: { _id: 1 } },
      { $sort: { count: -1 } },
      { $limit: 1 },
      {
        $group: {
          _id: null,
          yearlyCount: { $first: "$count" },
          yearlyResult: { $push: "$playedTrack" },
        },
      },
    ];

    const currentWeekPipeline = [
      {
        $match: {
          _id: searchedUser._id,
          "playedTracks.createdAt": { $gte: lastWeekEnd },
        },
      },
      { $unwind: "$playedTracks" },
      { $match: { "playedTracks.createdAt": { $gte: lastWeekEnd } } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ];
    const currentMonthPipeline = [
      {
        $match: {
          _id: searchedUser._id,
          "playedTracks.createdAt": { $gte: lastMonthEnd },
        },
      },
      { $unwind: "$playedTracks" },
      { $match: { "playedTracks.createdAt": { $gte: lastMonthEnd } } },
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
    const artistPipeline = [
      { $match: { _id: searchedUser._id } },
      { $unwind: "$playedTracks" },
      {
        $group: {
          _id: "$playedTracks.trackArtist",
          trackArtistID: { $first: "$playedTracks.trackArtistID" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          artistCounts: {
            $push: {
              artist: "$_id",
              artistID: "$trackArtistID",
              count: "$count",
            },
          },
        },
      },
    ];

    const aggregation = [
      {
        $facet: {
          weekly: weeklyPipeline,
          monthly: monthlyPipeline,
          yearly: yearlyPipeline,
          currentWeekTotal: currentWeekPipeline,
          currentMonthTotal: currentMonthPipeline,
          lastWeekTotal: lastWeekPipeline,
          lastMonthTotal: lastMonthPipeline,
          artistData: artistPipeline,
        },
      },
    ];

    const [result] = await Promise.all([userModel.aggregate(aggregation)]);

    const weeklyResult =
      (result[0].weekly[0] && result[0].weekly[0].weeklyResult[0]) || [];
    const weeklyCount =
      (result[0].weekly[0] && result[0].weekly[0].weeklyCount) || 0;
    const monthlyResult =
      (result[0].monthly[0] && result[0].monthly[0].monthlyResult[0]) || [];
    const monthlyCount =
      (result[0].monthly[0] && result[0].monthly[0].monthlyCount) || 0;
    const yearlyResult =
      (result[0].yearly[0] && result[0].yearly[0].yearlyResult[0]) || [];
    const yearlyCount =
      (result[0].yearly[0] && result[0].yearly[0].yearlyCount) || 0;
    const totalPlayedTracks = searchedUser.playedTracks.length;
    const totalCurrentWeek =
      (result[0].currentWeekTotal[0] && result[0].currentWeekTotal[0].count) ||
      0;
    const totalCurrentMonth =
      (result[0].currentMonthTotal[0] &&
        result[0].currentMonthTotal[0].count) ||
      0;
    const totalLastWeek =
      (result[0].lastWeekTotal[0] && result[0].lastWeekTotal[0].count) || 0;
    const totalLastMonth =
      (result[0].lastMonthTotal[0] && result[0].lastMonthTotal[0].count) || 0;
    const allArtistsPlayed =
      (result[0].artistData[0] && result[0].artistData[0].artistCounts) || [];

    res.json({
      status: "success",
      data: {
        weekly: weeklyResult,
        monthly: monthlyResult,
        yearly: yearlyResult,
        weeklyCount,
        monthlyCount,
        yearlyCount,
        total: totalPlayedTracks,
        totalCurrentWeek,
        totalCurrentMonth,
        totalLastWeek,
        totalLastMonth,
        allArtistsPlayed,
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
