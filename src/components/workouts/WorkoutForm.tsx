import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Exercise, Workout } from '../../types';
import { Plus, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import { exerciseTemplates } from '../../data/workoutTemplates';
import './WorkoutForm.less';

interface WorkoutFormProps {
  onComplete: () => void;
}

export const WorkoutForm = ({ onComplete }: WorkoutFormProps) => {
  const addWorkout = useStore((state) => state.addWorkout);
  const workouts = useStore((state) => state.workouts); // Access existing workouts
  const [formData, setFormData] = useState({
    name: '',
    type: 'strength' as const,
    duration: 30,
    caloriesBurned: 100,
    exercises: [] as Exercise[],
    date: new Date().toISOString().slice(0, 16), // Default to current date and time in HTML5 format
  });
  const [showTemplates, setShowTemplates] = useState(false);

  /**
   * Handles the form submission.
   * - Prevents the default form behavior.
   * - Constructs a new workout object and adds it to the store.
   * - Calls the `onComplete` callback to signal form submission.
   * @param e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const defaultName = `Workout#${workouts.length + 1}`;
    const workout: Workout = {
      id: crypto.randomUUID(),
      ...formData,
      name: formData.name || defaultName, 
      date: new Date(formData.date), 
    };

    addWorkout(workout);
    onComplete();
  };

  /**
   * Adds an exercise to the form's exercises list.
   * - Generates a unique ID for each added exercise.
   * @param exercise - The exercise to add.
   */
  const addExercise = (exercise: Exercise) => {
    setFormData((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { ...exercise, id: crypto.randomUUID() }],
    }));
  };

  /**
   * Removes an exercise from the form's exercises list.
   * @param id - The ID of the exercise to remove.
   */
  const removeExercise = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((ex) => ex.id !== id),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="workout-form">
      <div className="form-group">
        <label className="form-label">Workout Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="form-input"
          placeholder="Enter workout name (optional)"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Workout Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as 'cardio' | 'strength' | 'mobility' })}
          className="form-select"
        >
          <option value="cardio">Cardio</option>
          <option value="strength">Strength</option>
          <option value="mobility">Mobility</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Date</label>
        <input
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Duration (minutes)</label>
        <input
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Calories Burned</label>
        <input
          type="number"
          value={formData.caloriesBurned}
          onChange={(e) => setFormData({ ...formData, caloriesBurned: Number(e.target.value) })}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <div className="exercises-section">
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

          <div className="exercises-list">
            {formData.exercises.map((exercise) => (
              <div key={exercise.id} className="exercise-item">
                <span className="exercise-name">{exercise.name}</span>
                <button
                  type="button"
                  onClick={() => removeExercise(exercise.id)}
                  className="remove-button"
                >
                  <X className="button-icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button type="submit" className="form-button">
        <Save className="button-icon" />
        Save Workout
      </button>
    </form>
  );
};
