export interface UserProfile {
  id: string;
  name: string;
  height: number; 
  weight: number; 
  age?: number; 
  gender?: 'male' | 'female' | 'other'; 
  goals: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Workout {
  id: string;
  name: string;
  type: 'cardio' | 'strength' | 'mobility' | 'stretching';
  duration: number; 
  caloriesBurned: number;
  exercises: Exercise[];
  date: Date;
  notes?: string; 
  intensity?: 'low' | 'medium' | 'high'; 
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number; 
  duration?: number; 
}

export interface Activity {
  id: string;
  type: string; 
  duration: number; 
  caloriesBurned: number;
  date: Date;
  notes?: string; 
  location?: string;
}
