import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface RestTimerProps {
  duration: number;
  onComplete: () => void;
}

export const RestTimer = ({ duration, onComplete }: RestTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  return (
    <div className="bg-indigo-50 rounded-lg p-4 flex items-center justify-center space-x-3">
      <Timer className="w-5 h-5 text-indigo-600" />
      <span className="text-lg font-semibold text-indigo-600">
        Rest: {timeLeft}s
      </span>
    </div>
  );
};