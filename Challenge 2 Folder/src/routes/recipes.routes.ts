import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { createWorker } from 'tesseract.js';

const router = express.Router();
const filePath = path.join(__dirname, '../data/my_fav_recipes.txt');

router.post('/add-text-recipe', async (req: Request, res: Response) => {
    try {
        const { title, ingredients, instructions, taste, cuisine, preparationTime, reviews } = req.body;

        const recipeContent = `
      Title: ${title}
      ${ingredients.map((ing: string) => `Ingredient: ${ing}`).join('\n')}
      ${instructions.map((ins: string) => `Instruction: ${ins}`).join('\n')}
      Taste: ${taste}
      Cuisine: ${cuisine}
      PreparationTime: ${preparationTime}
      Reviews: ${reviews}
      `.trim();

        fs.appendFileSync(filePath, `\n\n${recipeContent}`);

        res.status(201).json({ message: 'Recipe added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add recipe.' });
    }
});

router.post('/add-image-recipe', async (req: Request, res: Response) => {
    try {
        const imagePath = req.body.imagePath; 

       
        const worker = createWorker() as any ;

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');

        const { data } = await worker.recognize(imagePath);

        fs.appendFileSync(filePath, `\n\n${data.text.trim()}`);

        await worker.terminate();

        res.status(201).json({ message: 'Recipe added from image successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add recipe from image.' });
    }
});

export default router;
