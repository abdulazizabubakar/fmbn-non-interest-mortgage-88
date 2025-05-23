
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from 'lucide-react';

const OverviewFinancialHealth: React.FC = () => {
  return (
    <Card className="shadow-sm border-nimms-primary/10">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-nimms-primary">Financial Health</CardTitle>
        <CardDescription>Key financial indicators and metrics</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <LineChart className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium">Financial Metrics</h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            Detailed financial health metrics will be displayed here with performance indicators and trends
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewFinancialHealth;
