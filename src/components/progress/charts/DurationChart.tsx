import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface DataPoint {
  date: Date;
  duration: number;
}

interface DurationChartProps {
  data: DataPoint[];
}

export const DurationChart = ({ data }: DurationChartProps) => {
  const formattedData = data.map(point => ({
    ...point,
    formattedDate: format(new Date(point.date), 'MMM d'),
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34D399" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
          <XAxis
            dataKey="formattedDate"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            className="text-gray-600"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            className="text-gray-600"
            unit=" min"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            labelStyle={{ color: '#4B5563' }}
          />
          <Area
            type="monotone"
            dataKey="duration"
            stroke="#34D399"
            fillOpacity={1}
            fill="url(#colorDuration)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};