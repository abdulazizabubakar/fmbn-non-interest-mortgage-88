
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import DashboardModule from '@/components/dashboard/DashboardModule';

const Index = () => {
  // Mock user role - in a real app this would come from an authentication context
  const userRole = 'admin';
  const userRegion = 'North Central';

  return (
    <PageContainer>
      <DashboardModule userRole={userRole} userRegion={userRegion} />
    </PageContainer>
  );
};

export default Index;
