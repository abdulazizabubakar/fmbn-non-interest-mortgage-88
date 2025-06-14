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
  Activity,
  Search
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
import { SmartSearchBar } from './enhanced/SmartSearchBar';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader } from '@/components/ui/enhanced-card';

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
      <div className="space-y-6 animate-fade-in font-inter">
        {/* Enhanced Toggle Card */}
        <EnhancedCard gradient="blue" hover className="border-blue-200 shadow-2xl glass-card">
          <EnhancedCardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow glow-effect">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 text-xl gradient-text font-playfair">
                    Enhanced Dashboard
                  </h3>
                  <p className="text-sm text-blue-700 font-medium">Interactive, real-time dashboard experience</p>
                </div>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 animate-float font-bold">
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
                  <Label htmlFor="enhanced-dashboard" className="text-sm text-blue-700 font-semibold">
                    Enhanced Mode
                  </Label>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 hover-lift font-medium"
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Customize
                </Button>
              </div>
            </div>
          </EnhancedCardContent>
        </EnhancedCard>

        <EnhancedDashboardLayout 
          userRole={userRole || 'viewer'} 
          userRegion={userRegion} 
        />
      </div>
    );
  }

  // Enhanced Classic dashboard layout
  return (
    <div className="space-y-6 animate-fade-in font-inter">
      {/* Enhanced Header with Smart Search */}
      <div className="space-y-4">
        <div className="flex items-center justify-between animate-slide-in-left">
          <div>
            <h1 className="text-4xl font-extrabold gradient-text font-playfair flex items-center space-x-3">
              <LayoutDashboard className="h-9 w-9 text-primary" />
              <span>Dashboard</span>
            </h1>
            <p className="text-muted-foreground mt-1 text-lg font-medium">
              Welcome to the NIMMS Dashboard - <span className="font-semibold text-primary">{userRegion} Region</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-4 animate-slide-in-right">
            <div className="flex items-center space-x-2">
              <Switch
                id="enhanced-dashboard"
                checked={useEnhancedDashboard}
                onCheckedChange={setUseEnhancedDashboard}
              />
              <Label htmlFor="enhanced-dashboard" className="text-sm font-semibold">
                Enhanced Dashboard
              </Label>
            </div>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 animate-bounce-in">
              Classic Mode
            </Badge>
          </div>
        </div>

        {/* Smart Search Bar */}
        <div className="flex justify-center animate-scale-in" style={{ animationDelay: '200ms' }}>
          <SmartSearchBar 
            className="w-full max-w-2xl"
            onSearch={(query) => console.log('Searching for:', query)}
          />
        </div>
      </div>

      {/* Enhanced Upgrade prompt */}
      <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 animate-slide-up shadow-md">
        <TrendingUp className="h-5 w-5 text-blue-600" />
        <AlertTitle className="text-blue-900 text-lg font-bold font-playfair">
          Try the Enhanced Dashboard
        </AlertTitle>
        <AlertDescription className="text-blue-700 font-medium">
          Experience our new interactive dashboard with real-time data, customizable widgets, and advanced analytics.
          <Button 
            variant="link" 
            className="p-0 ml-2 text-blue-600 hover:text-blue-800 hover-lift font-semibold"
            onClick={() => setUseEnhancedDashboard(true)}
          >
            Switch to Enhanced Mode →
          </Button>
        </AlertDescription>
      </Alert>

      {/* Enhanced Key Performance Indicators */}
      <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
        <DashboardKPIs userRole={userRole || 'viewer'} region={userRegion} />
      </div>

      {/* Enhanced Real-time metrics */}
      <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
        <RealtimeMetrics userRole={userRole || 'viewer'} region={userRegion} timeframe={selectedTimeframe} />
      </div>
      
      {/* Enhanced Applications and Property cards */}
      <div className="grid grid-cols-1 gap-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
        <div className="hover-lift glass-card shadow-md">
          <ApplicationsOverview />
        </div>
        <div className="hover-lift glass-card shadow-md">
          <PropertyInsights />
        </div>
      </div>
      
      {/* Enhanced Financial Overview */}
      <RoleBasedAccess
        requiredRoles={['admin', 'manager', 'finance_officer', 'treasury_officer']}
        fallback={null}
      >
        <div className="animate-fade-in hover-lift glass-card" style={{ animationDelay: '600ms' }}>
          <FinancialOverview userRole={userRole || 'admin'} region={userRegion} />
        </div>
      </RoleBasedAccess>

      {/* Enhanced System Growth Chart */}
      <div className="animate-fade-in hover-lift glass-card" style={{ animationDelay: '700ms' }}>
        <SystemGrowthChart userRole={userRole || 'viewer'} region={userRegion} />
      </div>

      {/* Enhanced Role-specific dashboard */}
      <div className="animate-fade-in glass-card" style={{ animationDelay: '800ms' }}>
        <RoleDashboard userRole={userRole || 'viewer'} region={userRegion} />
      </div>

      {/* Enhanced Action shortcuts and notifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '900ms' }}>
        <div className="md:col-span-2 hover-lift glass-card">
          <ActionShortcuts userRole={userRole || undefined} />
        </div>
        <div className="hover-lift glass-card">
          <NotificationsPanel userRole={userRole || 'viewer'} />
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => console.log('FAB clicked')}
        className="animate-bounce-in"
      />
    </div>
  );
};

export default DashboardModule;
