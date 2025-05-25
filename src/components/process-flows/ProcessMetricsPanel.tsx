
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface ProcessMetricsPanelProps {
  selectedCategory: string;
}

const ProcessMetricsPanel: React.FC<ProcessMetricsPanelProps> = ({ selectedCategory }) => {
  // Mock analytics data
  const performanceData = [
    { name: 'Mortgage Apps', completed: 85, delayed: 12, pending: 23 },
    { name: 'Finance Ops', completed: 92, delayed: 5, pending: 18 },
    { name: 'Property Mgmt', completed: 78, delayed: 15, pending: 31 },
    { name: 'Document Proc', completed: 95, delayed: 3, pending: 12 },
  ];

  const bottleneckData = [
    { name: 'Document Verification', value: 35, color: '#ef4444' },
    { name: 'Credit Assessment', value: 25, color: '#f59e0b' },
    { name: 'Property Valuation', value: 20, color: '#eab308' },
    { name: 'Approval Decision', value: 15, color: '#22c55e' },
    { name: 'Other', value: 5, color: '#6b7280' },
  ];

  const trendData = [
    { month: 'Jan', efficiency: 82, volume: 156 },
    { month: 'Feb', efficiency: 85, volume: 189 },
    { month: 'Mar', efficiency: 79, volume: 203 },
    { month: 'Apr', efficiency: 87, volume: 178 },
    { month: 'May', efficiency: 91, volume: 245 },
    { month: 'Jun', efficiency: 88, volume: 267 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Process Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Process Performance by Category</CardTitle>
            <CardDescription>Completion status across different process types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                <Bar dataKey="delayed" fill="#ef4444" name="Delayed" />
                <Bar dataKey="pending" fill="#eab308" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bottleneck Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Process Bottlenecks</CardTitle>
            <CardDescription>Most common delay points in workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bottleneckData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {bottleneckData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Efficiency Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Process Efficiency Trends</CardTitle>
          <CardDescription>Monthly efficiency and volume trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="efficiency" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Efficiency (%)"
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="volume" 
                stroke="#22c55e" 
                strokeWidth={3}
                name="Volume"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessMetricsPanel;
