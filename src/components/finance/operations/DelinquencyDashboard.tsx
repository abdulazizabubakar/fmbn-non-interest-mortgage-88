
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const DelinquencyDashboard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delinquency Management</CardTitle>
        <CardDescription>Monitor and manage delinquent accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium">Delinquency Management Dashboard</h3>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Track overdue accounts, analyze delinquency trends, and implement early intervention strategies.
            This dashboard will provide aging reports and risk analysis for delinquent accounts.
          </p>
          <Button className="mt-6">Set Up Delinquency Dashboard</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DelinquencyDashboard;
