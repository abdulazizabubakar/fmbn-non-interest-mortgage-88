
import React from 'react';
import DashboardHeader from './dashboard/DashboardHeader';
import SummaryCards from './dashboard/SummaryCards';
import OperationsTabs from './dashboard/OperationsTabs';

const FinanceOperationsDashboard: React.FC = () => {
  console.log("Finance Operations Dashboard is rendering");

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Finance Operations" 
        description="Manage payments, disbursements, refunds, and financial operations" 
      />
      <SummaryCards />
      <OperationsTabs />
    </div>
  );
};

export default FinanceOperationsDashboard;
