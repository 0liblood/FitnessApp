import React from 'react';
import { format } from 'date-fns';

interface DataPoint {
  date: Date;
  calories: number;
  duration: number;
}

interface ProgressChartProps {
  data: DataPoint[];
  type: 'calories' | 'duration';
}

export const ProgressChart = ({ data, type }: ProgressChartProps) => {
  const maxValue = Math.max(...data.map(d => type === 'calories' ? d.calories : d.duration));
  
  return (
    <div className="h-48 flex items-end space-x-2">
      {data.map((point, index) => {
        const value = type === 'calories' ? point.calories : point.duration;
        const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
        
        return (
          <div
            key={index}
            className="flex-1 flex flex-col items-center"
            title={`${format(point.date, 'MMM d')}: ${value} ${type === 'calories' ? 'calories' : 'minutes'}`}
          >
            <div
              className="w-full bg-indigo-200 hover:bg-indigo-300 transition-colors rounded-t"
              style={{ height: `${height}%` }}
            />
            <span className="text-xs text-gray-500 mt-1 rotate-45 origin-left">
              {format(point.date, 'M/d')}
            </span>
          </div>
        );
      })}
    </div>
  );
};