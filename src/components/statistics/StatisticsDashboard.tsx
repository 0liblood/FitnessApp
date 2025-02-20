import React from 'react';
import { useStore } from '../../store/useStore';
import { StatCard } from './StatCard';
import { DistributionCard } from './DistributionCard';
import {
  calculateWeeklyStats,
  getActivityTypeDistribution,
  getWorkoutTypeDistribution,
} from '../../utils/statsCalculator';
import { Activity, Flame, Timer, Dumbbell, PlusCircle } from 'lucide-react';
import './StatisticsDashboard.less';
import { useNavigate } from 'react-router-dom';

export const StatisticsDashboard = () => {
  const { activities, workouts } = useStore();
  const weeklyStats = calculateWeeklyStats(activities, workouts);
  const activityDistribution = getActivityTypeDistribution(activities);
  const workoutDistribution = getWorkoutTypeDistribution(workouts);
  const navigate = useNavigate();

  // Cards for action navigation
  const cards = [
    {
      title: 'Log New Activity',
      description: 'Track a new activity to stay on top of your fitness journey.',
      navigateTo: '/activities',
    },
    {
      title: 'Create New Workout',
      description: 'Plan a workout to achieve your fitness goals.',
      navigateTo: '/workouts',
    },
  ];

  return (
    <div className="statistics-dashboard">
      <h2 className="dashboard-title">Statistics</h2>

      {/* Grid displaying weekly statistics */}
      <div className="stats-grid">
        <StatCard
          title="Weekly Activities"
          value={weeklyStats.totalActivities}
          icon={Activity}
          description="Total activities this week"
        />
        <StatCard
          title="Weekly Workouts"
          value={weeklyStats.totalWorkouts}
          icon={Dumbbell}
          description="Total workouts this week"
        />
        <StatCard
          title="Active Minutes"
          value={weeklyStats.totalDuration}
          icon={Timer}
          description="Total duration this week"
        />
        <StatCard
          title="Calories Burned"
          value={weeklyStats.totalCalories}
          icon={Flame}
          description="Total calories this week"
        />
      </div>

      {/* Grid displaying distribution charts */}
      <div className="distribution-grid">
        <DistributionCard
          title="Activity Distribution"
          distribution={activityDistribution}
        />
        <DistributionCard
          title="Workout Distribution"
          distribution={workoutDistribution}
        />
      </div>

      {/* Action cards for navigating to new activities or workouts */}
      <div className="action-cards">
        {cards.map((card, index) => (
          <div
            key={index}
            className="action-card"
            onClick={() => navigate(card.navigateTo)}
          >
            <div className="card-icon">
              <PlusCircle className="icon" />
            </div>
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
