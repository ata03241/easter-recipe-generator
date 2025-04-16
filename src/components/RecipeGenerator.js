import React, { useState } from 'react';
import './RecipeGenerator.css'; // Importing external CSS for styling

const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY; // API key for external API (if needed)

function RecipeGenerator() {
    const [recipe, setRecipe] = useState(null); // State to hold the selected recipe
    const [loading, setLoading] = useState(false); // State to handle loading state

    if (!apiKey) {
        console.error('API key is missing. Please set REACT_APP_SPOONACULAR_API_KEY in your environment variables.');
        return <div className="error">API key is missing. Please configure your environment variables.</div>;
    }

    const fetchRecipe = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            const recipeData = data.recipes[0];
            setRecipe({
                title: recipeData.title,
                image: recipeData.image, // Add the recipe image URL
                ingredients: recipeData.extendedIngredients.map(ing => ing.original),
                instructions: recipeData.instructions || 'No instructions provided.',
            });
        } catch (error) {
            console.error('Error fetching recipe:', error);
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    return (
        <div className="recipe-generator">
            <h2 className="title">Random Easter Recipe</h2>
            <button className="generate-button" onClick={fetchRecipe} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Recipe'}
            </button>

            {recipe && (
                <div className="recipe-card">
                    <h3 className="recipe-title">{recipe.title}</h3>
                    {/* Display the recipe image */}
                    <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                    <div className="recipe-content">
                        <p><strong>Ingredients:</strong></p>
                        <ul className="ingredients-list">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <p><strong>Instructions:</strong></p>
                        <ol className="instructions-list">
                            {recipe.instructions.split('\n').map((step, index) => (
                                <li key={index}>{step.trim()}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecipeGenerator;