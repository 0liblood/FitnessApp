import React from 'react';
import { useStore } from '../../store/useStore';
import { CaloriesChart } from './charts/CaloriesChart';
import { DurationChart } from './charts/DurationChart';
import { calculateStreak, calculateWeeklyProgress } from '../../utils/progressCalculator';
import { Trophy, Zap, Target, TrendingUp } from 'lucide-react';
import './ProgressDashboard.less';

export const ProgressDashboard = () => {
  const { activities, workouts, profile } = useStore();
  const streak = calculateStreak(activities, workouts);
  const progressData = calculateWeeklyProgress(activities, workouts);

  // Calculate total calories, total duration, and total workouts from progress data
  const totalCalories = progressData.reduce((sum, day) => sum + day.calories, 0);
  const totalDuration = progressData.reduce((sum, day) => sum + day.duration, 0);
  const totalWorkouts = workouts.length;

  // Prepare goals data for mapping against profile goals
  const goalsData = {
    calories: totalCalories,
    minutes: totalDuration,
    workouts: totalWorkouts,
  };

  // Define goal labels and targets
  const goalMapping = {
    calories: { label: 'Burn 2000 calories weekly', target: 2000 },
    minutes: { label: '300 active minutes weekly', target: 300 },
    workouts: { label: 'Complete 5 workouts weekly', target: 5 },
  };

  return (
    <div className="progress-dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Progress</h2>
        <div className="time-period">
          <TrendingUp className="icon" />
          <span>Last 30 Days</span>
        </div>
      </div>

      <div className="stats-grid">
        {/* Display current streak */}
        <div className="stat-card">
          <div className="card-header">
            <div>
              <p className="stat-title">Current Streak</p>
              <p className="stat-value">{streak} days</p>
            </div>
            <div className="icon-container streak">
              <Zap className="icon" />
            </div>
          </div>
          <p className="stat-description">Keep up the momentum!</p>
        </div>

        {/* Display total calories */}
        <div className="stat-card">
          <div className="card-header">
            <div>
              <p className="stat-title">Total Calories</p>
              <p className="stat-value">{totalCalories}</p>
            </div>
            <div className="icon-container calories">
              <Trophy className="icon" />
            </div>
          </div>
          <p className="stat-description">Calories burned this period</p>
        </div>

        {/* Display total active minutes */}
        <div className="stat-card">
          <div className="card-header">
            <div>
              <p className="stat-title">Active Minutes</p>
              <p className="stat-value">{totalDuration}</p>
            </div>
            <div className="icon-container minutes">
              <Target className="icon" />
            </div>
          </div>
          <p className="stat-description">Total active time this period</p>
        </div>
      </div>

      <div className="charts-grid">
        {/* Display calories chart */}
        <div className="chart-card">
          <h3 className="chart-title">Calories Burned</h3>
          <CaloriesChart data={progressData} />
        </div>

        {/* Display active minutes chart */}
        <div className="chart-card">
          <h3 className="chart-title">Active Minutes</h3>
          <DurationChart data={progressData} />
        </div>
      </div>

      <div className="goals-section">
        <h3 className="goals-title">Goals Progress</h3>
        <div className="space-y-4">
          {/* Map and display progress for each goal */}
          {(profile?.goals as (keyof typeof goalsData)[]).map((goalId, index) => {
            const goal = goalMapping[goalId];
            
            // Check if goal exists
            if (!goal) {
              console.error(`Goal not found: ${goalId}`);
              return null; // Skip rendering this goal if it doesn't exist
            }

            return (
              <div key={index} className="goal-item">
                <div className="flex-1">
                  <p className="goal-label">{goal.label}</p>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${Math.min((goalsData[goalId] / goal.target) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="goal-status">
                  {Math.min(goalsData[goalId], goal.target)} / {goal.target}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
