
import React from 'react';
import PropertyStats from './dashboard/PropertyStats';
import PropertyCharts from './dashboard/PropertyCharts';
import ConstructionProgress from './dashboard/ConstructionProgress';
import PropertyAlerts from './dashboard/PropertyAlerts';

interface PropertyDashboardProps {
  searchQuery?: string;
}

const PropertyDashboard: React.FC<PropertyDashboardProps> = ({ searchQuery }) => {
  return (
    <div className="space-y-6">
      {/* Enhanced Statistics Cards */}
      <PropertyStats />

      {/* Charts Section */}
      <PropertyCharts />

      {/* Construction Progress & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConstructionProgress />
        <PropertyAlerts />
      </div>
    </div>
  );
};

export default PropertyDashboard;
