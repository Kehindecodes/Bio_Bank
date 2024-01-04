 const {DataTypes, Model} = require('sequelize')
 const {sequelize} = require('../services/database.config')

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

 module.exports = Collection