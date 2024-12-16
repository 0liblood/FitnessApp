import React, { useState } from 'react';
import { WorkoutList } from './WorkoutList';
import { WorkoutForm } from './WorkoutForm';
import { WorkoutTracker } from './tracker/WorkoutTracker';
import { Plus, X } from 'lucide-react';
import { Workout } from '../../types';

export const WorkoutDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);

  const handleWorkoutComplete = () => {
    setActiveWorkout(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Workouts</h2>
        {!activeWorkout && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
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
        )}
      </div>

      {activeWorkout ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <WorkoutTracker workout={activeWorkout} onComplete={handleWorkoutComplete} />
        </div>
      ) : showForm ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <WorkoutForm onComplete={() => setShowForm(false)} />
        </div>
      ) : (
        <WorkoutList onWorkoutSelect={setActiveWorkout} />
      )}
    </div>
  );
};