
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { useAuth } from '@/hooks/useAuth';
import DashboardModule from '@/components/dashboard/DashboardModule';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  
  const userRole = user?.roles[0] || null;
  const userRegion = user?.region || 'Global';

  if (!userRole) {
    return (
      <PageContainer>
        <Alert variant="destructive" className="mt-6 max-w-lg mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Could not determine user role. Please try logging in again.
            </AlertDescription>
          </Alert>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <DashboardModule 
        userRole={userRole}
        userRegion={userRegion}
      />
    </PageContainer>
  );
};

export default Index;
