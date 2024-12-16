import React from 'react';
import { useStore } from '../../store/useStore';
import { CaloriesChart } from './charts/CaloriesChart';
import { DurationChart } from './charts/DurationChart';
import { calculateStreak, calculateWeeklyProgress } from '../../utils/progressCalculator';
import { Trophy, Zap, Target, TrendingUp } from 'lucide-react';

export const ProgressDashboard = () => {
  const { activities, workouts, profile } = useStore();
  const streak = calculateStreak(activities, workouts);
  const progressData = calculateWeeklyProgress(activities, workouts);

  const totalCalories = progressData.reduce((sum, day) => sum + day.calories, 0);
  const totalDuration = progressData.reduce((sum, day) => sum + day.duration, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Progress</h2>
        <div className="flex items-center space-x-2 text-indigo-600">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm font-medium">Last 30 Days</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Streak</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{streak} days</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-full">
              <Zap className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Keep up the momentum!</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Calories</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{totalCalories}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Calories burned this period</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Minutes</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{totalDuration}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Total active time this period</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Calories Burned</h3>
          <CaloriesChart data={progressData} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Minutes</h3>
          <DurationChart data={progressData} />
        </div>
      </div>

      {profile?.goals.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals Progress</h3>
          <div className="space-y-4">
            {profile.goals.map((goal, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{goal}</p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};