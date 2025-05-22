
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowDownUp } from 'lucide-react';

const ReconciliationTool: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Reconciliation</CardTitle>
        <CardDescription>Reconcile financial transactions across systems</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <ArrowDownUp className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium">Reconciliation Tool</h3>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            This tool will help you identify discrepancies between internal records and external payment systems,
            track unmatched transactions, and ensure financial data integrity.
          </p>
          <Button className="mt-6">Set Up Reconciliation Tool</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReconciliationTool;
