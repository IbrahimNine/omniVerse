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
const multer = require("multer");

const userRouter = require("express").Router();
const upload = multer({ dest: "uploads/" });

userRouter.get("/", getUser);
 
userRouter.put("/", upload.single("userPic"), userUpdateValidator, updateUser);

userRouter.put("/password", updatePasswordValidator, updatePassword);

userRouter.post("/delete", userDeleteValidator, deleteUser);

userRouter.get("/playedTracks/:userName", getUserPlayedTracks);

userRouter.put(
  "/playedTracks",
  userPlayedTracksValidator,
  updateUserPlayedTracks
);

module.exports = userRouter;
