
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  LayoutDashboard, 
  Sparkles, 
  TrendingUp, 
  Settings,
  BarChart3,
  Activity
} from 'lucide-react';
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
import SystemGrowthChart from './SystemGrowthChart';
import EnhancedDashboardLayout from './enhanced/EnhancedDashboardLayout';

interface DashboardModuleProps {
  userRole: string | null;
  userRegion?: string;
}

const DashboardModule: React.FC<DashboardModuleProps> = ({ 
  userRole,
  userRegion = 'Global'
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [useEnhancedDashboard, setUseEnhancedDashboard] = useState(true);
  
  // Show enhanced dashboard option
  if (useEnhancedDashboard) {
    return (
      <div className="space-y-4">
        {/* Toggle between enhanced and classic */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">Enhanced Dashboard</h3>
                  <p className="text-sm text-blue-700">Interactive, real-time dashboard experience</p>
                </div>
                <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                  NEW
                </Badge>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enhanced-dashboard"
                    checked={useEnhancedDashboard}
                    onCheckedChange={setUseEnhancedDashboard}
                  />
                  <Label htmlFor="enhanced-dashboard" className="text-sm text-blue-700">
                    Enhanced Mode
                  </Label>
                </div>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Settings className="h-4 w-4 mr-1" />
                  Customize
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <EnhancedDashboardLayout 
          userRole={userRole || 'viewer'} 
          userRegion={userRegion} 
        />
      </div>
    );
  }

  // Classic dashboard layout
  return (
    <div className="space-y-6">
      {/* Header with toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-2">
            <LayoutDashboard className="h-8 w-8 text-blue-600" />
            <span>Dashboard</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome to the NIMMS Dashboard - {userRegion} Region
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="enhanced-dashboard"
              checked={useEnhancedDashboard}
              onCheckedChange={setUseEnhancedDashboard}
            />
            <Label htmlFor="enhanced-dashboard" className="text-sm">
              Enhanced Dashboard
            </Label>
          </div>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Classic Mode
          </Badge>
        </div>
      </div>

      {/* Upgrade prompt */}
      <Alert className="border-blue-200 bg-blue-50">
        <TrendingUp className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-900">Try the Enhanced Dashboard</AlertTitle>
        <AlertDescription className="text-blue-700">
          Experience our new interactive dashboard with real-time data, customizable widgets, and advanced analytics.
          <Button 
            variant="link" 
            className="p-0 ml-2 text-blue-600 hover:text-blue-800"
            onClick={() => setUseEnhancedDashboard(true)}
          >
            Switch to Enhanced Mode →
          </Button>
        </AlertDescription>
      </Alert>

      {/* Key Performance Indicators */}
      <DashboardKPIs userRole={userRole || 'viewer'} region={userRegion} />

      {/* Real-time metrics - moved up */}
      <RealtimeMetrics userRole={userRole || 'viewer'} region={userRegion} timeframe={selectedTimeframe} />
      
      {/* Applications and Property cards - now stacked vertically and taking full width */}
      <div className="grid grid-cols-1 gap-6">
        <ApplicationsOverview />
        <PropertyInsights />
      </div>
      
      {/* Financial Overview - moved up */}
      <RoleBasedAccess
        requiredRoles={['admin', 'manager', 'finance_officer', 'treasury_officer']}
        fallback={null}
      >
        <FinancialOverview userRole={userRole || 'admin'} region={userRegion} />
      </RoleBasedAccess>

      {/* System Growth Chart - positioned after the cards */}
      <SystemGrowthChart userRole={userRole || 'viewer'} region={userRegion} />

      {/* Role-specific dashboard */}
      <RoleDashboard userRole={userRole || 'viewer'} region={userRegion} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ActionShortcuts userRole={userRole || undefined} />
        </div>
        
        <div>
          <NotificationsPanel userRole={userRole || 'viewer'} />
        </div>
      </div>
    </div>
  );
};

export default DashboardModule;
