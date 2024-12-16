import React from 'react';
import { Clock, Flame } from 'lucide-react';
import { Activity } from '../../types';
import { format } from 'date-fns';
import './ActivityCard.less';

interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  return (
    <div className="activity-card">
      <div className="activity-header">
        <div>
          <h3 className="activity-title">{activity.type}</h3>
          <p className="activity-date">
            {format(new Date(activity.date), 'MMM d, yyyy - h:mm a')}
          </p>
        </div>
      </div>
      
      <div className="activity-details">
        <div className="detail-item">
          <Clock className="icon" />
          <span>{activity.duration} min</span>
        </div>
        <div className="detail-item">
          <Flame className="icon" />
          <span>{activity.caloriesBurned} cal</span>
        </div>
      </div>

      {activity.notes && (
        <div className="activity-notes">
          <p className="notes-title">Notes:</p>
          <p>{activity.notes}</p>
        </div>
      )}
    </div>
  );
};
