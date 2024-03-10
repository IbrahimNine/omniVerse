const authRouter = require("express").Router();
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const registerController = require("../controllers/registerController");
const userLoginValidator = require("../middlewares/userLoginValidator");
const userRegisterValidator = require("../middlewares/userRegisterValidator");

authRouter.post("/login", userLoginValidator, loginController); 

authRouter.post("/register", userRegisterValidator, registerController);

authRouter.delete("/logout", logoutController);


module.exports = authRouter;
