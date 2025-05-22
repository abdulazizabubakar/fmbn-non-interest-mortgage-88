
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MortgageAccount } from '@/types/mortgage-account';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface AccountOverviewProps {
  account: MortgageAccount;
}

const AccountOverview: React.FC<AccountOverviewProps> = ({ account }) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Calculate percentage of mortgage completed
  const completionPercentage = (account.completedPayments / account.totalScheduleItems) * 100;
  
  // Data for pie chart
  const pieData = [
    { name: 'Principal Paid', value: account.principalAmount - account.outstandingPrincipal },
    { name: 'Principal Outstanding', value: account.outstandingPrincipal },
    { name: 'Profit/Rent Paid', value: account.totalPayable - account.principalAmount - (account.outstandingProfit || account.outstandingRent || 0) },
    { name: 'Profit/Rent Outstanding', value: account.outstandingProfit || account.outstandingRent || 0 },
  ];
  
  const COLORS = ['#4ade80', '#22c55e', '#60a5fa', '#3b82f6'];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Financing Type</p>
                <p className="font-medium capitalize">{account.financingType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created Date</p>
                <p className="font-medium">{formatDate(account.creationDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Activated Date</p>
                <p className="font-medium">{account.activationDate ? formatDate(account.activationDate) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Maturity Date</p>
                <p className="font-medium">{formatDate(account.maturityDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Schedule Type</p>
                <p className="font-medium capitalize">{account.scheduleType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Day</p>
                <p className="font-medium">{account.paymentDay} of each month</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tenure</p>
                <p className="font-medium">{Math.floor(account.tenor / 12)} years {account.tenor % 12} months</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Grace Period</p>
                <p className="font-medium">{account.graceMonths} month{account.graceMonths !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Financial Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Financial Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Principal Amount</p>
                <p className="font-medium">{formatCurrency(account.principalAmount)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Equity Contribution</p>
                <p className="font-medium">{formatCurrency(account.equityContribution)} ({account.equityPercentage}%)</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Payment</p>
                <p className="font-medium">{formatCurrency(account.monthlyPayment)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Payable</p>
                <p className="font-medium">{formatCurrency(account.totalPayable)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {account.rentRate ? 'Rent Rate' : 'Profit Rate'}
                </p>
                <p className="font-medium">{(account.rentRate || account.profitRate || 0).toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ownership Percentage</p>
                <p className="font-medium">{account.ownershipPercentage.toFixed(2)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mortgage Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Payments Progress</span>
              <span>{account.completedPayments} of {account.totalScheduleItems} payments made ({completionPercentage.toFixed(1)}%)</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Payment Breakdown</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {pieData.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-xs">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Current Balances</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Outstanding Principal</span>
                    <span className="font-medium">{formatCurrency(account.outstandingPrincipal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Outstanding {account.outstandingRent ? 'Rent' : 'Profit'}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(account.outstandingRent || account.outstandingProfit || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Outstanding</span>
                    <span className="font-medium">{formatCurrency(account.currentBalance)}</span>
                  </div>
                </div>
              </div>
              
              {(account.overdueDays > 0 || account.overduePrincipal > 0) && (
                <div className="mt-4 p-3 bg-red-50 rounded-md">
                  <h4 className="text-sm font-medium text-red-800 mb-1">Overdue Information</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-red-600">Days Overdue</span>
                      <span className="font-medium text-red-600">{account.overdueDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-red-600">Overdue Amount</span>
                      <span className="font-medium text-red-600">{formatCurrency(account.overduePrincipal + account.overdueProfitRent)}</span>
                    </div>
                    {account.penalties > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-red-600">Penalties</span>
                        <span className="font-medium text-red-600">{formatCurrency(account.penalties)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountOverview;
