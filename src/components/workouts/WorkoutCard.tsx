import React from 'react';
import { Clock, Dumbbell, Flame } from 'lucide-react';
import { Workout } from '../../types';
import { format } from 'date-fns';
import './WorkoutCard.less';

interface WorkoutCardProps {
  workout: Workout;
  onClick?: () => void;
}

export const WorkoutCard = ({ workout, onClick }: WorkoutCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="workout-card"
    >
      <div className="card-header">
        <div>
          <h3 className="workout-title">{workout.name}</h3>
          <p className="workout-type">{workout.type}</p>
        </div>
        <span className="workout-date">
          {format(new Date(workout.date), 'MMM d, yyyy')}
        </span>
      </div>
      
      <div className="card-details">
        <div className="detail-item">
          <Clock className="detail-icon" />
          <span>{workout.duration} min</span>
        </div>
        <div className="detail-item">
          <Flame className="detail-icon" />
          <span>{workout.caloriesBurned} cal</span>
        </div>
        <div className="detail-item">
          <Dumbbell className="detail-icon" />
          <span>{workout.exercises.length} exercises</span>
        </div>
      </div>
    </div>
  );
};
