
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDisbursements, mockRepaymentSchedules, mockExceptions } from '@/data/mockFinanceData';
import { Progress } from '@/components/ui/progress';
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ArrowUp, ArrowDown, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const FinanceDashboard = () => {
  // Calculate summary statistics
  const totalDisbursed = mockDisbursements
    .filter(d => d.status === 'completed')
    .reduce((sum, d) => sum + d.amount, 0);
  
  const pendingDisbursements = mockDisbursements
    .filter(d => ['pending', 'in-review', 'approved'].includes(d.status))
    .reduce((sum, d) => sum + d.amount, 0);
  
  const totalRepaymentsDue = mockRepaymentSchedules
    .reduce((sum, r) => sum + r.amount, 0);
  
  const totalRepaymentsPaid = mockRepaymentSchedules
    .filter(r => r.status === 'completed')
    .reduce((sum, r) => sum + r.amount, 0);
  
  const openExceptions = mockExceptions.filter(e => e.status === 'open' || e.status === 'in-progress').length;

  // Prepare chart data
  const disbursementByTypeData = [
    { name: 'Direct to Vendor', value: mockDisbursements.filter(d => d.instrument === 'direct-to-vendor').length },
    { name: 'Contractor', value: mockDisbursements.filter(d => d.instrument === 'contractor').length },
    { name: 'Cooperative', value: mockDisbursements.filter(d => d.instrument === 'cooperative').length },
    { name: 'Escrow', value: mockDisbursements.filter(d => d.instrument === 'escrow').length },
  ];

  const repaymentStatusData = [
    { name: 'Completed', value: mockRepaymentSchedules.filter(r => r.status === 'completed').length },
    { name: 'Scheduled', value: mockRepaymentSchedules.filter(r => r.status === 'scheduled').length },
    { name: 'Partial', value: mockRepaymentSchedules.filter(r => r.status === 'partial').length },
    { name: 'Failed', value: mockRepaymentSchedules.filter(r => r.status === 'failed').length },
  ];

  const monthlyData = [
    { name: 'Jan', disbursements: 12000000, repayments: 3500000 },
    { name: 'Feb', disbursements: 17000000, repayments: 3800000 },
    { name: 'Mar', disbursements: 22000000, repayments: 4100000 },
    { name: 'Apr', disbursements: 25000000, repayments: 4500000 },
    { name: 'May', disbursements: 30000000, repayments: 5000000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Disbursed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalDisbursed)}</div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">12.5%</span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Disbursements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(pendingDisbursements)}</div>
            <Progress value={(pendingDisbursements / (pendingDisbursements + totalDisbursed)) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {mockDisbursements.filter(d => ['pending', 'in-review', 'approved'].includes(d.status)).length} requests pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Repayment Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((totalRepaymentsPaid / totalRepaymentsDue) * 100).toFixed(1)}%</div>
            <Progress value={(totalRepaymentsPaid / totalRepaymentsDue) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {formatCurrency(totalRepaymentsPaid)} collected of {formatCurrency(totalRepaymentsDue)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Financial Exceptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openExceptions}</div>
            <div className="flex items-center mt-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-amber-500">{openExceptions} open issues</span>
              <span className="text-muted-foreground ml-1">need attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
            <CardDescription>Disbursements and repayments over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => formatCurrency(value as number)}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Bar dataKey="disbursements" name="Disbursements" fill="#8b5cf6" />
                <Bar dataKey="repayments" name="Repayments" fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Disbursement Types</CardTitle>
              <CardDescription>By instrument type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={disbursementByTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {disbursementByTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => value} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Repayment Status</CardTitle>
              <CardDescription>Current collection status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={repaymentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {repaymentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => value} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Financial Activities</CardTitle>
          <CardDescription>Scheduled transactions and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Disbursement Review</h4>
                <p className="text-sm text-muted-foreground">3 disbursement requests need review by May 21, 2025</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium">Overdue Repayments</h4>
                <p className="text-sm text-muted-foreground">2 repayments are overdue and require immediate follow-up</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Reconciliation Due</h4>
                <p className="text-sm text-muted-foreground">Daily reconciliation needs to be completed by 5:00 PM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceDashboard;
