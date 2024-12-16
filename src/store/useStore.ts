import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, Workout, Activity } from '../types';

interface AppState {
  profile: UserProfile | null;
  workouts: Workout[];
  activities: Activity[];
  setProfile: (profile: UserProfile) => void;
  addWorkout: (workout: Workout) => void;
  addActivity: (activity: Activity) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      profile: null,
      workouts: [],
      activities: [],
      setProfile: (profile) => set({ profile }),
      addWorkout: (workout) =>
        set((state) => ({ workouts: [...state.workouts, workout] })),
      addActivity: (activity) =>
        set((state) => ({ activities: [...state.activities, activity] })),
    }),
    {
      name: 'fitness-store',
    }
  )
);