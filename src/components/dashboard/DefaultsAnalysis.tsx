
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DefaultsAnalysis: React.FC = () => {
  // Mock data for defaults
  const defaultsByAgeingBucket = [
    { name: '30-60 days', value: 42, amount: 42000000, color: '#FCD34D' },
    { name: '61-90 days', value: 28, amount: 35000000, color: '#F59E0B' },
    { name: '91-120 days', value: 16, amount: 24000000, color: '#EF4444' },
    { name: '120+ days', value: 8, amount: 18500000, color: '#991B1B' },
  ];

  const defaultsByReason = [
    { name: 'Income Issues', value: 45, color: '#3B82F6' },
    { name: 'Health Problems', value: 25, color: '#10B981' },
    { name: 'Relocation', value: 15, color: '#6366F1' },
    { name: 'Economic Factors', value: 10, color: '#F59E0B' },
    { name: 'Others', value: 5, color: '#9CA3AF' },
  ];

  const topDefaulters = [
    { 
      id: 'ACCT-1242', 
      customer: 'Ibrahim Ahmed', 
      overdueDays: 95, 
      overdueAmount: 1250000,
      status: 'legal_referral' 
    },
    { 
      id: 'ACCT-0986', 
      customer: 'Mary Okonkwo', 
      overdueDays: 82, 
      overdueAmount: 975000,
      status: 'in_progress' 
    },
    { 
      id: 'ACCT-1108', 
      customer: 'Mohammed Sani', 
      overdueDays: 75, 
      overdueAmount: 880000,
      status: 'in_progress' 
    },
    { 
      id: 'ACCT-1315', 
      customer: 'Grace Adebayo', 
      overdueDays: 68, 
      overdueAmount: 750000,
      status: 'new' 
    },
    { 
      id: 'ACCT-0872', 
      customer: 'John Eze', 
      overdueDays: 63, 
      overdueAmount: 685000,
      status: 'in_progress' 
    },
  ];

  const defaultTrend = [
    { month: 'Jan', value: 32, percentage: 3.2 },
    { month: 'Feb', value: 28, percentage: 2.8 },
    { month: 'Mar', value: 35, percentage: 3.5 },
    { month: 'Apr', value: 40, percentage: 4.0 },
    { month: 'May', value: 38, percentage: 3.8 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'legal_referral':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Default Analysis</CardTitle>
            <CardDescription>Analysis of mortgage accounts in default</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ageing">
              <TabsList className="mb-4">
                <TabsTrigger value="ageing">Ageing Analysis</TabsTrigger>
                <TabsTrigger value="reasons">Default Reasons</TabsTrigger>
                <TabsTrigger value="trend">Default Trend</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ageing" className="space-y-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={defaultsByAgeingBucket}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" unit="M" />
                      <Tooltip 
                        formatter={(value, name, props) => {
                          const original = props.payload;
                          return name === "value" 
                            ? [`${value} accounts`, 'Count']
                            : [formatCurrency(original.amount), 'Amount'];
                        }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="value" name="Accounts" barSize={60}>
                        {defaultsByAgeingBucket.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-muted-foreground text-center">
                  Total accounts in default: 94 | Total default amount: {formatCurrency(119500000)}
                </div>
              </TabsContent>
              
              <TabsContent value="reasons" className="space-y-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={defaultsByReason}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {defaultsByReason.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Legend layout="vertical" align="right" verticalAlign="middle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="trend" className="space-y-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={defaultTrend}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" unit="%" />
                      <Tooltip 
                        formatter={(value, name, props) => {
                          return name === "value" 
                            ? [`${value} accounts`, 'Default Count']
                            : [`${value}%`, 'Default Rate'];
                        }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="value" name="Default Count" fill="#F59E0B" barSize={40} />
                      <Bar yAxisId="right" dataKey="percentage" name="Default Rate (%)" fill="#EF4444" barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Defaulters</CardTitle>
            <CardDescription>Accounts with highest overdue amounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Overdue</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topDefaulters.map((defaulter) => (
                    <TableRow key={defaulter.id}>
                      <TableCell className="font-medium">
                        <div>{defaulter.id}</div>
                        <div className="text-xs text-muted-foreground">{defaulter.customer}</div>
                      </TableCell>
                      <TableCell>
                        <div>{formatCurrency(defaulter.overdueAmount)}</div>
                        <div className="text-xs text-muted-foreground">{defaulter.overdueDays} days</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(defaulter.status)}>
                          {defaulter.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DefaultsAnalysis;
