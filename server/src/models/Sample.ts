import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../services/database.config';
import  Collection from './Collection';

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

export default Sample