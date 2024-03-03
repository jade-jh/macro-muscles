'use client';
import React from 'react';
import Link from 'next/link'; // Import Link from Next.js

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4e8de] p-4">
      <div className="w-full max-w-4xl flex flex-wrap justify-around items-center gap-6">
        {/* Workout Log */}
        <div className="flex-1">
          <Link href="/dashboard/workout" passHref>
            <button className="w-full h-full bg-[#736558] rounded-lg shadow-lg p-6 cursor-pointer hover:bg-[#715f4e] text-white transition-colors duration-300">
              <h2 className="text-xl font-semibold">Workout Log</h2>
              <p>Track your workouts effectively.</p>
            </button>
          </Link>
        </div>

        {/* Meal Log */}
        <div className="flex-1">
          <Link href="/dashboard/meal" passHref>
            <button className="w-full h-full bg-[#736558] rounded-lg shadow-lg p-6 cursor-pointer hover:bg-[#715f4e] text-white transition-colors duration-300">
              <h2 className="text-xl font-semibold">Meal Log</h2>
              <p>Monitor your dietary habits.</p>
            </button>
          </Link>
        </div>

        {/* Data Visualization Placeholder */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6 text-[#736558]">
          <h2 className="text-xl font-semibold">Data Visualization</h2>
          <p>Insights into your health journey.</p>
        </div>

        {/* Recommendations Placeholder */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6 text-[#736558]">
          <h2 className="text-xl font-semibold">Recommendations</h2>
          <p>Personalized advice for you.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
