const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const streamingRouter = require("./routers/streamingRouter");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.db_URI)
  .then(() => console.log("db is well connected"))
  .catch((err) => console.log(err));

app.use("/stream", streamingRouter);

app.all("*", (req, res) => {
  res.json({ status: "error", data: "page not found" });
});

mongoose.connection.once("open", () => {
  app.listen(5050, () => console.log("Server listening on port 5050!"));
});
