
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import ingredientRoutes from './routes/ingredients.routes';
import connectDB from './config/db';
import recipeRoutes from './routes/recipes.routes';


dotenv.config();

const app = express();
app.use(bodyParser.json());

connectDB();
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/recipes', recipeRoutes);


export default app;
