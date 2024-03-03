function WorkoutLogPage() {
    return (
      <div className="min-h-screen flex flex-col items-center py-8 bg-[#f4e8de]"> {/* Adjusted background color for consistency */}
        <h2 className="text-2xl font-bold text-[#736558] mb-4">Workout Log</h2> {/* Adjusted text color for consistency */}
  
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <form className="space-y-4">
            <div>
              <label htmlFor="exercise" className="text-gray-700 font-semibold">Exercise</label>
              <input type="text" id="exercise" placeholder="Type of exercise" className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
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
  