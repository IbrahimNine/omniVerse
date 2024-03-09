const {
  addingNewCollection,
  updateCollection,
  deleteCollection,
  getUserCollections,
} = require("../controllers/collectionsControllers");
const collectionsRouter = require("express").Router();

collectionsRouter.get("/", getUserCollections);

collectionsRouter.post("/:id", addingNewCollection);

collectionsRouter.put("/:id", updateCollection);

collectionsRouter.delete("/:id", deleteCollection);

module.exports = collectionsRouter;
