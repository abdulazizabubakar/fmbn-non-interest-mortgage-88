
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PaymentMetricsProps {
  detailed?: boolean;
}

const PaymentMetrics: React.FC<PaymentMetricsProps> = ({ detailed = false }) => {
  // Mock payment collection data
  const paymentTrend = [
    { month: 'Jan', collections: 120, target: 150 },
    { month: 'Feb', collections: 180, target: 150 },
    { month: 'Mar', collections: 140, target: 150 },
    { month: 'Apr', collections: 190, target: 150 },
    { month: 'May', collections: 210, target: 150 },
  ];

  // Mock payment method distribution
  const paymentMethods = [
    { name: 'Bank Transfer', value: 45, color: '#3B82F6' },
    { name: 'Direct Debit', value: 30, color: '#10B981' },
    { name: 'Online', value: 20, color: '#6366F1' },
    { name: 'Mobile Wallet', value: 5, color: '#F59E0B' },
  ];

  // Mock collection performance by region
  const regionalPerformance = [
    { region: 'North Central', collected: 87, total: 92, amount: 87500000 },
    { region: 'North East', collected: 42, total: 56, amount: 42000000 },
    { region: 'North West', collected: 68, total: 72, amount: 68000000 },
    { region: 'South East', collected: 54, total: 68, amount: 54000000 },
    { region: 'South South', collected: 72, total: 80, amount: 72000000 },
    { region: 'South West', collected: 98, total: 110, amount: 98000000 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className={detailed ? '' : 'col-span-1'}>
      <CardHeader>
        <CardTitle>Payment Metrics</CardTitle>
        <CardDescription>Mortgage payment collections and performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[200px] w-full">
          <ChartContainer
            config={{
              collections: { label: "Collections (₦M)", color: "#3B82F6" },
              target: { label: "Target (₦M)", color: "#D1D5DB" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={paymentTrend}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCollections" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  content={(props) => 
                    <ChartTooltipContent 
                      {...props} 
                      formatter={(value) => [`₦${value}M`, ""]} 
                    />
                  }
                />
                <Area 
                  type="monotone" 
                  dataKey="collections" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorCollections)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#D1D5DB" 
                  strokeDasharray="3 3" 
                  fill="none" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {detailed && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="text-sm font-semibold mb-4">Payment Methods</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethods}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {paymentMethods.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Regional Collection Performance</h4>
              <div className="space-y-4">
                {regionalPerformance.map((region, index) => {
                  const percentage = Math.round((region.collected / region.total) * 100);
                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{region.region}</span>
                        <Badge variant={percentage >= 90 ? "default" : percentage >= 70 ? "outline" : "secondary"}>
                          {percentage}%
                        </Badge>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatCurrency(region.amount)}</span>
                        <span>{region.collected}/{region.total} accounts</span>
                      </div>
                      {index < regionalPerformance.length - 1 && <Separator className="my-2" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMetrics;
