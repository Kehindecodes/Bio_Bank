import express from 'express';
import {
    createCollection,
    getAllCollection,
    addSample,
    getAllSamples,
} from './collection.controller';
import { ensureUniqueCollection } from '../middleware/ensureUniqueCollection';
  
import {preventDuplicateSamplesInCollection } from '../middleware/preventDuplicateSamplesInCollection';
import { checkCollection } from '../middleware/checkCollection';

const collectionRouter = express.Router();

collectionRouter.post("/", ensureUniqueCollection, createCollection);
collectionRouter.get("/", getAllCollection);

collectionRouter.get("/:collectionId/samples", checkCollection,  getAllSamples);
collectionRouter.post("/:collectionId/samples", checkCollection, preventDuplicateSamplesInCollection, addSample);

export default collectionRouter;
