
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import PropertyStatusChart from './PropertyStatusChart';
import PaymentCollectionChart from './PaymentCollectionChart';

interface RegionalMetricsCardProps {
  region?: string;
}

const RegionalMetricsCard: React.FC<RegionalMetricsCardProps> = ({ region }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Regional Metrics</CardTitle>
          <CardDescription>Property status and payment collection</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <PropertyStatusChart region={region} />
          <PaymentCollectionChart region={region} />
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionalMetricsCard;
