import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { ProfileForm } from './components/profile/ProfileForm';
import { WorkoutDashboard } from './components/workouts/WorkoutDashboard';
import { ActivityDashboard } from './components/activities/ActivityDashboard';
import { StatisticsDashboard } from './components/statistics/StatisticsDashboard';
import { ProgressDashboard } from './components/progress/ProgressDashboard';
import { useStore } from './store/useStore';

function App() {
  const profile = useStore((state) => state.profile);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {profile ? (
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<StatisticsDashboard />} />
                <Route path="/progress" element={<ProgressDashboard />} />
                <Route path="/workouts" element={<WorkoutDashboard />} />
                <Route path="/activities" element={<ActivityDashboard />} />
                <Route path="/profile" element={<ProfileForm />} />
              </Routes>
            ) : (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome to FitTrack!</h2>
                <p className="text-gray-600 mb-8">
                  Let's start by setting up your profile to personalize your fitness journey.
                </p>
                <ProfileForm />
              </div>
            )}
          </div>
        </main>
        {profile && <MobileNav />}
      </div>
    </Router>
  );
}

export default App;
