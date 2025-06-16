
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell, Tooltip } from 'recharts';

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
  const mockTrendData = React.useMemo(() => [
    { name: 'Jan', value: 400 + Math.random() * 100 },
    { name: 'Feb', value: 300 + Math.random() * 100 },
    { name: 'Mar', value: 500 + Math.random() * 100 },
    { name: 'Apr', value: 600 + Math.random() * 100 },
    { name: 'May', value: 700 + Math.random() * 100 },
    { name: 'Jun', value: 800 + Math.random() * 100 },
  ], [animationKey]);

  const pieData = [
    { name: 'Active', value: 65, color: '#10b981' },
    { name: 'Pending', value: 20, color: '#f59e0b' },
    { name: 'Completed', value: 15, color: '#3b82f6' },
  ];

  const chartColors: {[key: string]: any} = {
    blue: { stroke: '#3b82f6', fill: 'rgba(59, 130, 246, 0.2)' },
    green: { stroke: '#10b981', fill: 'rgba(16, 185, 129, 0.2)' },
    purple: { stroke: '#8b5cf6', fill: 'rgba(139, 92, 246, 0.2)' },
    indigo: { stroke: '#6366f1', fill: 'rgba(99, 102, 241, 0.2)' },
    emerald: { stroke: '#059669', fill: 'rgba(5, 150, 105, 0.2)' },
    red: { stroke: '#ef4444', fill: 'rgba(239, 68, 68, 0.2)' },
  };
  
  const colors = chartColors[metric.color] || chartColors.blue;

  switch (metric.chartType) {
    case 'line':
      return (
        <ResponsiveContainer width="100%" height={40}>
          <LineChart data={mockTrendData} key={animationKey}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={colors.stroke}
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
             <defs>
              <linearGradient id={`gradient-${metric.color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.stroke} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={colors.stroke} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={colors.stroke}
              strokeWidth={2}
              fill={`url(#gradient-${metric.color})`}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    case 'progress':
      return (
        <Progress 
          value={parseFloat(metric.value)} 
          className="h-2 mt-2 bg-white/30"
          indicatorClassName={`bg-${metric.color}-400`}
          key={animationKey}
        />
      );
    case 'pie':
      return (
        <ResponsiveContainer width="100%" height={50}>
          <RechartsPieChart key={animationKey}>
            <Tooltip
              contentStyle={{
                fontSize: '12px',
                padding: '4px 8px',
                background: 'rgba(0, 0, 0, 0.7)',
                border: 'none',
                borderRadius: '4px',
                color: 'white'
              }}
              cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
            />
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={12} outerRadius={22} paddingAngle={3}>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} className="focus:outline-none" />
              ))}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>
      );
    default:
      return null;
  }
};

export default ChartRenderer;
