const streamingRouter = require("express").Router();
const { youtube } = require("scrape-youtube");

streamingRouter.post("/", (req, res) => {
  const { query } = req.body;
  youtube
    .search(query)
    .then((results) => {
      res.json(results.videos);
    })
    .catch((err) => console.log(err));
});

module.exports = streamingRouter;
