const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const streamingRouter = require("./routers/streamingRouter");
const authRouter = require("./routers/authRouter");
const collectionsRouter = require("./routers/collectionsRouter");
require("dotenv").config();

//________________________________________________________________
app.use(cors());
app.use(express.json());

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
app.use("/api/collections",collectionsRouter)

//________________________________________________________________
app.all("*", (req, res) => {
  res.json({ status: "error", data: "page not found" });
});

//________________________________________________________________
mongoose.connection.once("open", () => {
  app.listen(5050, () => console.log("Server listening on port 5050!"));
});
