const express = require('express');
const {sequelize} = require('./services/database.config');
const collectionRouter = require('./routes/collection.route');
const cors = require('cors');

const app = express();

// sync sequelize models with database
sequelize.sync();

// middlewares
app.use(express.json());
app.use(cors());


// routes
app.use('/api/v1/collections' ,collectionRouter);

module.exports = app