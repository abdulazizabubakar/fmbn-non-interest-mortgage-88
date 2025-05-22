
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const FinanceDashboard: React.FC = () => {
  // Mock data for finance dashboard
  const revenueData = [
    { month: 'Jan', actual: 320, projected: 300 },
    { month: 'Feb', actual: 350, projected: 320 },
    { month: 'Mar', actual: 370, projected: 340 },
    { month: 'Apr', actual: 390, projected: 360 },
    { month: 'May', actual: 420, projected: 380 },
    { month: 'Jun', actual: 400, projected: 400 },
    { month: 'Jul', projected: 420 },
    { month: 'Aug', projected: 440 },
    { month: 'Sep', projected: 460 },
    { month: 'Oct', projected: 480 },
    { month: 'Nov', projected: 500 },
    { month: 'Dec', projected: 520 },
  ];

  const cashflowData = [
    { month: 'Jan', inflow: 520, outflow: 470 },
    { month: 'Feb', inflow: 540, outflow: 490 },
    { month: 'Mar', inflow: 570, outflow: 510 },
    { month: 'Apr', inflow: 590, outflow: 520 },
    { month: 'May', inflow: 620, outflow: 550 },
  ];

  const debtRecoveryData = [
    { status: 'Recovered', value: 65, color: '#10B981' },
    { status: 'In Progress', value: 25, color: '#F59E0B' },
    { status: 'Defaulted', value: 10, color: '#EF4444' },
  ];

  const regionPerformance = [
    { region: 'North Central', actual: 92, target: 95 },
    { region: 'North East', actual: 78, target: 90 },
    { region: 'North West', actual: 88, target: 93 },
    { region: 'South East', actual: 84, target: 92 },
    { region: 'South South', actual: 91, target: 95 },
    { region: 'South West', actual: 96, target: 97 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value * 1000000); // Scaling for millions
  };

  // Custom tooltip components
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="text-sm font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for pie chart
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Revenue Projections */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Projections vs Actual</CardTitle>
          <CardDescription>Financial year performance tracking (values in millions ₦)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                actual: { label: "Actual Revenue", color: "#10B981" },
                projected: { label: "Projected Revenue", color: "#6B7280" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#10B981" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="projected" 
                    stroke="#6B7280" 
                    strokeDasharray="5 5" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Analysis & Debt Recovery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash Flow Analysis */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Cash Flow Analysis</CardTitle>
            <CardDescription>Monthly cash inflow vs outflow (values in millions ₦)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  inflow: { label: "Cash Inflow", color: "#3B82F6" },
                  outflow: { label: "Cash Outflow", color: "#F59E0B" },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cashflowData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="inflow" name="Cash Inflow" fill="#3B82F6" />
                    <Bar dataKey="outflow" name="Cash Outflow" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground text-center">
              Net cash flow (May): {formatCurrency(70)} | YTD: {formatCurrency(330)}
            </div>
          </CardContent>
        </Card>
        
        {/* Debt Recovery Status */}
        <Card>
          <CardHeader>
            <CardTitle>Debt Recovery</CardTitle>
            <CardDescription>Status of debt recovery efforts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={debtRecoveryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {debtRecoveryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <div className="text-sm text-center">
                Total outstanding debt: {formatCurrency(245)}
              </div>
              <div className="text-xs text-center text-muted-foreground mt-1">
                Accounts in legal proceedings: 12
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Regional Collection Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Collection Performance</CardTitle>
          <CardDescription>Payment collection efficiency by region</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead>Actual %</TableHead>
                <TableHead>Target %</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regionPerformance.map((region) => {
                const performance = (region.actual / region.target) * 100;
                const status = performance >= 98 ? 'Excellent' :
                               performance >= 90 ? 'Good' :
                               performance >= 80 ? 'Average' : 'Below Target';
                const statusColor = performance >= 98 ? 'bg-green-100 text-green-800' :
                                   performance >= 90 ? 'bg-blue-100 text-blue-800' :
                                   performance >= 80 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800';
                const progressColor = performance >= 98 ? 'bg-green-600' :
                                     performance >= 90 ? 'bg-blue-600' :
                                     performance >= 80 ? 'bg-amber-600' : 'bg-red-600';
                
                return (
                  <TableRow key={region.region}>
                    <TableCell className="font-medium">{region.region}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{region.actual}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{region.target}%</TableCell>
                    <TableCell className="text-right">
                      <Badge className={statusColor}>{status}</Badge>
                      <div className="mt-1">
                        <Progress
                          value={performance}
                          className="h-1.5"
                          style={{
                            ["--progress-background" as any]: progressColor
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceDashboard;
