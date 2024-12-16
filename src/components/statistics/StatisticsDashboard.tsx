import React from 'react';
import { useStore } from '../../store/useStore';
import { StatCard } from './StatCard';
import { DistributionCard } from './DistributionCard';
import { 
  calculateWeeklyStats, 
  getActivityTypeDistribution, 
  getWorkoutTypeDistribution 
} from '../../utils/statsCalculator';
import { Activity, Flame, Timer, Dumbbell } from 'lucide-react';
import './StatisticsDashboard.less';

export const StatisticsDashboard = () => {
  const { activities, workouts } = useStore();
  const weeklyStats = calculateWeeklyStats(activities, workouts);
  const activityDistribution = getActivityTypeDistribution(activities);
  const workoutDistribution = getWorkoutTypeDistribution(workouts);

  return (
    <div className="statistics-dashboard">
      <h2 className="dashboard-title">Statistics</h2>
      
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
    </div>
  );
};
