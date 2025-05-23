
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, ArrowDownRight, AlertTriangle } from 'lucide-react';

interface FinanceDashboardProps {
  region?: string;
}

const FinanceDashboard: React.FC<FinanceDashboardProps> = ({ region = 'Global' }) => {
  // Mock data for collections
  const collectionData = [
    { month: 'Jan', collections: 42500000, target: 45000000 },
    { month: 'Feb', collections: 38900000, target: 45000000 },
    { month: 'Mar', collections: 45300000, target: 45000000 },
    { month: 'Apr', collections: 47800000, target: 45000000 },
    { month: 'May', collections: 52100000, target: 45000000 },
    { month: 'Jun', collections: 49600000, target: 45000000 },
  ];

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>Collections, disbursements, and financial health metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-blue-50 border-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-muted-foreground">MTD Collections</p>
                  <span className="text-green-600 flex items-center text-xs font-medium">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +15.7%
                  </span>
                </div>
                <p className="text-2xl font-bold mt-1">₦52.1M</p>
                <p className="text-xs text-muted-foreground mt-1">Target: ₦45M</p>
                <Progress value={116} className="h-1 mt-2" />
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-muted-foreground">YTD Revenue</p>
                  <span className="text-green-600 flex items-center text-xs font-medium">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +8.2%
                  </span>
                </div>
                <p className="text-2xl font-bold mt-1">₦276.2M</p>
                <p className="text-xs text-muted-foreground mt-1">Annual Target: ₦540M</p>
                <Progress value={51} className="h-1 mt-2" />
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50 border-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-muted-foreground">Total Arrears</p>
                  <span className="text-red-600 flex items-center text-xs font-medium">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +2.4%
                  </span>
                </div>
                <p className="text-2xl font-bold mt-1">₦68.9M</p>
                <p className="text-xs text-muted-foreground mt-1">Accounts in Arrears: 124</p>
                <Progress value={68} className="h-1 mt-2 bg-amber-100">
                  <div className="bg-amber-500 h-full rounded-full" />
                </Progress>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-muted-foreground">Fund Utilization</p>
                  <span className="text-purple-600 flex items-center text-xs font-medium">
                    Target: 85%
                  </span>
                </div>
                <p className="text-2xl font-bold mt-1">78.3%</p>
                <p className="text-xs text-muted-foreground mt-1">Available: ₦124.5M</p>
                <Progress value={78} className="h-1 mt-2 bg-purple-100">
                  <div className="bg-purple-500 h-full rounded-full" />
                </Progress>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Legend />
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
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>At-Risk Accounts</CardTitle>
            <CardDescription>Accounts with over 60 days in arrears</CardDescription>
          </div>
          <AlertTriangle className="h-5 w-5 text-amber-500 ml-auto" />
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Account</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Balance</th>
                  <th className="px-4 py-2">Days Overdue</th>
                  <th className="px-4 py-2">Amount Due</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="px-4 py-3 font-medium text-gray-900">M-2023-1078</td>
                  <td className="px-4 py-3">Ibrahim Mohammed</td>
                  <td className="px-4 py-3">₦12,450,000</td>
                  <td className="px-4 py-3">96</td>
                  <td className="px-4 py-3">₦840,000</td>
                  <td className="px-4 py-3">
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">Critical</span>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-4 py-3 font-medium text-gray-900">M-2023-0896</td>
                  <td className="px-4 py-3">Fatima Bello</td>
                  <td className="px-4 py-3">₦8,750,000</td>
                  <td className="px-4 py-3">78</td>
                  <td className="px-4 py-3">₦525,000</td>
                  <td className="px-4 py-3">
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded">High Risk</span>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-gray-900">M-2023-1241</td>
                  <td className="px-4 py-3">John Okafor</td>
                  <td className="px-4 py-3">₦15,200,000</td>
                  <td className="px-4 py-3">62</td>
                  <td className="px-4 py-3">₦760,000</td>
                  <td className="px-4 py-3">
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded">High Risk</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceDashboard;
