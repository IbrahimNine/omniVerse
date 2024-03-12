const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const streamingRouter = require("./routers/streamingRouter");
const authRouter = require("./routers/authRouter");
const collectionsRouter = require("./routers/collectionsRouter");
const tokenVerification = require("./middlewares/tokenVerification");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/userRouter");
require("dotenv").config();

//________________________________________________________________
app.use(
  cors({
    origin: [process.env.RENDERING_ORIGIN],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//________________________________________________________________
mongoose
  .connect(process.env.db_URI)
  .then(() => console.log("db is well connected"))
  .catch((err) => console.log(err));

//________________________________________________________________
app.use("/api/stream", streamingRouter);

//________________________________________________________________
app.use("/api/auth", authRouter);

//________________________________________________________________
app.use("/api/user", tokenVerification, userRouter);

//________________________________________________________________
app.use("/api/collections", tokenVerification, collectionsRouter);

//________________________________________________________________
app.all("*", (req, res) => {
  res.json({ status: "error", data: "page not found" });
});

//________________________________________________________________
const Port = process.env.PORT || 5090;
mongoose.connection.once("open", () => {
  app.listen(Port, () => console.log(`Server listening on port ${Port}!`));
});
