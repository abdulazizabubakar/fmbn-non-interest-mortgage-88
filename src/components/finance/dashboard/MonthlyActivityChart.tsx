
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MonthlyActivityChartProps {
  data: Array<{
    name: string;
    disbursements: number;
    repayments: number;
  }>;
  formatCurrency: (amount: number) => string;
}

const MonthlyActivityChart: React.FC<MonthlyActivityChartProps> = ({ data, formatCurrency }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Activity</CardTitle>
        <CardDescription>Disbursements and repayments over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value) => formatCurrency(value as number)}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Bar dataKey="disbursements" name="Disbursements" fill="#8b5cf6" />
            <Bar dataKey="repayments" name="Repayments" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyActivityChart;
