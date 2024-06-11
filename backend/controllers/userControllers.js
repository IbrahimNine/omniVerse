const bcrypt = require("bcryptjs");
const { Readable } = require("stream");
const userModel = require("../models/userModel");
const {
  playedTracksPipelines,
  topGenresPipeline,
} = require("../utils/DataPipelines");
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

    const pipeline = topGenresPipeline(searchedUser);
    const topGenres = await userModel.aggregate(pipeline);

    res.json({
      status: "success",
      data: {
        userID: searchedUser._id,
        userPic: searchedUser.photo,
        userName: searchedUser.name,
        userEmail: searchedUser.email,
        topGenres,
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
      if (req.file.size > 10 * 1024 * 1024) {
        return res.status(400).json({
          status: "error",
          message: "File size exceeds the maximum limit of 10MB",
        });
      }

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
      res.clearCookie("refreshToken");
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
  const { userName, recordsFilter } = req.params;
  try {
    const searchedUser = await userModel.findOne({ name: userName });

    if (!searchedUser?.playedTracks || searchedUser === null) {
      res.json({ status: "fail", data: { weekly: [], monthly: [], total: 0 } });
    }

    const { aggregation } = playedTracksPipelines(searchedUser, recordsFilter);

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
      trackGenres,
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
      trackGenres,
    });

    await searchedUser.save();
    res.json({ status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//______________________________________________________________
const onQueueTracks = async (req, res) => {
  try {
    const userID = await userModel.findById(req.user._id);
    const pipeline = [
      {
        $match: { _id: userID._id },
      },
      {
        $unwind: "$playedTracks",
      },
      {
        $project: {
          _id: 0,
          trackAlbum: "$playedTracks.trackAlbum",
          trackAlbumPic: "$playedTracks.trackAlbumPic",
          trackAlbumID: "$playedTracks.trackAlbumID",
          trackArtist: "$playedTracks.trackArtist",
          trackArtistID: "$playedTracks.trackArtistID",
          trackGenres: "$playedTracks.trackGenres",
          trackTitle: "$playedTracks.trackTitle",
          createdAt: "$playedTracks.createdAt",
          playedDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$playedTracks.createdAt",
            },
          },
          playedTime: {
            $dateToString: { format: "%H:%M", date: "$playedTracks.createdAt" },
          },
        },
      },

      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 30,
      },
    ];

    const userData = await userModel.aggregate(pipeline);

    if (userData) {
      res.json({ status: "success", data: userData });
    } else {
      res.json({ status: "fail", message: "Technical issue, user not found" });
    }
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
  onQueueTracks,
};
