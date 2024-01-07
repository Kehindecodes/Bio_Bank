const express = require("express");
const {
    createCollection,
    getAllCollection,
    addSample,
    getAllSamples,
} = require("./collection.controller");
const {
    ensureUniqueCollection,
} = require("../middleware/ensureUniqueCollection");
const { checkCollection } = require("../middleware/checkCollection");

const collectionRouter = express.Router();

collectionRouter.post("/", ensureUniqueCollection, createCollection);
collectionRouter.get("/", getAllCollection);

collectionRouter.get("/:collectionId/samples", checkCollection, getAllSamples);
collectionRouter.post("/:collectionId/samples", checkCollection, addSample);

module.exports = collectionRouter;
