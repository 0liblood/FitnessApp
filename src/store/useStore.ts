import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, Workout, Activity } from '../types';

interface AppState {
  profile: UserProfile | null;
  workouts: Workout[];
  activities: Activity[];
  setProfile: (profile: UserProfile) => void;
  deleteProfile: () => void;
  addWorkout: (workout: Workout) => void;
  deleteWorkout: (workoutId: string) => void;
  setWorkouts: (workouts: Workout[]) => void;
  addActivity: (activity: Activity) => void;
  deleteActivity: (activityId: string) => void;
  setActivities: (activities: Activity[]) => void; 
}

/**
 * Zustand store for managing the app's state.
 * - Includes state for profile, workouts, and activities.
 * - Supports persistence using `zustand/middleware`.
 */
export const useStore = create<AppState>()(
  persist(
    (set) => ({
      profile: null,
      workouts: [],
      activities: [],
      /**
       * Sets the user profile in the store.
       * @param profile - The profile to be set.
       */
      setProfile: (profile) => set({ profile }),

      /**
       * Deletes the user profile and clears workouts and activities.
       */
      deleteProfile: () =>
        set({ profile: null, workouts: [], activities: [] }),

      /**
       * Adds a new workout to the store.
       * @param workout - The workout to be added.
       */
      addWorkout: (workout) =>
        set((state) => ({ workouts: [...state.workouts, workout] })),

      /**
       * Deletes a workout from the store by ID.
       * @param workoutId - The ID of the workout to be deleted.
       */
      deleteWorkout: (workoutId) =>
        set((state) => ({
          workouts: state.workouts.filter((workout) => workout.id !== workoutId),
        })),

      /**
       * Replaces the entire list of workouts in the store.
       * @param workouts - The new list of workouts.
       */
      setWorkouts: (workouts) => set({ workouts }),

      /**
       * Adds a new activity to the store.
       * @param activity - The activity to be added.
       */
      addActivity: (activity) =>
        set((state) => ({ activities: [...state.activities, activity] })),

      /**
       * Deletes an activity from the store by ID.
       * @param activityId - The ID of the activity to be deleted.
       */
      deleteActivity: (activityId) =>
        set((state) => ({
          activities: state.activities.filter(
            (activity) => activity.id !== activityId
          ),
        })),

      /**
       * Replaces the entire list of activities in the store.
       * @param activities - The new list of activities.
       */
      setActivities: (activities) => set({ activities }),
    }),
    {
      name: 'fitness-store', // Key for local storage
    }
  )
);
