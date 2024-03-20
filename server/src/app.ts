import express from 'express';
import {sequelize} from './services/database.config';
import  collectionRouter from './routes/collection.route';
import cors from 'cors';

const app = express();

// sync sequelize models with database
sequelize.sync();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1/collections' ,collectionRouter);

export default app;