
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PaymentCollectionChartProps {
  region?: string;
}

const PaymentCollectionChart: React.FC<PaymentCollectionChartProps> = ({ region }) => {
  // Mock data for payment collection
  const paymentData = [
    { name: 'On Time', value: 82, color: '#10B981' },
    { name: '1-30 Days Late', value: 12, color: '#F59E0B' },
    { name: '31-90 Days Late', value: 5, color: '#EF4444' },
    { name: '90+ Days Late', value: 1, color: '#7F1D1D' },
  ];

  return (
    <div>
      <h4 className="text-sm font-semibold mb-4 text-center">Payment Collection</h4>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={paymentData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {paymentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentCollectionChart;
