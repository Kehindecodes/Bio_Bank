const express = require('express');
const {sequelize} = require('./database.config');

const app = express();

// sync sequelize models with database
sequelize.sync();




module.exports = app