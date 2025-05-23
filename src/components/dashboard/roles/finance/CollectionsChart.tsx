
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CollectionsChartProps {
  region?: string;
}

const CollectionsChart: React.FC<CollectionsChartProps> = ({ region }) => {
  // Mock data for collections
  const collectionData = [
    { month: 'Jan', collections: 42500000, target: 45000000 },
    { month: 'Feb', collections: 38900000, target: 45000000 },
    { month: 'Mar', collections: 45300000, target: 45000000 },
    { month: 'Apr', collections: 47800000, target: 45000000 },
    { month: 'May', collections: 52100000, target: 45000000 },
    { month: 'Jun', collections: 49600000, target: 45000000 },
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
        <CardTitle>Monthly Collections vs Target</CardTitle>
        <CardDescription>Performance against monthly collection targets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={collectionData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCollections" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `₦${(value / 1000000).toFixed(0)}M`}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), "Amount"]}
              />
              <Area
                type="monotone"
                dataKey="collections"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorCollections)"
                name="Collections"
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="#10B981"
                fill="transparent"
                strokeDasharray="5 5"
                name="Target"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectionsChart;
