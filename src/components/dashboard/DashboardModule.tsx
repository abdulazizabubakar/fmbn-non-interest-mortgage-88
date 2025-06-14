
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CommandPalette } from '@/components/ui/command-palette';
import { 
  LayoutDashboard, 
  Sparkles, 
  TrendingUp, 
  Settings,
  BarChart3,
  Activity,
  Search,
  Command
} from 'lucide-react';
import EnhancedDashboardKPIs from './EnhancedDashboardKPIs';
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
  
  // Show enhanced dashboard option
  if (useEnhancedDashboard) {
    return (
      <div className="space-y-6 animate-fade-in font-inter min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        {/* Enhanced Toggle Card with Glassmorphism */}
        <GlassCard className="border-blue-200 shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg glow-effect">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 text-2xl gradient-text font-playfair">
                    Enhanced Dashboard Experience
                  </h3>
                  <p className="text-blue-700 font-medium">Interactive, real-time analytics with advanced visualizations</p>
                </div>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 animate-float font-bold shadow-lg">
                  ✨ NEW
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCommandPaletteOpen(true)}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 hover-lift font-medium shadow-sm"
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
                  <Label htmlFor="enhanced-dashboard" className="text-blue-700 font-semibold">
                    Enhanced Mode
                  </Label>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 hover-lift font-medium shadow-sm"
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Customize
                </Button>
              </div>
            </div>
          </CardContent>
        </GlassCard>

        <EnhancedDashboardLayout 
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

  // Enhanced Classic dashboard layout with better styling
  return (
    <div className="space-y-6 animate-fade-in font-inter min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white">
      {/* Enhanced Header with Smart Search */}
      <div className="space-y-4">
        <div className="flex items-center justify-between animate-slide-in-left">
          <div className="space-y-2">
            <h1 className="text-5xl font-extrabold gradient-text font-playfair flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <LayoutDashboard className="h-10 w-10 text-white" />
              </div>
              <span>NIMMS Dashboard</span>
            </h1>
            <p className="text-muted-foreground text-xl font-medium pl-16">
              Welcome to the NIMMS Dashboard - <span className="font-bold text-primary bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{userRegion} Region</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-4 animate-slide-in-right">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCommandPaletteOpen(true)}
              className="border-blue-200 text-blue-700 hover:bg-blue-50 hover-lift font-medium shadow-sm"
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
              <Label htmlFor="enhanced-dashboard" className="text-sm font-semibold">
                Enhanced Dashboard
              </Label>
            </div>
            <Badge variant="outline" className="bg-gradient-to-r from-yellow-50 to-orange-50 text-orange-700 border-orange-200 animate-bounce-in font-semibold">
              Classic Mode
            </Badge>
          </div>
        </div>

        {/* Smart Search Bar */}
        <div className="flex justify-center animate-scale-in" style={{ animationDelay: '200ms' }}>
          <SmartSearchBar 
            className="w-full max-w-3xl shadow-lg"
            onSearch={(query) => console.log('Searching for:', query)}
          />
        </div>
      </div>

      {/* Enhanced Upgrade prompt */}
      <GlassCard className="animate-slide-up shadow-xl">
        <CardContent className="p-6">
          <Alert className="border-0 bg-transparent">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <AlertTitle className="text-blue-900 text-xl font-bold font-playfair">
                  Unlock Advanced Analytics
                </AlertTitle>
                <AlertDescription className="text-blue-700 font-medium text-base">
                  Experience our new interactive dashboard with real-time data, customizable widgets, AI insights, and advanced analytics.
                </AlertDescription>
              </div>
              <Button 
                onClick={() => setUseEnhancedDashboard(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              >
                Try Enhanced Mode →
              </Button>
            </div>
          </Alert>
        </CardContent>
      </GlassCard>

      {/* Enhanced Key Performance Indicators */}
      <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
        <EnhancedDashboardKPIs userRole={userRole || 'viewer'} region={userRegion} />
      </div>

      {/* Enhanced Real-time metrics */}
      <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
        <GlassCard className="shadow-lg">
          <RealtimeMetrics userRole={userRole || 'viewer'} region={userRegion} timeframe={selectedTimeframe} />
        </GlassCard>
      </div>
      
      {/* Enhanced Applications and Property cards */}
      <div className="grid grid-cols-1 gap-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
        <GlassCard className="hover-lift shadow-lg">
          <ApplicationsOverview />
        </GlassCard>
        <GlassCard className="hover-lift shadow-lg">
          <PropertyInsights />
        </GlassCard>
      </div>
      
      {/* Enhanced Financial Overview */}
      <RoleBasedAccess
        requiredRoles={['admin', 'manager', 'finance_officer', 'treasury_officer']}
        fallback={null}
      >
        <div className="animate-fade-in hover-lift" style={{ animationDelay: '600ms' }}>
          <GlassCard className="shadow-lg">
            <FinancialOverview userRole={userRole || 'admin'} region={userRegion} />
          </GlassCard>
        </div>
      </RoleBasedAccess>

      {/* Enhanced System Growth Chart */}
      <div className="animate-fade-in hover-lift" style={{ animationDelay: '700ms' }}>
        <GlassCard className="shadow-lg">
          <SystemGrowthChart userRole={userRole || 'viewer'} region={userRegion} />
        </GlassCard>
      </div>

      {/* Enhanced Role-specific dashboard */}
      <div className="animate-fade-in" style={{ animationDelay: '800ms' }}>
        <GlassCard className="shadow-lg">
          <RoleDashboard userRole={userRole || 'viewer'} region={userRegion} />
        </GlassCard>
      </div>

      {/* Enhanced Action shortcuts and notifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '900ms' }}>
        <div className="md:col-span-2 hover-lift">
          <GlassCard className="shadow-lg">
            <ActionShortcuts userRole={userRole || undefined} />
          </GlassCard>
        </div>
        <div className="hover-lift">
          <GlassCard className="shadow-lg">
            <NotificationsPanel userRole={userRole || 'viewer'} />
          </GlassCard>
        </div>
      </div>

      {/* Enhanced Floating Action Button */}
      <FloatingActionButton
        onClick={() => setCommandPaletteOpen(true)}
        className="animate-bounce-in bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl"
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
