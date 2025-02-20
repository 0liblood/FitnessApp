import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ActivityCard } from './ActivityCard';
import { Activity } from '../../types';
import { Trash2 } from 'lucide-react';
import './ActivityList.less';

export const ActivityList = () => {
  const { activities, setActivities } = useStore();
  const [deleteTarget, setDeleteTarget] = useState<Activity | null>(null);

  /**
   * Deletes an activity by its ID.
   * - Filters the activity list to remove the specified activity.
   * - Closes the delete confirmation popup after the activity is deleted.
   * @param id - The ID of the activity to be deleted.
   */
  const deleteActivity = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== id));
    setDeleteTarget(null); // Close popup after deletion
  };

  // Render a message if no activities are available.
  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No activities logged yet. Start by logging a new activity!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <ActivityCard activity={activity} />
            <button
              onClick={() => setDeleteTarget(activity)}
              className="delete-button"
              title="Delete Activity"
            >
              <Trash2 className="button-icon" />
            </button>
          </div>
        ))}
      </div>

      {deleteTarget && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Are you sure you want to delete this activity?</p>
            <div className="popup-actions">
              <button
                onClick={() => deleteActivity(deleteTarget.id)}
                className="popup-confirm"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="popup-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
