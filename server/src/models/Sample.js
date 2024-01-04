const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('../services/database.config');
const Collection = require('./Collection');

const Sample = sequelize.define('Sample', {
     donorCount: {
         type: DataTypes.INTEGER,
         allowNull: false
     },
     materialType: {
         type: DataTypes.STRING,
         allowNull: false
     },
     collectionId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
             model: Collection,
             key: 'id'
         }
     }

},{
     timestamps: true,
     createdAt: false
})

module.exports = Sample