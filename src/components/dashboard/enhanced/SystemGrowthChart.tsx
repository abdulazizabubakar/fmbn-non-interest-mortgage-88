
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SystemGrowthChartProps {
  userRole: string;
}

const SystemGrowthChart: React.FC<SystemGrowthChartProps> = ({ userRole }) => {
  // Mock data for system growth
  const systemGrowthData = [
    { month: 'Jan', users: 1250, applications: 340, properties: 120, revenue: 42500000 },
    { month: 'Feb', users: 1380, applications: 390, properties: 145, revenue: 48200000 },
    { month: 'Mar', users: 1520, applications: 425, properties: 168, revenue: 52800000 },
    { month: 'Apr', users: 1680, applications: 480, properties: 192, revenue: 58400000 },
    { month: 'May', users: 1840, applications: 520, properties: 215, revenue: 64100000 },
    { month: 'Jun', users: 2020, applications: 565, properties: 238, revenue: 69800000 },
  ];

  const formatCurrency = (value: number) => {
    return `₦${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Growth Overview</CardTitle>
        <CardDescription>Key growth metrics across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={systemGrowthData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorProperties" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === 'Revenue') {
                    return [formatCurrency(value), name];
                  }
                  return [value.toLocaleString(), name];
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="users"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorUsers)"
                name="Active Users"
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="applications"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorApplications)"
                name="Applications"
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="properties"
                stroke="#8B5CF6"
                fillOpacity={1}
                fill="url(#colorProperties)"
                name="Properties"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemGrowthChart;
