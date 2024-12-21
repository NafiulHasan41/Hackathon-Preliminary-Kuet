
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ingredientRoutes from './routes/ingredients.routes';
import connectDB from './config/db';


dotenv.config();

const app = express();
app.use(bodyParser.json());

connectDB();
app.use('/api/ingredients', ingredientRoutes);


export default app;
