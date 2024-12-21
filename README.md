# Mofa’s Kitchen Buddy API Documentation

This document provides details on how to use the APIs for managing ingredients, recipes, and interacting with the chatbot.

---

## **Base URL**
The API runs on the base URL: `http://localhost:<PORT>`
Replace `<PORT>` with the actual port number specified in your environment.

---

## **1. Ingredients Management**

### **Add Ingredient**
- **Route**: `/ingredients`
- **Method**: `POST`
- **Description**: Add a new ingredient to the database.

#### **Request**
- **Body** (JSON):
```json
{
  "name": "Egg",
  "quantity": 12,
  "unit": "pieces"
}
```

#### **Response**
- **Status**: `201 Created`
- **Body**:
```json
{
  "_id": "64c123abc456def7890",
  "name": "Egg",
  "quantity": 12,
  "unit": "pieces",
  "lastUpdated": "2024-12-21T12:00:00Z"
}
```

---

### **Update Ingredient**
- **Route**: `/ingredients/:id`
- **Method**: `PUT`
- **Description**: Update an existing ingredient.

#### **Request**
- **Params**:
  - `id` (string): Ingredient ID.
- **Body** (JSON):
```json
{
  "quantity": 6
}
```

#### **Response**
- **Status**: `200 OK`
- **Body**:
```json
{
  "_id": "64c123abc456def7890",
  "name": "Egg",
  "quantity": 6,
  "unit": "pieces",
  "lastUpdated": "2024-12-21T12:30:00Z"
}
```

---

### **Get All Ingredients**
- **Route**: `/ingredients`
- **Method**: `GET`
- **Description**: Retrieve all ingredients in the database.

#### **Response**
- **Status**: `200 OK`
- **Body**:
```json
[
  {
    "_id": "64c123abc456def7890",
    "name": "Egg",
    "quantity": 6,
    "unit": "pieces",
    "lastUpdated": "2024-12-21T12:30:00Z"
  },
  {
    "_id": "64c987xyz123uvw456",
    "name": "Milk",
    "quantity": 1,
    "unit": "litre",
    "lastUpdated": "2024-12-21T12:45:00Z"
  }
]
```

---

## **2. Recipes Management**

### **Add Recipe (Text)**
- **Route**: `/recipes/add-text-recipe`
- **Method**: `POST`
- **Description**: Add a new recipe to the `my_fav_recipes.txt` file.

#### **Request**
- **Body** (JSON):
```json
{
  "title": "Pancakes",
  "ingredients": ["Flour", "Eggs", "Milk"],
  "instructions": [
    "Mix all ingredients together.",
    "Cook on a pan until golden brown."
  ],
  "taste": "Sweet",
  "cuisine": "American",
  "preparationTime": "15 minutes",
  "reviews": 4.5
}
```

#### **Response**
- **Status**: `201 Created`
- **Body**:
```json
{
  "message": "Recipe added successfully!"
}
```

---

### **Add Recipe (Image)**
- **Route**: `/recipes/add-image-recipe`
- **Method**: `POST`
- **Description**: Extract recipe details from an image using OCR and add it to `my_fav_recipes.txt`.

#### **Request**
- **Body** (JSON):
```json
{
  "imagePath": "./uploads/recipe-image.jpg"
}
```

#### **Response**
- **Status**: `201 Created`
- **Body**:
```json
{
  "message": "Recipe added from image successfully!"
}
```

---

### **Get All Recipes**
- **Route**: `/recipes`
- **Method**: `GET`
- **Description**: Retrieve all recipes stored in the database.

#### **Response**
- **Status**: `200 OK`
- **Body**:
```json
[
  {
    "_id": "64c123abc456def7890",
    "title": "Pancakes",
    "ingredients": ["Flour", "Eggs", "Milk"],
    "instructions": "Mix all ingredients together. Cook on a pan until golden brown.",
    "taste": "Sweet",
    "cuisine": "American",
    "preparationTime": "15 minutes",
    "reviews": 4.5
  }
]
```

---

### **Filter Recipes by Ingredients**
- **Route**: `/recipes/by-ingredients`
- **Method**: `POST`
- **Description**: Filter recipes based on available ingredients.

#### **Request**
- **Body** (JSON):
```json
{
  "availableIngredients": ["Egg", "Milk"]
}
```

#### **Response**
- **Status**: `200 OK`
- **Body**:
```json
[
  {
    "_id": "64c123abc456def7890",
    "title": "Pancakes",
    "ingredients": ["Flour", "Eggs", "Milk"],
    "instructions": "Mix all ingredients together. Cook on a pan until golden brown.",
    "taste": "Sweet",
    "cuisine": "American",
    "preparationTime": "15 minutes",
    "reviews": 4.5
  }
]
```

---

## **3. Chatbot Integration**

### **Chat with the Recipe Bot**
- **Route**: `/chatbot/chat`
- **Method**: `POST`
- **Description**: Interact with the chatbot to get recipe suggestions based on user preferences and available ingredients.

#### **Request**
- **Body** (JSON):
```json
{
  "query": "I want something sweet",
  "availableIngredients": ["Egg", "Milk"]
}
```

#### **Response**
- **Status**: `200 OK`
- **Body**:
```json
{
  "reply": "How about Pancakes? You already have most of the ingredients!"
}
```

---

## **Environment Variables**
Ensure the following environment variables are set in your `.env` file:

```
MONGO_URI=mongodb+srv://Recipes:H5C79dfRdR2stPWy@cluster0.dsubcfq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGO_DB_NAME=Recipes
OPENAI_API_KEY=sorry limit croshed
PORT=4000
```

---

## **Running the Application**

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Use the provided routes to manage ingredients, recipes, and interact with the chatbot.

---

## **Additional Notes**
- Ensure `my_fav_recipes.txt` exists in the `src/data` directory for recipe parsing.
- For image-based recipe addition, ensure valid image paths are passed.
- Use Postman or cURL to test the endpoints.

---

