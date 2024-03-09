const authRouter = require("express").Router();
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const userLoginValidator = require("../middlewares/userLoginValidator");

authRouter.post("/login", userLoginValidator, loginController);

authRouter.post("/register", registerController);

module.exports = authRouter;
