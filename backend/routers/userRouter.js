const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const userUpdateValidator = require("../middlewares/userUpdateValidator");

const userRouter = require("express").Router();

userRouter.get("/", getUser);

userRouter.put("/", userUpdateValidator, updateUser);

userRouter.delete("/", deleteUser);

module.exports = userRouter;
