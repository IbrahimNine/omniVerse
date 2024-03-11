const {
  getUser,
  updateUser,
  deleteUser,
  updatePassword,
} = require("../controllers/userControllers");
const userUpdateValidator = require("../middlewares/userUpdateValidator");
const userDeleteValidator = require("../middlewares/userDeleteValidator");
const updatePasswordValidator = require("../middlewares/updatePasswordValidator");

const userRouter = require("express").Router();

userRouter.get("/", getUser);

userRouter.put("/", userUpdateValidator, updateUser);

userRouter.put("/password", updatePasswordValidator, updatePassword);

userRouter.post("/delete", userDeleteValidator, deleteUser);

module.exports = userRouter;
