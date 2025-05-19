
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import AnalyticsModule from '@/components/analytics/AnalyticsModule';

const Analytics = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Insights</h1>
          <p className="text-muted-foreground">
            Uncover trends, detect inefficiencies, and support data-driven decision-making
          </p>
        </div>
        
        <AnalyticsModule />
      </div>
    </PageContainer>
  );
};

export default Analytics;
