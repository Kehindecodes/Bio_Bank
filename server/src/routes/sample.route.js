const express = require('express');
const{addSample, getAllSamples} = require('./sample.controller');
const {checkCollection} = require('../middleware/checkCollection');

const sampleRouter = express.Router();

sampleRouter.get('/:collectionId/samples', checkCollection, getAllSamples);
sampleRouter.post('/:collectionId/samples', checkCollection, addSample);

module.exports = sampleRouter