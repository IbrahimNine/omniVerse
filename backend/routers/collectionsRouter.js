const {
  addingNewCollection,
  updateCollection,
  deleteCollection,
  getUserCollections,
} = require("../controllers/collectionsControllers");
const collectionValidator = require("../middlewares/collectionValidator");
const collectionsRouter = require("express").Router();

collectionsRouter.get("/", getUserCollections);

collectionsRouter.post("/", collectionValidator, addingNewCollection);

collectionsRouter.put("/:id", collectionValidator, updateCollection);

collectionsRouter.delete("/:id", deleteCollection);

module.exports = collectionsRouter;
