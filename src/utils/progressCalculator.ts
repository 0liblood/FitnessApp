import { Activity, UserProfile, Workout } from '../types';
import { startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, subWeeks } from 'date-fns';

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