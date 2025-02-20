import { Activity, Workout } from '../types';
import { eachDayOfInterval, isSameDay, subWeeks } from 'date-fns';

/**
 * Calculates the current streak of consecutive days with recorded activities or workouts.
 * - Streak is determined by the latest consecutive days of events without a break.
 * @param activities - List of user activities.
 * @param workouts - List of user workouts.
 * @returns The number of consecutive days in the current streak.
 */
export const calculateStreak = (activities: Activity[], workouts: Workout[]): number => {
  const allEvents = [...activities, ...workouts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (allEvents.length === 0) return 0;

  let streak = 1;
  let currentDate = new Date(allEvents[0].date);

  for (let i = 1; i < allEvents.length; i++) {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);

    if (isSameDay(new Date(allEvents[i].date), prevDate)) {
      streak++;
      currentDate = prevDate;
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Calculates weekly progress data for the last 4 weeks.
 * - Combines activities and workouts to compute daily calories burned and durations.
 * @param activities - List of user activities.
 * @param workouts - List of user workouts.
 * @returns An array of progress data for each day in the last 4 weeks.
 */
export const calculateWeeklyProgress = (activities: Activity[], workouts: Workout[]) => {
  const now = new Date();
  const fourWeeksAgo = subWeeks(now, 4);
  const days = eachDayOfInterval({ start: fourWeeksAgo, end: now });

  return days.map(day => {
    const dayActivities = activities.filter(a => isSameDay(new Date(a.date), day));
    const dayWorkouts = workouts.filter(w => isSameDay(new Date(w.date), day));

    return {
      date: day,
      calories: [
        ...dayActivities.map(a => a.caloriesBurned),
        ...dayWorkouts.map(w => w.caloriesBurned)
      ].reduce((acc, curr) => acc + curr, 0),
      duration: [
        ...dayActivities.map(a => a.duration),
        ...dayWorkouts.map(w => w.duration)
      ].reduce((acc, curr) => acc + curr, 0)
    };
  });
};
