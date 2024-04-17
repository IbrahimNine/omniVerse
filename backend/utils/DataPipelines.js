const playedTracksPipelines = (searchedUser, recordsFilter) => {
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

  let dateFilter = {};

  switch (recordsFilter) {
    case "ALL TIME":
      break;
    case "LAST YEAR":
      dateFilter = { "playedTracks.createdAt": { $gte: oneYearAgo } };
      break;
    case "LAST MONTH":
      dateFilter = { "playedTracks.createdAt": { $gte: oneMonthAgo } };
      break;
    case "LAST WEEK":
      dateFilter = { "playedTracks.createdAt": { $gte: oneWeekAgo } };
      break;
    default:
      // Default to ALL TIME if the selected filter doesn't match any case
      break;
  }

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
    { $sort: { count: -1, _id: -1 } },
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
    { $sort: { count: -1, _id: -1 } },
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
    { $sort: { count: -1, _id: -1 } },
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
    {
      $match: {
        _id: searchedUser._id,
      },
    },
    { $unwind: "$playedTracks" },
    {
      $match: {
        ...dateFilter,
      },
    },
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

  return {
    aggregation,
  };
};

const topGenresPipeline = (searchedUser) => {
  return [
    { $match: { _id: searchedUser._id } },
    { $unwind: "$playedTracks" },
    { $match: { "playedTracks.trackGenres": { $exists: true, $ne: null } } },
    { $group: { _id: "$playedTracks.trackGenres" } },
    { $limit: 2 },
  ];
};

module.exports = { playedTracksPipelines, topGenresPipeline };
