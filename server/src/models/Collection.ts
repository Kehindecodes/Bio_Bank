 import {DataTypes, Model} from 'sequelize';
 import {sequelize} from '../services/database.config';

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

 export default Collection