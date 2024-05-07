'use client';
import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function CalorieVisualization() {
    const [mealData, setMealData] = useState(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        async function fetchMealsData() {
            try {
                const response = await fetch('/api/get-meals');
                if (!response.ok) {
                    throw new Error('Failed to fetch meals data');
                }
                const data = await response.json();
                setMealData(data.meals);
            } catch (error) {
                console.error('Error fetching meals data:', error);
            }
        }
        fetchMealsData();
    }, []);

    useEffect(() => {
        if (mealData) {
            if (chartInstance) {
                chartInstance.destroy(); // Destroy existing chart instance
            }
            renderPieChart(mealData);
        }
    }, [mealData]);

    const renderPieChart = (meals) => {
        const totalCalories = calculateTotalCalories(meals);
        const labels = [];
        const data = [];
        const backgroundColors = [];

        meals.forEach((meal, index) => {
            labels.push(`Meal ${index + 1}`);
            data.push(meal.calories);
            backgroundColors.push(getRandomColor());
        });

        const ctx = document.getElementById('calorieChart');
        const newChartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Calories per Entry',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
        setChartInstance(newChartInstance); // Save the new chart instance
    };

    const calculateTotalCalories = (meals) => {
        return meals.reduce((total, meal) => total + meal.calories, 0);
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className="flex flex-col items-center justify-between p-24">
            <h2 className="text-6xl font-bold text-white italic drop-shadow-2xl">Calorie Visualization</h2>
            <canvas id="calorieChart"></canvas>
        </div>
    );
}

export default CalorieVisualization;