
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FinancialMetricsCards from './finance/FinancialMetricsCards';
import CollectionsChart from './finance/CollectionsChart';
import ArrearsZoneChart from './finance/ArrearsZoneChart';
import AtRiskAccountsTable from './finance/AtRiskAccountsTable';

interface FinanceDashboardProps {
  region?: string;
}

const FinanceDashboard: React.FC<FinanceDashboardProps> = ({ region = 'Global' }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>Collections, disbursements, and financial health metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <FinancialMetricsCards region={region} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CollectionsChart region={region} />
        <ArrearsZoneChart region={region} />
      </div>

      <AtRiskAccountsTable region={region} />
    </div>
  );
};

export default FinanceDashboard;
