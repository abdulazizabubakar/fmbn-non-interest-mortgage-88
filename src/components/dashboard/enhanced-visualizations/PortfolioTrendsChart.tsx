
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', portfolio: 42.5, disbursed: 8.2, collected: 12.1 },
  { month: 'Feb', portfolio: 43.1, disbursed: 9.8, collected: 11.8 },
  { month: 'Mar', portfolio: 44.2, disbursed: 12.5, collected: 13.2 },
  { month: 'Apr', portfolio: 45.1, disbursed: 11.2, collected: 12.9 },
  { month: 'May', portfolio: 45.8, disbursed: 10.8, collected: 13.5 },
  { month: 'Jun', portfolio: 46.3, disbursed: 13.1, collected: 14.2 }
];

const PortfolioTrendsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Performance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₦${value}B`} />
              <Legend />
              <Line type="monotone" dataKey="portfolio" stroke="#3b82f6" strokeWidth={2} name="Total Portfolio" />
              <Line type="monotone" dataKey="disbursed" stroke="#22c55e" strokeWidth={2} name="Disbursed" />
              <Line type="monotone" dataKey="collected" stroke="#f59e0b" strokeWidth={2} name="Collected" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioTrendsChart;
