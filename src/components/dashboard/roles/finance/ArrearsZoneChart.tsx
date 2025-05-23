
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ArrearsZoneChartProps {
  region?: string;
}

const ArrearsZoneChart: React.FC<ArrearsZoneChartProps> = ({ region }) => {
  // Mock data for arrears by zone
  const arrearsByZone = [
    { zone: 'North Central', amount: 12500000, percentage: 3.2 },
    { zone: 'North East', amount: 18700000, percentage: 4.8 },
    { zone: 'North West', amount: 9800000, percentage: 2.5 },
    { zone: 'South East', amount: 15200000, percentage: 3.9 },
    { zone: 'South South', amount: 7500000, percentage: 1.9 },
    { zone: 'South West', amount: 5200000, percentage: 1.3 },
  ];

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Arrears by Zone</CardTitle>
        <CardDescription>Regional breakdown of payment arrears</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={arrearsByZone}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis
                type="number"
                tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
              />
              <YAxis
                dataKey="zone"
                type="category"
                width={100}
              />
              <Tooltip
                formatter={(value: number, name: string, props: any) => {
                  return [formatCurrency(value), "Arrears Amount"];
                }}
                labelFormatter={(value) => `Zone: ${value}`}
              />
              <Bar dataKey="amount" name="Arrears Amount">
                {arrearsByZone.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.percentage > 4 ? "#EF4444" : entry.percentage > 3 ? "#F59E0B" : "#3B82F6"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArrearsZoneChart;
