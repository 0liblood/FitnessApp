import React, { useState } from 'react';
import { ExerciseProgress } from './ExerciseProgress';
import { RestTimer } from './RestTimer';
import { ExerciseTimer } from './ExerciseTimer';
import { Workout } from '../../../types';
import { PlayCircle, StopCircle } from 'lucide-react';

interface WorkoutTrackerProps {
  workout: Workout;
  onComplete: () => void;
}

export const WorkoutTracker = ({ workout, onComplete }: WorkoutTrackerProps) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [completedSets, setCompletedSets] = useState<Record<string, number>>({});

  const currentExercise = workout.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === workout.exercises.length - 1;
  const isLastSet = currentSet === currentExercise?.sets;

  const handleSetComplete = () => {
    setCompletedSets((prev) => ({
      ...prev,
      [currentExercise.id]: (prev[currentExercise.id] || 0) + 1,
    }));

    if (isLastSet) {
      if (isLastExercise) {
        onComplete();
      } else {
        setCurrentExerciseIndex((prev) => prev + 1);
        setCurrentSet(1);
        setIsResting(true);
      }
    } else {
      setCurrentSet((prev) => prev + 1);
      setIsResting(true);
    }
  };

  const handleSetFail = () => {
    // Optionally track failed sets
    handleSetComplete();
  };

  const handleRestComplete = () => {
    setIsResting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">{workout.name}</h3>
        <div className="flex items-center space-x-2">
          <ExerciseTimer duration={workout.duration * 60} onComplete={onComplete} />
          <button
            onClick={onComplete}
            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
          >
            <StopCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isResting ? (
        <RestTimer duration={60} onComplete={handleRestComplete} />
      ) : (
        currentExercise && (
          <ExerciseProgress
            exercise={currentExercise}
            currentSet={currentSet}
            onSetComplete={handleSetComplete}
            onSetFail={handleSetFail}
          />
        )
      )}

      <div className="mt-8">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Workout Progress</h4>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((currentExerciseIndex * 100) / workout.exercises.length) +
                ((currentSet - 1) * (100 / workout.exercises.length)) /
                  currentExercise.sets
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};