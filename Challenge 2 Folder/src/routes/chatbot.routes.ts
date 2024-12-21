import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';

const router = express.Router();

// Path to the recipes file
const filePath = path.join(__dirname, '../data/my_fav_recipes.txt');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is defined
});

// Chatbot Route
router.post('/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const userQuery: string = req.body.query;

    if (!userQuery) {
      res.status(400).json({ error: 'Query is required.' });
      return;
    }

    // Read recipes from the file
    const recipes = fs.readFileSync(filePath, 'utf-8');

    // Construct the prompt
    const prompt = `
You are a recipe recommendation assistant. Based on the user's query, suggest recipes that match their preferences. 
Here are the available recipes:

${recipes}

User Query: ${userQuery}
    `;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Model name
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
    });

    // Extract reply
    const reply = response.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      res.status(500).json({ error: 'No response from the AI.' });
      return;
    }

    // Send the reply
    res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to process chatbot request.' });
  }
});

export default router;
