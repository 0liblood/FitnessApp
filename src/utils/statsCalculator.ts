import { Activity, Workout } from '../types';
import { startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

/**
 * Calculates weekly statistics for activities and workouts.
 * - Includes totals for activities, workouts, duration, and calories burned within the current week.
 * @param activities - List of user activities.
 * @param workouts - List of user workouts.
 * @returns Weekly statistics including total activities, workouts, duration, and calories burned.
 */
export const calculateWeeklyStats = (activities: Activity[], workouts: Workout[]) => {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  const weeklyActivities = activities.filter((activity) =>
    isWithinInterval(new Date(activity.date), { start: weekStart, end: weekEnd })
  );

  const weeklyWorkouts = workouts.filter((workout) =>
    isWithinInterval(new Date(workout.date), { start: weekStart, end: weekEnd })
  );

  return {
    totalActivities: weeklyActivities.length,
    totalWorkouts: weeklyWorkouts.length,
    totalDuration: [
      ...weeklyActivities.map((a) => a.duration),
      ...weeklyWorkouts.map((w) => w.duration),
    ].reduce((acc, curr) => acc + curr, 0),
    totalCalories: [
      ...weeklyActivities.map((a) => a.caloriesBurned),
      ...weeklyWorkouts.map((w) => w.caloriesBurned),
    ].reduce((acc, curr) => acc + curr, 0),
  };
};

/**
 * Calculates the distribution of activity types.
 * - Counts occurrences of each activity type.
 * @param activities - List of user activities.
 * @returns An object with activity types as keys and their counts as values.
 */
export const getActivityTypeDistribution = (activities: Activity[]) => {
  return activities.reduce((acc, activity) => {
    acc[activity.type] = (acc[activity.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Calculates the distribution of workout types.
 * - Counts occurrences of each workout type.
 * @param workouts - List of user workouts.
 * @returns An object with workout types as keys and their counts as values.
 */
export const getWorkoutTypeDistribution = (workouts: Workout[]) => {
  return workouts.reduce((acc, workout) => {
    acc[workout.type] = (acc[workout.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};
