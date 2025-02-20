import React, { useState } from 'react';
import { WorkoutList } from './WorkoutList';
import { WorkoutForm } from './WorkoutForm';
import { Plus, X } from 'lucide-react';

export const WorkoutDashboard = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Workouts</h2>
        {/* Button to toggle between showing the form or the list */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {/* Conditionally render button content based on form visibility */}
          {showForm ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              New Workout
            </>
          )}
        </button>
      </div>

      {/* Render the workout form or workout list based on the state */}
      {showForm ? (
        <WorkoutForm onComplete={() => setShowForm(false)} />
      ) : (
        <WorkoutList />
      )}
    </div>
  );
};
