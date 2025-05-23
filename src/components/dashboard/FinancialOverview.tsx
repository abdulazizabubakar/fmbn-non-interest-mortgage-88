
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

interface FinancialOverviewProps {
  userRole: string;
  region?: string;
}

const FinancialOverview: React.FC<FinancialOverviewProps> = ({ userRole, region = 'Global' }) => {
  // Mock data for collections
  const collectionsData = [
    { name: 'Jan', amount: 42500000 },
    { name: 'Feb', amount: 38900000 },
    { name: 'Mar', amount: 45300000 },
    { name: 'Apr', amount: 47800000 },
    { name: 'May', amount: 52100000 },
    { name: 'Jun', amount: 49600000 },
  ];

  // Mock data for disbursements
  const disbursementsData = [
    { name: 'Jan', amount: 38200000 },
    { name: 'Feb', amount: 34500000 },
    { name: 'Mar', amount: 42100000 },
    { name: 'Apr', amount: 44300000 },
    { name: 'May', amount: 48900000 },
    { name: 'Jun', amount: 46200000 },
  ];

  // Mock data for projections
  const projectionsData = [
    { name: 'Jul', projected: 51000000, worstCase: 48000000, bestCase: 54000000 },
    { name: 'Aug', projected: 52500000, worstCase: 49000000, bestCase: 56000000 },
    { name: 'Sep', projected: 54000000, worstCase: 50000000, bestCase: 58000000 },
    { name: 'Oct', projected: 55500000, worstCase: 51000000, bestCase: 60000000 },
    { name: 'Nov', projected: 57000000, worstCase: 52000000, bestCase: 62000000 },
    { name: 'Dec', projected: 59000000, worstCase: 54000000, bestCase: 65000000 },
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
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="collections">
          <TabsList>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="disbursements">Disbursements</TabsTrigger>
            <TabsTrigger value="projections">Projections</TabsTrigger>
          </TabsList>
          <TabsContent value="collections" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={collectionsData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCollections" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={(value) => `₦${(value / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), "Amount"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorCollections)"
                    name="Collections"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="disbursements" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={disbursementsData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={(value) => `₦${(value / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), "Amount"]}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="#10B981" 
                    name="Disbursements" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="projections" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={projectionsData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={(value) => `₦${(value / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), "Amount"]}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="bestCase"
                    stroke="#10B981"
                    strokeDasharray="3 3"
                    fill="none"
                    name="Best Case"
                  />
                  <Area
                    type="monotone"
                    dataKey="projected"
                    stroke="#8B5CF6"
                    fillOpacity={1}
                    fill="url(#colorProjected)"
                    name="Projected"
                  />
                  <Area
                    type="monotone"
                    dataKey="worstCase"
                    stroke="#F43F5E"
                    strokeDasharray="3 3"
                    fill="none"
                    name="Worst Case"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FinancialOverview;
