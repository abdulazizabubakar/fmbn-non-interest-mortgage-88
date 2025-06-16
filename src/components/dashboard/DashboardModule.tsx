import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Settings, Command } from 'lucide-react';
import { CommandPalette } from '@/components/ui/command-palette';
import EnhancedDashboard from './EnhancedDashboard';
import { 
  LayoutDashboard, 
  Sparkles as SparklesIcon, 
  TrendingUp, 
  Settings as SettingsIcon,
  BarChart3,
  Activity,
  Search,
  Command as CommandIcon
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
  const [useEnhancedDashboard, setUseEnhancedDashboard] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  
  // Show enhanced dashboard by default
  if (useEnhancedDashboard) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Enhanced Toggle Card */}
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xl">
                    Enhanced FMBN Dashboard
                  </h3>
                  <p className="text-slate-600">Modern, interactive analytics with real-time updates</p>
                </div>
                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
                  ✨ ACTIVE
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCommandPaletteOpen(true)}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
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
                  <Label htmlFor="enhanced-dashboard" className="font-semibold">
                    Enhanced Mode
                  </Label>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Customize
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <EnhancedDashboard 
          userRole={userRole || 'viewer'} 
          userRegion={userRegion} 
        />

        <CommandPalette 
          open={commandPaletteOpen} 
          onOpenChange={setCommandPaletteOpen} 
        />
      </div>
    );
  }

  // Enhanced Classic dashboard layout with FMBN branding
  return (
    <div className="space-y-6 animate-fade-in font-inter min-h-screen bg-gradient-to-br from-fmbn-light via-background to-white">
      {/* Enhanced Header with FMBN Branding */}
      <div className="space-y-4">
        <div className="flex items-center justify-between animate-slide-in-left">
          <div className="space-y-2">
            <h1 className="text-5xl font-extrabold gradient-text font-playfair flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-fmbn-primary to-fmbn-secondary rounded-xl shadow-lg">
                <LayoutDashboard className="h-10 w-10 text-white" />
              </div>
              <span>FMBN Dashboard</span>
            </h1>
            <p className="text-muted-foreground text-xl font-medium pl-16">
              Federal Mortgage Bank of Nigeria - <span className="font-bold text-fmbn-primary gradient-text">{userRegion} Region</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-4 animate-slide-in-right">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCommandPaletteOpen(true)}
              className="border-fmbn-primary/30 text-fmbn-primary hover:bg-fmbn-light hover-lift font-medium shadow-sm"
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
            <Badge variant="outline" className="bg-gradient-to-r from-fmbn-accent/20 to-yellow-50 text-fmbn-dark border-fmbn-accent/30 animate-bounce-in font-semibold">
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

      {/* Enhanced Upgrade prompt with FMBN styling */}
      <GlassCard className="animate-slide-up shadow-xl">
        <CardContent className="p-6">
          <Alert className="border-0 bg-transparent">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-fmbn-primary to-fmbn-secondary rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <AlertTitle className="text-fmbn-dark text-xl font-bold font-playfair">
                  Unlock Advanced FMBN Analytics
                </AlertTitle>
                <AlertDescription className="text-fmbn-primary font-medium text-base">
                  Experience our new interactive dashboard with real-time data, customizable widgets, AI insights, and advanced mortgage analytics.
                </AlertDescription>
              </div>
              <Button 
                onClick={() => setUseEnhancedDashboard(true)}
                className="fmbn-button-primary font-semibold"
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

      {/* Enhanced Floating Action Button with FMBN colors */}
      <FloatingActionButton
        onClick={() => setCommandPaletteOpen(true)}
        className="animate-bounce-in fmbn-button-primary shadow-xl"
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
