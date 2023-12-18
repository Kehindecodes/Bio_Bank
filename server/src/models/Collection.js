 const {DataTypes, Model} = require('sequelize')
 const {sequelize} = require('../database.config')
 const Sample = require('./Sample')

 const Collection = sequelize.define('Collection', {
     
    diseaseTerm: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
 }, {
     timestamps: true,
     updatedAt: false
 })

//  // associate collection with sample
//  Collection.hasMany(Sample);

 module.exports = Collection