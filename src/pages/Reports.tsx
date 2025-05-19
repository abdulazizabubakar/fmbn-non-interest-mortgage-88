
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import ReportsModule from '@/components/reports/ReportsModule';

const Reports = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">
            Generate, schedule and analyze pre-built and custom reports
          </p>
        </div>
        
        <ReportsModule />
      </div>
    </PageContainer>
  );
};

export default Reports;
