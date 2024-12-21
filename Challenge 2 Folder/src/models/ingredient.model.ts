
import mongoose, { Schema, Document } from 'mongoose';

export interface IIngredient extends Document {
  name: string;
  quantity: number;
  unit: string;
  lastUpdated: Date;
}

const IngredientSchema = new Schema<IIngredient>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model<IIngredient>('Ingredient', IngredientSchema);
