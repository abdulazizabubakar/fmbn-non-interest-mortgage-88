
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AnalyticsChart: React.FC = () => {
  const chartData = [
    { month: 'Jan', applications: 400, approvals: 240, disbursements: 200 },
    { month: 'Feb', applications: 300, approvals: 180, disbursements: 150 },
    { month: 'Mar', applications: 500, approvals: 350, disbursements: 280 },
    { month: 'Apr', applications: 450, approvals: 320, disbursements: 250 },
    { month: 'May', applications: 600, approvals: 420, disbursements: 350 },
    { month: 'Jun', applications: 550, approvals: 380, disbursements: 320 }
  ];

  const portfolioData = [
    { month: 'Jan', value: 42000000000 },
    { month: 'Feb', value: 42800000000 },
    { month: 'Mar', value: 43500000000 },
    { month: 'Apr', value: 44200000000 },
    { month: 'May', value: 45000000000 },
    { month: 'Jun', value: 45800000000 }
  ];

  return (
    <div className="space-y-6">
      {/* Applications Flow Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Applications Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="applications" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                name="Applications"
              />
              <Line 
                type="monotone" 
                dataKey="approvals" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Approvals"
              />
              <Line 
                type="monotone" 
                dataKey="disbursements" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                name="Disbursements"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Portfolio Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Portfolio Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => `₦${(value / 1000000000).toFixed(0)}B`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value: number) => [
                  new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                    maximumFractionDigits: 0,
                    notation: 'compact',
                    compactDisplay: 'short'
                  }).format(value),
                  'Portfolio Value'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                fill="url(#portfolioGradient)" 
                strokeWidth={3}
              />
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export { AnalyticsChart };
