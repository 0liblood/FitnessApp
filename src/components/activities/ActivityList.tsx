import React from 'react';
import { useStore } from '../../store/useStore';
import { ActivityCard } from './ActivityCard';
import './ActivityList.less';

export const ActivityList = () => {
  const activities = useStore((state) => state.activities);

  if (activities.length === 0) {
    return (
      <div className="activity-list-empty">
        <p className="empty-message">No activities logged yet. Start by logging a new activity!</p>
      </div>
    );
  }

  return (
    <div className="activity-list-grid">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};
