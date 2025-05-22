
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart4, PiggyBank } from 'lucide-react';

interface TreasuryDashboardProps {
  showSummary?: boolean;
}

const TreasuryDashboard: React.FC<TreasuryDashboardProps> = ({ showSummary = false }) => {
  return (
    <>
      {showSummary ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Treasury Position</CardTitle>
            <CardDescription>Current financial position overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-md">
                <div className="flex items-center space-x-2">
                  <PiggyBank className="h-5 w-5 text-green-600" />
                  <h4 className="text-sm font-medium text-muted-foreground">Total Assets</h4>
                </div>
                <p className="text-2xl font-bold mt-2">₦3.2B</p>
                <p className="text-xs text-muted-foreground">As of May 20, 2025</p>
              </div>
              <div className="p-4 border rounded-md">
                <div className="flex items-center space-x-2">
                  <BarChart4 className="h-5 w-5 text-amber-600" />
                  <h4 className="text-sm font-medium text-muted-foreground">Net Position</h4>
                </div>
                <p className="text-2xl font-bold mt-2">₦1.78B</p>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
              </div>
              <div className="p-4 border rounded-md">
                <div className="flex items-center space-x-2">
                  <BarChart4 className="h-5 w-5 text-blue-600" />
                  <h4 className="text-sm font-medium text-muted-foreground">Pending Outflows</h4>
                </div>
                <p className="text-2xl font-bold mt-2">₦450M</p>
                <p className="text-xs text-muted-foreground">Next 30 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Treasury Management</CardTitle>
            <CardDescription>Manage and monitor financial position</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <PiggyBank className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium">Treasury Dashboard</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                The Treasury Dashboard will provide a comprehensive view of your financial position,
                cash flow forecasting, and fund management tools.
              </p>
              <Button className="mt-6">Set Up Treasury Dashboard</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TreasuryDashboard;
