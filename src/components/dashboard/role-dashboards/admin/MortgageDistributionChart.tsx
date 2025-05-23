
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface MortgageDistributionChartProps {
  region: string;
}

// Mock data for mortgage distribution by type
const mortgageData = [
  { name: 'Ijarah', value: 445, color: '#3b82f6' },   // Blue
  { name: 'Murabaha', value: 320, color: '#22c55e' }, // Green
  { name: 'Musharakah', value: 210, color: '#f59e0b' }, // Yellow
  { name: 'Istisna', value: 125, color: '#8b5cf6' },  // Purple
  { name: 'Other', value: 50, color: '#ec4899' },     // Pink
];

const MortgageDistributionChart: React.FC<MortgageDistributionChartProps> = ({ region }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Mortgage Distribution</CardTitle>
        <CardDescription>Distribution by non-interest financing type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mortgageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {mortgageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MortgageDistributionChart;
