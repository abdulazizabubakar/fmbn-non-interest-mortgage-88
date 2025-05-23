
import React from 'react';

interface ZonalMetricsCardsProps {
  region?: string;
}

const ZonalMetricsCards: React.FC<ZonalMetricsCardsProps> = ({ region }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">Active Leases</p>
        <p className="text-2xl font-bold">287</p>
        <p className="text-xs text-green-600">↑ 4.2% from last month</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">Collection Rate</p>
        <p className="text-2xl font-bold">94.3%</p>
        <p className="text-xs text-green-600">↑ 1.5% from last month</p>
      </div>
      <div className="bg-amber-50 p-4 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">Properties</p>
        <p className="text-2xl font-bold">225</p>
        <p className="text-xs text-blue-600">+12 new this month</p>
      </div>
    </div>
  );
};

export default ZonalMetricsCards;
