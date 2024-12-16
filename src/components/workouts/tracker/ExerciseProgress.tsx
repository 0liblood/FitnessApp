import React from 'react';
import { Check, X } from 'lucide-react';
import { Exercise } from '../../../types';

interface ExerciseProgressProps {
  exercise: Exercise;
  currentSet: number;
  onSetComplete: () => void;
  onSetFail: () => void;
}

export const ExerciseProgress = ({ 
  exercise, 
  currentSet, 
  onSetComplete, 
  onSetFail 
}: ExerciseProgressProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{exercise.name}</h3>
          <p className="text-sm text-gray-500">
            Set {currentSet} of {exercise.sets} - {exercise.reps} reps
            {exercise.weight ? ` @ ${exercise.weight}kg` : ''}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onSetComplete}
            className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            onClick={onSetFail}
            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentSet - 1) / exercise.sets) * 100}%` }}
        />
      </div>
    </div>
  );
};