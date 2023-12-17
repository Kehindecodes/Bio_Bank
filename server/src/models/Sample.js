const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('../database.config');
const Collection = require('./Collection');

const Sample = sequelize.define('Sample', {
     donorCount: {
         type: DataTypes.INTEGER,
         allowNull: false
     },
     materialType: {
         type: DataTypes.STRING,
         allowNull: false
     }
})

// associate sample with collection
Sample.belongsTo(Collection, {
    foreignKey: 'collectionId'
})

module.exports = Sample