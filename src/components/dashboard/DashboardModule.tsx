
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardKPIs from './DashboardKPIs';
import ApplicationsOverview from './ApplicationsOverview';
import PaymentMetrics from './PaymentMetrics';
import PropertyInsights from './PropertyInsights';
import DefaultsAnalysis from './DefaultsAnalysis';
import GeographicalDistribution from './GeographicalDistribution';
import NotificationsPanel from './NotificationsPanel';
import ActionShortcuts from './ActionShortcuts';
import AdminDashboard from './roles/AdminDashboard';
import FinanceDashboard from './roles/FinanceDashboard';
import LegalDashboard from './roles/LegalDashboard';
import ZonalDashboard from './roles/ZonalDashboard';
import CustomerDashboard from './roles/CustomerDashboard';
import DeveloperDashboard from './roles/DeveloperDashboard';

// Types for role-based access
type UserRole = 'admin' | 'finance' | 'legal' | 'zonal' | 'developer' | 'customer';

interface DashboardModuleProps {
  userRole: UserRole;
  userRegion?: string; // For zonal officers
}

const DashboardModule: React.FC<DashboardModuleProps> = ({ userRole, userRegion }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Render appropriate dashboard based on user role
  const renderRoleDashboard = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'finance':
        return <FinanceDashboard />;
      case 'legal':
        return <LegalDashboard />;
      case 'zonal':
        return <ZonalDashboard region={userRegion || 'All Regions'} />;
      case 'developer':
        return <DeveloperDashboard />;
      case 'customer':
        return <CustomerDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-nimms-primary mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground">
            {userRole === 'zonal' && userRegion 
              ? `${userRegion} Region Insights and Metrics` 
              : 'Mortgage System Insights and Key Metrics'}
          </p>
        </div>
        <div className="flex gap-2">
          {/* Time period selector could go here */}
        </div>
      </div>

      {/* Role-specific dashboard */}
      {renderRoleDashboard()}
      
      {/* Common dashboard tabs */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="defaults">Defaults</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <DashboardKPIs userRole={userRole} region={userRegion} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ApplicationsOverview />
            <PaymentMetrics />
          </div>
          <NotificationsPanel limit={5} />
          <ActionShortcuts userRole={userRole} />
        </TabsContent>
        
        <TabsContent value="applications" className="space-y-6">
          <ApplicationsOverview detailed />
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-6">
          <PaymentMetrics detailed />
        </TabsContent>
        
        <TabsContent value="properties" className="space-y-6">
          <PropertyInsights />
          <GeographicalDistribution view="properties" />
        </TabsContent>
        
        <TabsContent value="defaults" className="space-y-6">
          <DefaultsAnalysis />
          <GeographicalDistribution view="defaults" />
        </TabsContent>
        
        <TabsContent value="transfers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ownership Transfers</CardTitle>
              <CardDescription>Tracking and processing of mortgage ownership transfers</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Transfer metrics and monitoring components will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardModule;
