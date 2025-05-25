
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart as RechartsPieChart, Cell } from 'recharts';

interface ChartRendererProps {
  metric: {
    chartType: string;
    color: string;
    value: string;
  };
  animationKey: number;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ metric, animationKey }) => {
  // Mock data that updates with animations
  const mockTrendData = [
    { name: 'Jan', value: 400 + Math.random() * 100 },
    { name: 'Feb', value: 300 + Math.random() * 100 },
    { name: 'Mar', value: 500 + Math.random() * 100 },
    { name: 'Apr', value: 600 + Math.random() * 100 },
    { name: 'May', value: 700 + Math.random() * 100 },
    { name: 'Jun', value: 800 + Math.random() * 100 },
  ];

  const pieData = [
    { name: 'Active', value: 65, color: '#10b981' },
    { name: 'Pending', value: 20, color: '#f59e0b' },
    { name: 'Completed', value: 15, color: '#3b82f6' },
  ];

  switch (metric.chartType) {
    case 'line':
      return (
        <ResponsiveContainer width="100%" height={40}>
          <LineChart data={mockTrendData} key={animationKey}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={`var(--${metric.color}-500)`}
              strokeWidth={2}
              dot={false}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    case 'area':
      return (
        <ResponsiveContainer width="100%" height={40}>
          <AreaChart data={mockTrendData} key={animationKey}>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={`var(--${metric.color}-500)`}
              fill={`var(--${metric.color}-200)`}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    case 'progress':
      return (
        <Progress 
          value={parseFloat(metric.value)} 
          className="h-2 mt-2"
          key={animationKey}
        />
      );
    case 'pie':
      return (
        <ResponsiveContainer width="100%" height={40}>
          <RechartsPieChart key={animationKey}>
            <RechartsPieChart data={pieData}>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </RechartsPieChart>
          </RechartsPieChart>
        </ResponsiveContainer>
      );
    default:
      return null;
  }
};

export default ChartRenderer;
