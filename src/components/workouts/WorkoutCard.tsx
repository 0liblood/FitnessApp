import React from 'react';
import { Clock, Dumbbell, Flame } from 'lucide-react';
import { Workout } from '../../types';
import { format } from 'date-fns';

interface WorkoutCardProps {
  workout: Workout;
  onClick?: () => void;
}

export const WorkoutCard = ({ workout, onClick }: WorkoutCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{workout.type}</p>
        </div>
        <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
          {format(new Date(workout.date), 'MMM d, yyyy')}
        </span>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>{workout.duration} min</span>
        </div>
        <div className="flex items-center">
          <Flame className="w-4 h-4 mr-1" />
          <span>{workout.caloriesBurned} cal</span>
        </div>
        <div className="flex items-center">
          <Dumbbell className="w-4 h-4 mr-1" />
          <span>{workout.exercises.length} exercises</span>
        </div>
      </div>
    </div>
  );
};