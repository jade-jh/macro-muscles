function MealLogPage() {
    return (
      <div className="min-h-screen flex flex-col items-center py-8 bg-[#f4e8de]">
        <h2 className="text-2xl font-bold text-[#736558] mb-4">Meal Log</h2>
  
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <form className="space-y-4">
            <div>
              <label htmlFor="mealType" className="text-gray-700 font-semibold">Meal Type</label>
              <input type="text" id="mealType" placeholder="Breakfast, Lunch, etc." className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="calories" className="text-gray-700 font-semibold">Calories</label>
              <input type="number" id="calories" placeholder="Estimated calories" className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="mealDate" className="text-gray-700 font-semibold">Date</label>
              <input type="date" id="mealDate" className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
                <label htmlFor="mealNotes" className="text-gray-700 font-semibold">Notes</label>
                <textarea id="mealNotes" placeholder="Ingredients, how you felt, etc." className="mt-1 w-full p-2 border border-gray-300 rounded-md" rows="4"></textarea>
            </div>
            <button type="submit" className="w-full p-2 bg-[#736558] text-white rounded-md hover:bg-[#715f4e]">Log Meal</button>
          </form>
        </div>
  
        {/* Placeholder for meal entries list */}
        <div className="mt-8 w-full max-w-md">
          <h3 className="text-xl text-[#736558] font-semibold mb-2">Previous Entries</h3>
          {/* Mock entry */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h4 className="text-gray-800 font-semibold">Lunch</h4>
            <p className="text-gray-600">Calories: 600</p>
            <p className="text-gray-600">Date: 2023-03-15</p>
            <p className="text-gray-600">Notes: Felt energized after eating.</p>
          </div>
          {/* Repeat for more entries */}
        </div>
      </div>
    );
  }
  
  export default MealLogPage;
  