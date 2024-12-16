import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Exercise, Workout } from '../../types';
import { Plus, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import { exerciseTemplates } from '../../data/workoutTemplates';

interface WorkoutFormProps {
  onComplete: () => void;
}

export const WorkoutForm = ({ onComplete }: WorkoutFormProps) => {
  const addWorkout = useStore((state) => state.addWorkout);
  const [formData, setFormData] = useState({
    name: '',
    type: 'strength' as const,
    duration: 30,
    caloriesBurned: 0,
    exercises: [] as Exercise[],
  });
  const [showTemplates, setShowTemplates] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const workout: Workout = {
      id: crypto.randomUUID(),
      ...formData,
      date: new Date(),
    };
    addWorkout(workout);
    onComplete();
  };

  const addExercise = (exercise: Exercise) => {
    setFormData((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { ...exercise, id: crypto.randomUUID() }],
    }));
  };

  const removeExercise = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((ex) => ex.id !== id),
    }));
  };

  const updateExercise = (id: string, updates: Partial<Exercise>) => {
    setFormData((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.id === id ? { ...ex, ...updates } : ex
      ),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Workout Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'cardio' | 'strength' | 'mobility' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
            <option value="mobility">Mobility</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Calories Burned</label>
          <input
            type="number"
            value={formData.caloriesBurned}
            onChange={(e) => setFormData({ ...formData, caloriesBurned: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">Exercises</label>
          <button
            type="button"
            onClick={() => setShowTemplates(!showTemplates)}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
          >
            {showTemplates ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Hide Templates
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Show Templates
              </>
            )}
          </button>
        </div>

        {showTemplates && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {exerciseTemplates[formData.type].map((exercise) => (
              <button
                key={exercise.id}
                type="button"
                onClick={() => addExercise(exercise)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                {exercise.name}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-2">
          {formData.exercises.map((exercise) => (
            <div key={exercise.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500">Name</label>
                  <p className="font-medium">{exercise.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Sets</label>
                  <input
                    type="number"
                    value={exercise.sets}
                    onChange={(e) => updateExercise(exercise.id, { sets: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Reps</label>
                  <input
                    type="number"
                    value={exercise.reps}
                    onChange={(e) => updateExercise(exercise.id, { reps: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                {exercise.weight !== undefined && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Weight (kg)</label>
                    <input
                      type="number"
                      value={exercise.weight}
                      onChange={(e) => updateExercise(exercise.id, { weight: Number(e.target.value) })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeExercise(exercise.id)}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Workout
      </button>
    </form>
  );
};