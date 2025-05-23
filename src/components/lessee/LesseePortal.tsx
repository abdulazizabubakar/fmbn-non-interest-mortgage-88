
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LesseeDashboard from '@/components/lessee/LesseeDashboard';
import ApplicationWorkflow from '@/components/lessee/ApplicationWorkflow';
import PaymentManagement from '@/components/lessee/PaymentManagement';
import DocumentCenter from '@/components/lessee/DocumentCenter';
import SupportTickets from '@/components/lessee/SupportTickets';
import OwnershipTracker from '@/components/lessee/OwnershipTracker';
import TakafulDetails from '@/components/lessee/TakafulDetails';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LesseeSidebar from './LesseeSidebar';

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
      <div className="p-6">
        <Alert variant="destructive" className="mt-8 max-w-lg mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You do not have access to the Lessee Portal. Please contact support if you believe this is an error.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background/95">
      <LesseeSidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <main className="flex-1 p-6">
          <div className="container mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Lessee Portal</h1>
              <p className="text-muted-foreground mt-1">
                Manage your non-interest housing finance with FMBN
              </p>
            </div>
            
            <LesseeDashboard />
            
            <Tabs defaultValue="application" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full">
                <TabsTrigger value="application">Application</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="ownership">Ownership</TabsTrigger>
                <TabsTrigger value="takaful">Takaful</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="application" className="py-4">
                <ApplicationWorkflow />
              </TabsContent>
              
              <TabsContent value="payments" className="py-4">
                <PaymentManagement />
              </TabsContent>
              
              <TabsContent value="documents" className="py-4">
                <DocumentCenter />
              </TabsContent>
              
              <TabsContent value="ownership" className="py-4">
                <OwnershipTracker />
              </TabsContent>
              
              <TabsContent value="takaful" className="py-4">
                <TakafulDetails />
              </TabsContent>
              
              <TabsContent value="support" className="py-4">
                <SupportTickets />
              </TabsContent>
              
              <TabsContent value="settings" className="py-4">
                <h2 className="text-xl font-semibold">Account Settings</h2>
                <p className="text-muted-foreground">Update your personal information and preferences.</p>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LesseePortal;
