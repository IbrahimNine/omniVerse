const {
  getUser,
  updateUser,
  deleteUser,
  updatePassword,
  getUserPlayedTracks,
  updateUserPlayedTracks,
} = require("../controllers/userControllers");
const userUpdateValidator = require("../middlewares/userUpdateValidator");
const userDeleteValidator = require("../middlewares/userDeleteValidator");
const updatePasswordValidator = require("../middlewares/updatePasswordValidator");
const userPlayedTracksValidator = require("../middlewares/userPlayedTracksValidator");

const userRouter = require("express").Router();

userRouter.get("/", getUser);

userRouter.put("/", userUpdateValidator, updateUser);

userRouter.put("/password", updatePasswordValidator, updatePassword);

userRouter.post("/delete", userDeleteValidator, deleteUser);

userRouter.get("/playedTracks", getUserPlayedTracks);

userRouter.put(
  "/playedTracks",
  userPlayedTracksValidator,
  updateUserPlayedTracks
);

module.exports = userRouter;
