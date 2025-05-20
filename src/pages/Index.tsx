
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import StatCard from '@/components/dashboard/StatCard';
import { mockStatCards } from '@/data/mockData';
import MortgageStatusChart from '@/components/dashboard/MortgageStatusChart';
import FinancingTypeChart from '@/components/dashboard/FinancingTypeChart';
import RecentApplications from '@/components/dashboard/RecentApplications';
import DisbursementTrend from '@/components/dashboard/DisbursementTrend';
import ActivityLog from '@/components/dashboard/ActivityLog';
import EligibilityCalculator from '@/components/onboarding/EligibilityCalculator';

const Index = () => {
  return (
    <PageContainer>
      <div className="space-y-8">
        <div className="text-center md:text-left">
          <h1 className="nimms-heading">Dashboard</h1>
          <p className="text-muted-foreground mt-1 md:text-lg">
            Welcome to Federal Mortgage Bank of Nigeria - Non-Interest Mortgage Management System
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockStatCards.map((stat, index) => (
            <StatCard key={index} data={stat} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DisbursementTrend />
          <div className="grid grid-cols-1 gap-4">
            <RecentApplications />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FinancingTypeChart />
          <MortgageStatusChart />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActivityLog />
          <EligibilityCalculator />
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
