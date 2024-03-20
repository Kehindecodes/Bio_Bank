import  {Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST} = process.env;
export const sequelize = new Sequelize('bio_bank', DB_USER || 'root', DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
});



 export async function checkConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
 }


