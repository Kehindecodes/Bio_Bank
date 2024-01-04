const { Sequelize } = require('sequelize');
require ('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_HOST} = process.env;
const sequelize = new Sequelize('bio_bank', DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
});



 async function checkConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
 }

module.exports = {
    checkConnection,
    sequelize
}
