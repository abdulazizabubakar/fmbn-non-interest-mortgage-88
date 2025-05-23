
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Download, Filter, Bell, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

import DashboardHeader from './dashboard-components/DashboardHeader';
import RoleDashboardSelector from './dashboard-components/RoleDashboardSelector';
import DashboardAlerts from './dashboard-components/DashboardAlerts';
import DashboardFilters from './dashboard-components/DashboardFilters';
import DataExportPanel from './dashboard-components/DataExportPanel';

import { UserRole } from '@/types/user';

interface MainDashboardProps {
  defaultRole?: UserRole;
  defaultRegion?: string;
}

const MainDashboard: React.FC<MainDashboardProps> = ({ 
  defaultRole,
  defaultRegion = 'All Regions' 
}) => {
  const { user, hasRole } = useAuth();
  const [activeRole, setActiveRole] = useState<UserRole | null>(null);
  const [activeRegion, setActiveRegion] = useState<string>(defaultRegion);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showExportPanel, setShowExportPanel] = useState<boolean>(false);
  
  // Initialize the dashboard with the user's role, or the default role if provided
  useEffect(() => {
    if (defaultRole) {
      setActiveRole(defaultRole);
    } else if (user?.roles && user.roles.length > 0) {
      setActiveRole(user.roles[0]);
    }
    
    // Set region if user has one
    if (user?.region) {
      setActiveRegion(user.region);
    }
  }, [user, defaultRole]);

  const handleExportData = () => {
    setShowExportPanel(!showExportPanel);
    if (!showExportPanel) {
      setShowFilters(false); // Close filters if opening export
    }
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
    if (!showFilters) {
      setShowExportPanel(false); // Close export if opening filters
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    toast.success(`Dashboard view changed to ${role.replace('_', ' ')} view`);
  };

  const handleRegionChange = (region: string) => {
    setActiveRegion(region);
    toast.success(`Region filter applied: ${region}`);
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header with Title and Controls */}
      <DashboardHeader 
        title="NIMMS Dashboard" 
        description="Non-Interest Mortgage Management System - Performance Metrics"
      />

      {/* Role Selector for Admins who can switch between views */}
      {hasRole('admin') || hasRole('super_admin') ? (
        <RoleDashboardSelector 
          activeRole={activeRole} 
          activeRegion={activeRegion}
          onRoleChange={handleRoleChange}
          onRegionChange={handleRegionChange}
        />
      ) : null}

      {/* Notifications and Alerts Panel */}
      <DashboardAlerts role={activeRole} region={activeRegion} />

      {/* Main Controls for Filtering and Export */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:max-w-3xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="mortgages">Mortgages</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleToggleFilters}
            className={showFilters ? "border-primary" : ""}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportData}
            className={showExportPanel ? "border-primary" : ""}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Conditional Filters Panel */}
      {showFilters && (
        <Card className="mb-6 border-dashed animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Dashboard Filters</CardTitle>
            <CardDescription>Filter the dashboard data by various criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardFilters 
              role={activeRole} 
              region={activeRegion}
              onFilterApplied={(filters) => {
                toast.success("Filters applied successfully");
                console.log("Applied filters:", filters);
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Conditional Export Panel */}
      {showExportPanel && (
        <Card className="mb-6 border-dashed animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Export Dashboard Data</CardTitle>
            <CardDescription>Export dashboard data in various formats</CardDescription>
          </CardHeader>
          <CardContent>
            <DataExportPanel 
              activeTab={activeTab}
              role={activeRole}
              region={activeRegion}
            />
          </CardContent>
        </Card>
      )}

      {/* Tab Content Areas */}
      <Tabs value={activeTab} className="w-full">
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <RoleDashboardSelector 
              activeRole={activeRole} 
              activeRegion={activeRegion}
              hideControls={true}
              onRoleChange={handleRoleChange}
              onRegionChange={handleRegionChange}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="applications" className="mt-0">
          <AppDashboardContent role={activeRole} region={activeRegion} />
        </TabsContent>
        
        <TabsContent value="mortgages" className="mt-0">
          <MortgageDashboardContent role={activeRole} region={activeRegion} />
        </TabsContent>
        
        <TabsContent value="properties" className="mt-0">
          <PropertyDashboardContent role={activeRole} region={activeRegion} />
        </TabsContent>
        
        <TabsContent value="payments" className="mt-0">
          <PaymentDashboardContent role={activeRole} region={activeRegion} />
        </TabsContent>
        
        <TabsContent value="reports" className="mt-0">
          <ReportsDashboardContent role={activeRole} region={activeRegion} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Placeholder components for tab content
const AppDashboardContent = ({ role, region }: { role: UserRole | null, region: string }) => (
  <Card>
    <CardHeader>
      <CardTitle>Applications Dashboard</CardTitle>
      <CardDescription>Monitor mortgage applications across all stages</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Application data visualizations will be shown here, filtered by {region}</p>
    </CardContent>
  </Card>
);

const MortgageDashboardContent = ({ role, region }: { role: UserRole | null, region: string }) => (
  <Card>
    <CardHeader>
      <CardTitle>Mortgages Dashboard</CardTitle>
      <CardDescription>Track active mortgages, performance and transitions</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Mortgage analytics will be shown here, filtered by {region}</p>
    </CardContent>
  </Card>
);

const PropertyDashboardContent = ({ role, region }: { role: UserRole | null, region: string }) => (
  <Card>
    <CardHeader>
      <CardTitle>Properties Dashboard</CardTitle>
      <CardDescription>Monitor property inventory, occupancy and status</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Property insights will be shown here, filtered by {region}</p>
    </CardContent>
  </Card>
);

const PaymentDashboardContent = ({ role, region }: { role: UserRole | null, region: string }) => (
  <Card>
    <CardHeader>
      <CardTitle>Payments Dashboard</CardTitle>
      <CardDescription>Track payments, collections and defaults</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Payment analytics will be shown here, filtered by {region}</p>
    </CardContent>
  </Card>
);

const ReportsDashboardContent = ({ role, region }: { role: UserRole | null, region: string }) => (
  <Card>
    <CardHeader>
      <CardTitle>Reports Dashboard</CardTitle>
      <CardDescription>Generate and schedule automated reports</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Reporting tools will be shown here, filtered by {region}</p>
    </CardContent>
  </Card>
);

export default MainDashboard;
