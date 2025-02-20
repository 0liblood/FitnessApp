import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { WorkoutCard } from './WorkoutCard';
import { Workout } from '../../types';
import { Trash2 } from 'lucide-react';
import './WorkoutList.less';

interface WorkoutListProps {
  onWorkoutSelect?: (workout: Workout) => void;
}

/**
 * Renders a list of workouts with options to select or delete each workout.
 * @param onWorkoutSelect - Optional callback when a workout is selected.
 */
export const WorkoutList = ({ onWorkoutSelect }: WorkoutListProps) => {
  const { workouts, setWorkouts } = useStore();
  const [showPopup, setShowPopup] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState<string | null>(null);

  /**
   * Handles the delete button click event.
   * - Sets the target workout ID to be deleted.
   * - Shows the confirmation popup.
   * @param id - The ID of the workout to delete.
   */
  const handleDeleteClick = (id: string) => {
    setWorkoutToDelete(id);
    setShowPopup(true);
  };

  /**
   * Confirms the deletion of the selected workout.
   * - Removes the workout from the workouts list.
   * - Resets the state and hides the confirmation popup.
   */
  const confirmDelete = () => {
    if (workoutToDelete) {
      setWorkouts(workouts.filter((workout) => workout.id !== workoutToDelete));
    }
    setWorkoutToDelete(null);
    setShowPopup(false);
  };

  /**
   * Cancels the deletion process.
   * - Resets the state and hides the confirmation popup.
   */
  const cancelDelete = () => {
    setWorkoutToDelete(null);
    setShowPopup(false);
  };

  if (workouts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No workouts yet. Start by creating a new workout!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-16">
        {workouts.map((workout) => (
          <div key={workout.id} className="workout-item">
            <WorkoutCard workout={workout} onClick={() => onWorkoutSelect?.(workout)} />
            <button
              onClick={() => handleDeleteClick(workout.id)}
              className="delete-button"
              title="Delete Workout"
            >
              <Trash2 className="button-icon" />
            </button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Are you sure you want to delete this workout?</p>
            <div className="popup-actions">
              <button className="popup-confirm" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className="popup-cancel" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
