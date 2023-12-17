const express = require('express');
const {createCollection, getAllCollection} = require('./collection.controller');
const {ensureUniqueCollection} = require('../middleware/ensureUniqueCollection');


const collectionRouter = express.Router();

collectionRouter.post('/', ensureUniqueCollection, createCollection);
collectionRouter.get('/', getAllCollection);

module.exports = collectionRouter;
