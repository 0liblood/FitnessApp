import { Exercise } from '../types';

export const exerciseTemplates: Record<string, Exercise[]> = {
  cardio: [
    { id: 'running', name: 'Running', sets: 1, reps: 1 },
    { id: 'cycling', name: 'Cycling', sets: 1, reps: 1 },
    { id: 'swimming', name: 'Swimming', sets: 1, reps: 1 },
    { id: 'jumping-rope', name: 'Jumping Rope', sets: 3, reps: 50 },
  ],
  strength: [
    { id: 'pushups', name: 'Push-ups', sets: 3, reps: 12 },
    { id: 'squats', name: 'Squats', sets: 3, reps: 15 },
    { id: 'deadlifts', name: 'Deadlifts', sets: 3, reps: 10, weight: 0 },
    { id: 'bench-press', name: 'Bench Press', sets: 3, reps: 10, weight: 0 },
  ],
  mobility: [
    { id: 'yoga-flow', name: 'Yoga Flow', sets: 1, reps: 1 },
    { id: 'stretching', name: 'Dynamic Stretching', sets: 1, reps: 1 },
    { id: 'foam-rolling', name: 'Foam Rolling', sets: 1, reps: 1 },
  ],
};