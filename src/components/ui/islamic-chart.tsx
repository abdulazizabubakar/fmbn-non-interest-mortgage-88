
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line } from 'recharts';
import { IslamicCard, IslamicCardHeader, IslamicCardContent } from './islamic-card';
import { cn } from '@/lib/utils';

interface IslamicChartProps {
  title: string;
  description?: string;
  data: any[];
  type: 'area' | 'bar' | 'line' | 'pie';
  height?: number;
  className?: string;
  dataKey?: string;
  xAxisKey?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  colors?: string[];
}

const IslamicChart: React.FC<IslamicChartProps> = ({
  title,
  description,
  data,
  type,
  height = 300,
  className,
  dataKey = 'value',
  xAxisKey = 'name',
  showGrid = true,
  showLegend = true,
  colors = ['#00685e', '#0079a1', '#f4a100', '#1a3a32', '#f2f7f5']
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-fmbn-primary/20 rounded-xl shadow-lg">
          <p className="font-semibold text-fmbn-primary">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' 
                ? entry.value.toLocaleString() 
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (type) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#00685e20" />}
            <XAxis 
              dataKey={xAxisKey} 
              stroke="#00685e" 
              fontSize={12}
              tick={{ fill: '#00685e' }}
            />
            <YAxis 
              stroke="#00685e" 
              fontSize={12}
              tick={{ fill: '#00685e' }}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={colors[0]}
              fill={`url(#islamicGradient)`}
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="islamicGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#00685e20" />}
            <XAxis 
              dataKey={xAxisKey} 
              stroke="#00685e" 
              fontSize={12}
              tick={{ fill: '#00685e' }}
            />
            <YAxis 
              stroke="#00685e" 
              fontSize={12}
              tick={{ fill: '#00685e' }}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Bar 
              dataKey={dataKey} 
              fill={colors[0]} 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );

      case 'line':
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#00685e20" />}
            <XAxis 
              dataKey={xAxisKey} 
              stroke="#00685e" 
              fontSize={12}
              tick={{ fill: '#00685e' }}
            />
            <YAxis 
              stroke="#00685e" 
              fontSize={12}
              tick={{ fill: '#00685e' }}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={colors[0]}
              strokeWidth={3}
              dot={{ fill: colors[0], strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: colors[1], strokeWidth: 2 }}
            />
          </LineChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey={dataKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <IslamicCard variant="default" elevation="medium" className={className}>
      <IslamicCardHeader title={title} description={description} />
      <IslamicCardContent>
        <div className="w-full" style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </IslamicCardContent>
    </IslamicCard>
  );
};

export { IslamicChart };
