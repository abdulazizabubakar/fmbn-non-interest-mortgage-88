
import React from 'react';
import { mockDisbursements, mockRepaymentSchedules, mockExceptions } from '@/data/mockFinanceData';
import SummaryStatsCards from './dashboard/SummaryStatsCards';
import MonthlyActivityChart from './dashboard/MonthlyActivityChart';
import FinancialPieCharts from './dashboard/FinancialPieCharts';
import UpcomingActivities from './dashboard/UpcomingActivities';
import { formatCurrency } from './dashboard/utils';

const FinanceDashboard = () => {
  // Calculate summary statistics
  const totalDisbursed = mockDisbursements
    .filter(d => d.status === 'completed')
    .reduce((sum, d) => sum + d.amount, 0);
  
  const pendingDisbursements = mockDisbursements
    .filter(d => ['pending', 'in-review', 'approved'].includes(d.status))
    .reduce((sum, d) => sum + d.amount, 0);
  
  const pendingDisbursementsCount = mockDisbursements
    .filter(d => ['pending', 'in-review', 'approved'].includes(d.status)).length;
  
  const totalRepaymentsDue = mockRepaymentSchedules
    .reduce((sum, r) => sum + r.amount, 0);
  
  const totalRepaymentsPaid = mockRepaymentSchedules
    .filter(r => r.status === 'completed')
    .reduce((sum, r) => sum + r.amount, 0);
  
  const openExceptions = mockExceptions.filter(e => e.status === 'open' || e.status === 'in-progress').length;

  // Prepare chart data
  const disbursementByTypeData = [
    { name: 'Direct to Vendor', value: mockDisbursements.filter(d => d.instrument === 'direct-to-vendor').length },
    { name: 'Contractor', value: mockDisbursements.filter(d => d.instrument === 'contractor').length },
    { name: 'Cooperative', value: mockDisbursements.filter(d => d.instrument === 'cooperative').length },
    { name: 'Escrow', value: mockDisbursements.filter(d => d.instrument === 'escrow').length },
  ];

  const repaymentStatusData = [
    { name: 'Completed', value: mockRepaymentSchedules.filter(r => r.status === 'completed').length },
    { name: 'Scheduled', value: mockRepaymentSchedules.filter(r => r.status === 'scheduled').length },
    { name: 'Partial', value: mockRepaymentSchedules.filter(r => r.status === 'partial').length },
    { name: 'Failed', value: mockRepaymentSchedules.filter(r => r.status === 'failed').length },
  ];

  const monthlyData = [
    { name: 'Jan', disbursements: 12000000, repayments: 3500000 },
    { name: 'Feb', disbursements: 17000000, repayments: 3800000 },
    { name: 'Mar', disbursements: 22000000, repayments: 4100000 },
    { name: 'Apr', disbursements: 25000000, repayments: 4500000 },
    { name: 'May', disbursements: 30000000, repayments: 5000000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <SummaryStatsCards 
        totalDisbursed={totalDisbursed}
        pendingDisbursements={pendingDisbursements}
        pendingDisbursementsCount={pendingDisbursementsCount}
        totalRepaymentsPaid={totalRepaymentsPaid}
        totalRepaymentsDue={totalRepaymentsDue}
        openExceptions={openExceptions}
        formatCurrency={formatCurrency}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyActivityChart data={monthlyData} formatCurrency={formatCurrency} />
        <FinancialPieCharts 
          disbursementByTypeData={disbursementByTypeData}
          repaymentStatusData={repaymentStatusData}
          colors={COLORS}
        />
      </div>

      {/* Upcoming Activities */}
      <UpcomingActivities />
    </div>
  );
};

export default FinanceDashboard;
