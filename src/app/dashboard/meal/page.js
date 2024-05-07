'use client';
import React, { useState, useEffect } from 'react';

function MealLogPage() {
  const [mealCategory, setMealCategory] = useState('');
  const [calories, setCalories] = useState('');
  const [mealDate, setMealDate] = useState('');
  const [mealNotes, setMealNotes] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchLoggedMeals();
  }, []);

  const fetchLoggedMeals = async () => {
    try {
      const response = await fetch('/api/get-meals');
      if (!response.ok) {
        throw new Error('Failed to fetch meals');
      }
      const data = await response.json();
      setEntries(data.meals);
    } catch (error) {
      console.error('Error fetching meals: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submit-meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mealCategory, foodItems, calories, mealDate, mealNotes })
      });

      if (!response.ok) {
        throw new Error('Failed to log meal');
      }

      const newEntry = {
        mealCategory,
        calories,
        mealDate,
        mealNotes,
        foodItems
      };

      setEntries([...entries, newEntry]);

      setMealCategory('');
      setCalories('');
      setMealDate('');
      setMealNotes('');
      setFoodItems([]);
    } catch (error) {
      console.error('Error logging meal: ', error);
    }
  };


  const addFoodItem = () => {
    const newFoodItem = {
      name: '',
      amount: '',
      category: '',
      calories: '',
    };
    setFoodItems([...foodItems, newFoodItem]);
  };

  const calculateCaloriesForItem = async (index) => {
    const query = foodItems[index].amount + " " + foodItems[index].name;
    const result = await fetch(`/api/calculate-calories?query=${query}`);
    const data = await result.json();
    handleFoodItemChange(index, 'calories', data.calories);
  }

  const calculateTotalCalories = () => {
    let totalCalories = 0;
    foodItems.forEach((item) => {
      totalCalories += Number(item.calories);
    });
    setCalories(totalCalories);
  }

  const handleFoodItemChange = (index, field, value) => {
    const updatedFoodItems = [...foodItems];
    updatedFoodItems[index][field] = value;
    setFoodItems(updatedFoodItems);
    if (field === 'name' || field === 'amount') {
      void calculateCaloriesForItem(index);
    }
    if (field === 'calories') {
      void calculateTotalCalories();
    }
  };

  const removeFoodItem = (index) => {
    const updatedFoodItems = [...foodItems];
    updatedFoodItems.splice(index, 1);
    setFoodItems(updatedFoodItems);
  };

  const formatNewEntry = () => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h4 className="text-gray-800 font-semibold">{mealCategory}</h4>
      <p className="text-gray-600">Calories: {calories}</p>
      <p className="text-gray-600">Date: {mealDate}</p>
      <p className="text-gray-600">Notes: {mealNotes}</p>
      <div className="mt-2">
        {foodItems.map((foodItem, i) => (
          <div key={i} className="flex items-center gap-4">
            <p className="text-gray-600">Food Name: {foodItem.name}</p>
            <p className="text-gray-600">Amount: {foodItem.amount}</p>
            <p className="text-gray-600">Category: {foodItem.category}</p>
            <p className="text-gray-600">Calories: {foodItem.calories}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center py-8 bg-[#f4e8de]">
      <h2 className="text-2xl font-bold text-[#736558] mb-4">Meal Log</h2>

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="mealCategory" className="text-gray-700 font-semibold">
              Meal Category
            </label>
            <select
              id="mealCategory"
              value={mealCategory}
              onChange={(e) => setMealCategory(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>

          {/* Food Items */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Food Items</h3>
            <div className="flex flex-col gap-2">
              {foodItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="Food Name"
                    value={item.name}
                    onChange={(e) => handleFoodItemChange(index, 'name', e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="100g"
                    value={item.amount}
                    onChange={(e) => handleFoodItemChange(index, 'amount', e.target.value)}
                    className="w-24 p-2 border border-gray-300 rounded-md"
                  />
                  <select
                    value={item.category}
                    onChange={(e) => handleFoodItemChange(index, 'category', e.target.value)}
                    className="w-32 p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Category</option>
                    <option value="Protein">Protein</option>
                    <option value="Carbs">Carbs</option>
                    <option value="Fats">Fats</option>
                    <option value="Vitamins">Vitamins</option>
                    <option value="Minerals">Minerals</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Calories"
                    value={item.calories}
                    onChange={(e) => handleFoodItemChange(index, 'calories', e.target.value)}
                    className="w-24 p-2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeFoodItem(index)}
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-400"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFoodItem}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 mt-2"
            >
              Add Food Item
            </button>
          </div>

          <div>
            <label htmlFor="calories" className="text-gray-700 font-semibold">
              Calories
            </label>
            <input
              disabled
              type="number"
              id="calories"
              placeholder="Estimated calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="mealDate" className="text-gray-700 font-semibold">
              Date
            </label>
            <input
              type="date"
              id="mealDate"
              value={mealDate}
              onChange={(e) => setMealDate(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="mealNotes" className="text-gray-700 font-semibold">
              Notes
            </label>
            <textarea
              id="mealNotes"
              placeholder="Ingredients, how you felt, etc."
              value={mealNotes}
              onChange={(e) => setMealNotes(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-[#736558] text-white rounded-md hover:bg-[#715f4e]"
          >
            Log Meal
          </button>
        </form>
      </div>

      {/* Placeholder for meal entries list */}
      <div className="mt-8 w-full max-w-md">
        <h3 className="text-xl text-[#736558] font-semibold mb-2">Previous Entries</h3>
      {entries.map((entry, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h4 className="text-gray-800 font-semibold">{entry.mealCategory}</h4>
          <p className="text-gray-600">Calories: {entry.calories}</p>
          <p className="text-gray-600">Date: {entry.mealDate}</p>
          <p className="text-gray-600">Notes: {entry.mealNotes}</p>
          <div className="mt-2">
            {entry.foodItems.map((foodItem, i) => (
              <div key={i} className="flex items-center gap-4">
                <p className="text-gray-600">Food Name: {foodItem.name}</p>
                <p className="text-gray-600">Amount: {foodItem.amount}</p>
                <p className="text-gray-600">Category: {foodItem.category}</p>
                <p className="text-gray-600">Calories: {foodItem.calories}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default MealLogPage;