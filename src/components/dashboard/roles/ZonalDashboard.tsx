
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ZonalMetricsCards from './zonal/ZonalMetricsCards';
import ApplicationsTrendChart from './zonal/ApplicationsTrendChart';
import RegionalMetricsCard from './zonal/RegionalMetricsCard';

interface ZonalDashboardProps {
  region?: string;
}

const ZonalDashboard: React.FC<ZonalDashboardProps> = ({ region = 'North Central' }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{region} Region Dashboard</CardTitle>
          <CardDescription>Performance metrics for your regional operations</CardDescription>
        </CardHeader>
        <CardContent>
          <ZonalMetricsCards region={region} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Applications Trend</CardTitle>
            <CardDescription>Monthly applications, approvals and disbursements</CardDescription>
          </CardHeader>
          <CardContent>
            <ApplicationsTrendChart region={region} />
          </CardContent>
        </Card>

        <RegionalMetricsCard region={region} />
      </div>
    </div>
  );
};

export default ZonalDashboard;
