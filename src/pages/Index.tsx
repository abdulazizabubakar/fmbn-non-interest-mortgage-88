
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import DashboardModule from '@/components/dashboard/DashboardModule';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { UserRole } from '@/types/user';

const Index = () => {
  const { user, hasAccessToModule } = useAuth();
  
  // Get user role and region for dashboard customization
  // Make sure to handle the case when user is null
  const userRole = user?.roles[0] || null;
  const userRegion = user?.region || 'Global';
  const hasDashboardAccess = hasAccessToModule('dashboard');

  return (
    <PageContainer>
      {hasDashboardAccess ? (
        <DashboardModule 
          userRole={userRole as string} 
          userRegion={userRegion} 
        />
      ) : (
        <Alert variant="destructive" className="mt-6 max-w-lg mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You do not have permission to access the dashboard.
            Please contact your system administrator if you believe this is an error.
          </AlertDescription>
        </Alert>
      )}
    </PageContainer>
  );
};

export default Index;
