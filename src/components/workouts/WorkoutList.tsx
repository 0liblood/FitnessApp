import React from 'react';
import { useStore } from '../../store/useStore';
import { WorkoutCard } from './WorkoutCard';
import { Workout } from '../../types';

interface WorkoutListProps {
  onWorkoutSelect: (workout: Workout) => void;
}

export const WorkoutList = ({ onWorkoutSelect }: WorkoutListProps) => {
  const workouts = useStore((state) => state.workouts);

  if (workouts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No workouts yet. Start by creating a new workout!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {workouts.map((workout) => (
        <WorkoutCard 
          key={workout.id} 
          workout={workout} 
          onClick={() => onWorkoutSelect(workout)}
        />
      ))}
    </div>
  );
};