const express = require('express');
const {sequelize} = require('./database.config');
const collectionRouter = require('./routes/collection.route');
const sampleRouter = require('./routes/sample.route');

const app = express();

// sync sequelize models with database
sequelize.sync();

// middlewares
app.use(express.json());

// routes
app.use('/api/v1/collections' ,collectionRouter);
app.use('/api/v1/collections' ,sampleRouter);

module.exports = app