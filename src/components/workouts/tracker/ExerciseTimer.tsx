import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ExerciseTimerProps {
  duration: number;
  onComplete: () => void;
}

export const ExerciseTimer = ({ duration, onComplete }: ExerciseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="text-3xl font-mono font-bold text-gray-900">
        {formatTime(timeLeft)}
      </div>
      <button
        onClick={toggleTimer}
        className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
      >
        {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
      <button
        onClick={resetTimer}
        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
      >
        <RotateCcw className="w-5 h-5" />
      </button>
    </div>
  );
};