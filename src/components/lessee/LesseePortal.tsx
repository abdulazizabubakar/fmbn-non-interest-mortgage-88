
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { useAuth } from '@/hooks/useAuth';
import ApplicationWorkflow from '@/components/lessee/ApplicationWorkflow';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LesseePortal = () => {
  const { user, hasRole } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is authenticated and has lessee role
  const isLessee = user && hasRole('lessee');
  
  // Redirect non-lessees or unauthenticated users to login
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!isLessee) {
      // If authenticated but not a lessee, show access denied message
      // This will be handled by the render condition below
    }
  }, [user, isLessee, navigate]);
  
  if (!user) return null; // Will redirect in useEffect
  
  if (!isLessee) {
    return (
      <PageContainer>
        <Alert variant="destructive" className="mt-8 max-w-lg mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You do not have access to the Lessee Portal. Please contact support if you believe this is an error.
          </AlertDescription>
        </Alert>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lessee Portal</h1>
          <p className="text-muted-foreground mt-1">
            Manage your non-interest housing finance with FMBN
          </p>
        </div>
        
        <div className="w-full">
          <ApplicationWorkflow />
        </div>
      </div>
    </PageContainer>
  );
};

export default LesseePortal;
