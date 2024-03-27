'use client';
import { useState } from 'react';


function WorkoutLogPage() {
    // State to manage the selected exercise and custom exercise input
    const [selectedExercise, setSelectedExercise] = useState('');
    const [customExercise, setCustomExercise] = useState('');
    return (
      <div className="min-h-screen flex flex-col items-center py-8 bg-[#f4e8de]"> 
        <h2 className="text-2xl font-bold text-[#736558] mb-4">Workout Log</h2> 
  
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <form className="space-y-4">
          <div>
            <label htmlFor="exercise" className="text-gray-700 font-semibold">Exercise</label>
            <select 
                id="exercise" 
                value={selectedExercise}
                onChange={(e) => {
                    setSelectedExercise(e.target.value);
                    if (e.target.value !== "Other") {
                        setCustomExercise('');
                    }
                }}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            >
                <option value="">Select Exercise</option>
                <option value="Running">Running</option>
                <option value="Cycling">Cycling</option>
                <option value="Swimming">Swimming</option>
                <option value="Strength training">Strength training</option>
                <option value="Yoga">Yoga</option>
                <option value="Boxing">Boxing</option>
                <option value="Dance">Dance</option>
                <option value="Ball">Ball</option>
                {/* Add more predefined options here */}
                <option value="Other">Other</option>
            </select>
              {selectedExercise === 'Other' && (
                  <input 
                      type="text" 
                      value={customExercise}
                      onChange={(e) => setCustomExercise(e.target.value)}
                      placeholder="Type of exercise" 
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md" 
                  />
              )}
            </div>
            <div>
              <label htmlFor="intensity" className="text-gray-700 font-semibold">Intensity</label>
              <select id="intensity" className="mt-1 w-full p-2 border border-gray-300 rounded-md">
                  <option value="Light">Light</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Intense">Intense</option>
              </select>
            </div>
            <div>
              <label htmlFor="duration" className="text-gray-700 font-semibold">Duration (minutes)</label>
              <input type="number" id="duration" placeholder="Duration in minutes" className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="date" className="text-gray-700 font-semibold">Date</label>
              <input type="date" id="date" className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
                <label htmlFor="notes" className="text-gray-700 font-semibold">Notes</label>
                <textarea id="notes" placeholder="Additional notes" className="mt-1 w-full p-2 border border-gray-300 rounded-md" rows="4"></textarea>
            </div>
            <button type="submit" className="w-full p-2 bg-[#736558] text-white rounded-md hover:bg-[#715f4e]">Log Workout</button> {/* Adjusted colors for consistency */}
          </form>
        </div>
  
        {/* Placeholder for workout entries list */}
        <div className="mt-8 w-full max-w-md">
          <h3 className="text-xl text-[#736558] font-semibold mb-2">Previous Entries</h3> {/* Adjusted text color for consistency */}
          {/* Mock entry */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h4 className="text-gray-800 font-semibold">Running</h4>
            <p className="text-gray-600">Duration: 30 minutes</p>
            <p className="text-gray-600">Date: 2023-03-15</p>
          </div>
          {/* Repeat for more entries */}
        </div>
      </div>
    );
  }
  
  export default WorkoutLogPage;
  