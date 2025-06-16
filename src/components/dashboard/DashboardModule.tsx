
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CommandPalette } from '@/components/ui/command-palette';
import { 
  LayoutDashboard, 
  Sparkles, 
  Command,
  Settings,
  Search
} from 'lucide-react';

// Import the new enhanced dashboard
import DashboardLayout from './enhanced/DashboardLayout';

// Import classic dashboard components
import EnhancedDashboardKPIs from './EnhancedDashboardKPIs';
import ActionShortcuts from './ActionShortcuts';
import { RoleBasedAccess } from '@/components/auth/RoleBasedAccess';
import RoleDashboard from './RoleDashboard';
import NotificationsPanel from './NotificationsPanel';
import RealtimeMetrics from './RealtimeMetrics';
import FinancialOverview from './FinancialOverview';
import ApplicationsOverview from './ApplicationsOverview';
import PropertyInsights from './PropertyInsights';
import SystemGrowthChart from './SystemGrowthChart';
import { SmartSearchBar } from './enhanced/SmartSearchBar';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { GlassCard } from '@/components/ui/glass-card';

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
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  
  // Enhanced dashboard as the primary experience
  if (useEnhancedDashboard) {
    return (
      <div className="space-y-6 animate-fade-in font-inter min-h-screen">
        {/* Enhanced Toggle Card */}
        <Card className="border-0 bg-gradient-to-r from-blue-50 via-white to-purple-50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl">
                    Enhanced FMBN Dashboard
                  </h3>
                  <p className="text-gray-600">Interactive, real-time analytics with modern design</p>
                </div>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 animate-pulse font-bold shadow-lg">
                  ✨ ENHANCED
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCommandPaletteOpen(true)}
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Command className="h-4 w-4 mr-2" />
                  Quick Actions
                </Button>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enhanced-dashboard"
                    checked={useEnhancedDashboard}
                    onCheckedChange={setUseEnhancedDashboard}
                  />
                  <Label htmlFor="enhanced-dashboard" className="text-gray-700 font-medium">
                    Enhanced Mode
                  </Label>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Customize
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <DashboardLayout 
          userRole={userRole || 'viewer'} 
          userRegion={userRegion} 
        />

        {/* Command Palette */}
        <CommandPalette 
          open={commandPaletteOpen} 
          onOpenChange={setCommandPaletteOpen} 
        />
      </div>
    );
  }

  // Classic dashboard layout (simplified)
  return (
    <div className="space-y-6 animate-fade-in font-inter min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <LayoutDashboard className="h-8 w-8 text-white" />
              </div>
              <span>FMBN Dashboard</span>
            </h1>
            <p className="text-gray-600 text-lg pl-16">
              Federal Mortgage Bank of Nigeria - <span className="font-bold text-blue-600">{userRegion} Region</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCommandPaletteOpen(true)}
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Search className="h-4 w-4 mr-2" />
              Search (⌘K)
            </Button>
            <div className="flex items-center space-x-2">
              <Switch
                id="enhanced-dashboard"
                checked={useEnhancedDashboard}
                onCheckedChange={setUseEnhancedDashboard}
              />
              <Label htmlFor="enhanced-dashboard" className="text-sm font-medium">
                Enhanced Dashboard
              </Label>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
              Classic Mode
            </Badge>
          </div>
        </div>

        {/* Smart Search Bar */}
        <div className="flex justify-center">
          <SmartSearchBar 
            className="w-full max-w-2xl shadow-lg"
            onSearch={(query) => console.log('Searching for:', query)}
          />
        </div>
      </div>

      {/* Upgrade prompt */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 via-white to-purple-50 shadow-lg">
        <CardContent className="p-6">
          <Alert className="border-0 bg-transparent">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <AlertTitle className="text-gray-900 text-lg font-bold">
                  Try the Enhanced FMBN Dashboard
                </AlertTitle>
                <AlertDescription className="text-gray-600 font-medium">
                  Experience our new interactive dashboard with real-time data, customizable widgets, and advanced analytics.
                </AlertDescription>
              </div>
              <Button 
                onClick={() => setUseEnhancedDashboard(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
              >
                Try Enhanced Mode →
              </Button>
            </div>
          </Alert>
        </CardContent>
      </Card>

      {/* Classic dashboard content */}
      <div className="space-y-6">
        <GlassCard>
          <EnhancedDashboardKPIs userRole={userRole || 'viewer'} region={userRegion} />
        </GlassCard>
        
        <GlassCard>
          <RealtimeMetrics userRole={userRole || 'viewer'} region={userRegion} timeframe={selectedTimeframe} />
        </GlassCard>
        
        <div className="grid grid-cols-1 gap-6">
          <GlassCard>
            <ApplicationsOverview />
          </GlassCard>
          <GlassCard>
            <PropertyInsights />
          </GlassCard>
        </div>
        
        <RoleBasedAccess
          requiredRoles={['admin', 'manager', 'finance_officer', 'treasury_officer']}
          fallback={null}
        >
          <GlassCard>
            <FinancialOverview userRole={userRole || 'admin'} region={userRegion} />
          </GlassCard>
        </RoleBasedAccess>

        <GlassCard>
          <SystemGrowthChart userRole={userRole || 'viewer'} region={userRegion} />
        </GlassCard>

        <GlassCard>
          <RoleDashboard userRole={userRole || 'viewer'} region={userRegion} />
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <GlassCard>
              <ActionShortcuts userRole={userRole || undefined} />
            </GlassCard>
          </div>
          <GlassCard>
            <NotificationsPanel userRole={userRole || 'viewer'} />
          </GlassCard>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => setCommandPaletteOpen(true)}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl"
        icon={<Command className="h-6 w-6" />}
      />

      {/* Command Palette */}
      <CommandPalette 
        open={commandPaletteOpen} 
        onOpenChange={setCommandPaletteOpen} 
      />
    </div>
  );
};

export default DashboardModule;
