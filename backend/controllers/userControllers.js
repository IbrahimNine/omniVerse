const bcrypt = require("bcryptjs");
const { Readable } = require("stream");
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
    const { user } = req;
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
    const { user } = req;
    let updatedUser = {
      name: newName,
      email: newEmail,
    };

    if (req.file) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).json({
              status: "error",
              message: "Error uploading image to Cloudinary",
            });
          }
          updatedUser.photo = result.secure_url;

         
          userModel
            .findByIdAndUpdate(user._id, updatedUser, { new: true })
            .then((updatedUser) => {
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
            })
            .catch((error) => {
              console.error(error);
              res
                .status(500)
                .json({ status: "error", message: "Internal server error" });
            });
        }
      );

      
      const bufferStream = new Readable();
      bufferStream.push(req.file.buffer);
      bufferStream.push(null); 
      bufferStream.pipe(uploadStream);
    } else {
    
      userModel
        .findByIdAndUpdate(user._id, updatedUser, { new: true })
        .then((updatedUser) => {
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
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .json({ status: "error", message: "Internal server error" });
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//______________________________________________________________
const updateUserPic = async (req, res) => {
  try {
    const { user } = req;

    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { photo: "/default5.png" },
      {
        new: true,
      }
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
    const { user } = req;
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
    const { user } = req;
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
    lastWeekStart.setHours(0, 0, 0, 0);
    const lastWeekEnd = new Date(lastWeekStart);
    lastWeekEnd.setDate(lastWeekEnd.getDate() + 6);
    lastWeekEnd.setHours(0, 0, 0, 0);

    const lastMonthStart = new Date();
    lastMonthStart.setDate(1);
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
    lastMonthStart.setHours(0, 0, 0, 0);
    const lastMonthEnd = new Date();
    lastMonthEnd.setDate(0);
    lastMonthEnd.setMonth(lastMonthEnd.getMonth());
    lastMonthEnd.setHours(0, 0, 0, 0);

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
      { $sort: { count: -1, _id: 1 } },
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
      { $sort: { count: -1, _id: 1 } },
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
      { $sort: { count: -1, _id: 1 } },
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
    const albumPipeline = [
      { $match: { _id: searchedUser._id } },
      { $unwind: "$playedTracks" },
      {
        $group: {
          _id: "$playedTracks.trackAlbum",
          trackAlbumID: { $first: "$playedTracks.trackAlbumID" },
          trackAlbumPic: { $first: "$playedTracks.trackAlbumPic" },
          trackArtist: { $first: "$playedTracks.trackArtist" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          albumCounts: {
            $push: {
              album: "$_id",
              albumID: "$trackAlbumID",
              albumPic: "$trackAlbumPic",
              albumArtist: "$trackArtist",
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
          albumData: albumPipeline,
        },
      },
    ];

    const [result] = await Promise.all([userModel.aggregate(aggregation)]);

    const {
      weekly,
      monthly,
      yearly,
      currentWeekTotal,
      currentMonthTotal,
      lastWeekTotal,
      lastMonthTotal,
      albumData,
    } = result[0] || {};
    const weeklyResult = weekly?.[0]?.weeklyResult?.[0] || [];
    const weeklyCount = weekly?.[0]?.weeklyCount || 0;
    const monthlyResult = monthly?.[0]?.monthlyResult?.[0] || [];
    const monthlyCount = monthly?.[0]?.monthlyCount || 0;
    const yearlyResult = yearly?.[0]?.yearlyResult?.[0] || [];
    const yearlyCount = yearly?.[0]?.yearlyCount || 0;
    const totalPlayedTracks = searchedUser.playedTracks.length;
    const totalCurrentWeek = currentWeekTotal?.[0]?.count || 0;
    const totalCurrentMonth = currentMonthTotal?.[0]?.count || 0;
    const totalLastWeek = lastWeekTotal?.[0]?.count || 0;
    const totalLastMonth = lastMonthTotal?.[0]?.count || 0;
    const allAlbumsPlayed = albumData?.[0]?.albumCounts || [];

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
        allAlbumsPlayed,
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
    const { user } = req;
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
  updateUserPic,
};
