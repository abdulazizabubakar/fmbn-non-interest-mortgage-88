
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface PropertyStatusChartProps {
  region?: string;
}

const PropertyStatusChart: React.FC<PropertyStatusChartProps> = ({ region }) => {
  // Mock data for property status
  const propertyData = [
    { name: 'Available', value: 35, color: '#10B981' },
    { name: 'Reserved', value: 45, color: '#3B82F6' },
    { name: 'Occupied', value: 120, color: '#6366F1' },
    { name: 'Under Construction', value: 25, color: '#F59E0B' },
  ];

  return (
    <div>
      <h4 className="text-sm font-semibold mb-4 text-center">Property Status</h4>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={propertyData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {propertyData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PropertyStatusChart;
