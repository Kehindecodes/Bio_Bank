const express = require('express');
const {createCollection, getAllCollection} = require('./collection.controller');


const collectionRouter = express.Router();

collectionRouter.post('/', createCollection);
collectionRouter.get('/', getAllCollection);

module.exports = collectionRouter;
