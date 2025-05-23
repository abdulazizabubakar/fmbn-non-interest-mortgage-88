
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardKPIs from './DashboardKPIs';
import ActionShortcuts from './ActionShortcuts';
import { RoleBasedAccess } from '@/components/auth/RoleBasedAccess';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import RoleDashboard from './RoleDashboard';
import NotificationsPanel from './NotificationsPanel';
import RealtimeMetrics from './RealtimeMetrics';
import FinancialOverview from './FinancialOverview';
import ApplicationsOverview from './ApplicationsOverview';
import PropertyInsights from './PropertyInsights';

interface DashboardModuleProps {
  userRole: string | null;
  userRegion?: string;
}

const DashboardModule: React.FC<DashboardModuleProps> = ({ 
  userRole,
  userRegion = 'Global'
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly');
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the NIMMS Dashboard - {userRegion} Region
        </p>
      </div>

      {/* Role-specific dashboard */}
      <RoleDashboard userRole={userRole || 'viewer'} region={userRegion} />

      {/* Key Performance Indicators */}
      <DashboardKPIs userRole={userRole || 'viewer'} region={userRegion} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ActionShortcuts userRole={userRole || undefined} />
        </div>
        
        <div>
          <NotificationsPanel userRole={userRole || 'viewer'} />
        </div>
      </div>

      {/* Real-time metrics */}
      <RealtimeMetrics userRole={userRole || 'viewer'} region={userRegion} timeframe={selectedTimeframe} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ApplicationsOverview />
        <PropertyInsights />
      </div>
      
      <RoleBasedAccess
        requiredRoles={['admin', 'manager', 'finance_officer', 'treasury_officer']}
        fallback={null}
      >
        <FinancialOverview userRole={userRole || 'admin'} region={userRegion} />
      </RoleBasedAccess>
    </div>
  );
};

export default DashboardModule;
