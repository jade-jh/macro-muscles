// pages/recommendation.js
'use client';
import { useState } from 'react';
export default function Recommendation() {
    const [muscle, setMuscle] = useState('');
    const [query, setQuery] = useState('');
    const [exerciseRecommendations, setExerciseRecommendations] = useState([]);
    const [recipeRecommendations, setRecipeRecommendations] = useState([]);

    // Function to fetch exercise recommendations
    const fetchExerciseRecommendations = async () => {
        try {
            const response = await fetch(`/api/exercise-api?query=${muscle}`);
            const data = await response.json();
            setExerciseRecommendations(data);
        } catch (error) {
            console.error('Error fetching exercise recommendations:', error);
        }
    };

    // Function to fetch recipe recommendations
    const fetchRecipeRecommendations = async () => {
        try {
            const response = await fetch(`/api/recipe-api?query=${query}`);
            const data = await response.json();
            setRecipeRecommendations(data);
        } catch (error) {
            console.error('Error fetching recipe recommendations:', error);
        }
    };

    const handleFetchRecommendations = () => {
        // Fetch exercise recommendations
        if (muscle) {
            fetchExerciseRecommendations();
        }

        // Fetch recipe recommendations
        if (query) {
            fetchRecipeRecommendations();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-8 bg-[#f4e8de]">
            <h1 className="text-6xl font-bold text-gray-700 italic drop-shadow-2xl mb-8">Get Recommendations</h1>
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="muscle" className="text-gray-700 font-semibold">
                            Enter Muscle Group:
                        </label>
                        <input
                            type="text"
                            id="muscle"
                            value={muscle}
                            onChange={(e) => setMuscle(e.target.value)}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="query" className="text-gray-700 font-semibold">
                            Enter Recipe Query:
                        </label>
                        <input
                            type="text"
                            id="query"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <button
                        onClick={handleFetchRecommendations}
                        className="w-full p-2 bg-[#736558] text-white rounded-md hover:bg-[#715f4e]"
                    >
                        Fetch Recommendations
                    </button>
                </div>
            </div>
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Exercise Recommendations</h2>
                        <ul>
                            {exerciseRecommendations.map((exercise, index) => (
                                <li key={index} className="mb-4">
                                    <h3 className="text-gray-800 font-semibold">{exercise.name}</h3>
                                    <p className="text-gray-600">{exercise.instructions}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Recipe Recommendations</h2>
                        <ul>
                            {recipeRecommendations.map((recipe, index) => (
                                <li key={index} className="mb-4">
                                    <h3 className="text-gray-800 font-semibold">{recipe.title}</h3>
                                    <p className="text-gray-600">{recipe.instructions}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
