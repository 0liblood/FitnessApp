import React from 'react';
import { format } from 'date-fns';
import './ProgressChart.less';

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
  // Determine the maximum value for scaling the chart bars.
  const maxValue = Math.max(...data.map((d) => (type === 'calories' ? d.calories : d.duration)));

  return (
    <div className="progress-chart">
      {data.map((point, index) => {
        // Get the value to display based on the selected type (calories or duration).
        const value = type === 'calories' ? point.calories : point.duration;

        // Calculate the height of the bar as a percentage of the maximum value.
        const height = maxValue > 0 ? (value / maxValue) * 100 : 0;

        return (
          <div
            key={index}
            className="chart-bar"
            title={`${format(point.date, 'MMM d')}: ${value} ${
              type === 'calories' ? 'calories' : 'minutes'
            }`}
          >
            {/* Bar representing the data point */}
            <div className="bar" style={{ height: `${height}%` }} />
            {/* Label for the bar showing the date */}
            <span className="bar-label">{format(point.date, 'M/d')}</span>
          </div>
        );
      })}
    </div>
  );
};
