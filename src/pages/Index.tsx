
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';

const Index = () => {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-2xl font-semibold">Dashboard Page</h1>
        <p className="text-muted-foreground mt-2">If you can see this message, the main layout is working correctly.</p>
        <p className="text-muted-foreground text-sm mt-1">The issue is likely within the dashboard's internal components.</p>
      </div>
    </PageContainer>
  );
};

export default Index;
