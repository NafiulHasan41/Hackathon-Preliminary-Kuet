import mongoose, { Schema, Document } from 'mongoose';

export interface IRecipe extends Document {
    title: string;
    ingredients: string[];
    instructions: string;
    taste: string;
    cuisineType: string;
    preparationTime: number;
    reviews: string;
  }
  
  const RecipeSchema = new Schema<IRecipe>({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    taste: { type: String },
    cuisineType: { type: String },
    preparationTime: { type: Number },
    reviews: { type: String },
  });
  
  export default mongoose.model<IRecipe>('Recipe', RecipeSchema);
  