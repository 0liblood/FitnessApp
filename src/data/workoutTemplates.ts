import { Exercise } from '../types';

/**
 * Predefined templates for exercises grouped by workout types.
 * Each template includes exercise details such as name, sets, reps, and optional weight.
 */
export const exerciseTemplates: Record<string, Exercise[]> = {
  cardio: [
    { id: 'running', name: 'Running', sets: 1, reps: 1 },
    { id: 'cycling', name: 'Cycling', sets: 1, reps: 1 },
    { id: 'swimming', name: 'Swimming', sets: 1, reps: 1 },
    { id: 'jumping-rope', name: 'Jumping Rope', sets: 3, reps: 50 },
    { id: 'treadmill', name: 'Treadmill', sets: 1, reps: 1 },
    { id: 'elliptical', name: 'Elliptical Machine', sets: 1, reps: 1 },
    { id: 'rower', name: 'Rowing Machine', sets: 1, reps: 1 },
  ],
  strength: [
    { id: 'pushups', name: 'Push-ups', sets: 3, reps: 12 },
    { id: 'squats', name: 'Squats', sets: 3, reps: 15 },
    { id: 'deadlifts', name: 'Deadlifts', sets: 3, reps: 10, weight: 0 },
    { id: 'bench-press', name: 'Bench Press', sets: 3, reps: 10, weight: 0 },
    { id: 'pullups', name: 'Pull-ups', sets: 3, reps: 8 },
    { id: 'dumbbell-rows', name: 'Dumbbell Rows', sets: 3, reps: 10, weight: 0 },
    { id: 'overhead-press', name: 'Overhead Press', sets: 3, reps: 8, weight: 0 },
    { id: 'bicep-curls', name: 'Bicep Curls', sets: 3, reps: 12, weight: 0 },
    { id: 'tricep-dips', name: 'Tricep Dips', sets: 3, reps: 12 },
  ],
  mobility: [
    { id: 'yoga-flow', name: 'Yoga Flow', sets: 1, reps: 1 },
    { id: 'stretching', name: 'Dynamic Stretching', sets: 1, reps: 1 },
    { id: 'foam-rolling', name: 'Foam Rolling', sets: 1, reps: 1 },
    { id: 'cat-cow', name: 'Cat-Cow Stretch', sets: 2, reps: 10 },
    { id: 'childs-pose', name: 'Child’s Pose', sets: 1, reps: 1 },
    { id: 'pigeon-pose', name: 'Pigeon Pose', sets: 1, reps: 1 },
    { id: 'hamstring-stretch', name: 'Hamstring Stretch', sets: 1, reps: 1 },
    { id: 'hip-flexor-stretch', name: 'Hip Flexor Stretch', sets: 1, reps: 1 },
  ],
};
