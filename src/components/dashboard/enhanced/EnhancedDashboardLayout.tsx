
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import InteractiveMetricsGrid from './InteractiveMetricsGrid';
import RealTimeDataPanel from './RealTimeDataPanel';
import CustomizableDashboard from './CustomizableDashboard';
import AdvancedFiltersPanel from './AdvancedFiltersPanel';
import DashboardHeader from './DashboardHeader';
import DashboardNavTabs from './DashboardNavTabs';

interface EnhancedDashboardLayoutProps {
  userRole: string;
  userRegion?: string;
  onCommandPaletteToggle: () => void;
}

const EnhancedDashboardLayout: React.FC<EnhancedDashboardLayoutProps> = ({
  userRole,
  userRegion = 'All Regions',
  onCommandPaletteToggle,
}) => {
  const [activeView, setActiveView] = useState('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState('30');
  const [showFilters, setShowFilters] = useState(false);
  const [dashboardLayout, setDashboardLayout] = useState('default');
  const [notifications, setNotifications] = useState(3);

  // Auto-refresh functionality
  useEffect(() => {
    if (!realTimeEnabled) return;
    
    const interval = setInterval(() => {
      console.log('Auto-refreshing dashboard data...');
      // Trigger data refresh here
    }, parseInt(refreshInterval) * 1000);
    
    return () => clearInterval(interval);
  }, [realTimeEnabled, refreshInterval]);

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 transition-all duration-300 ${
      isFullscreen ? 'fixed inset-0 z-50' : ''
    }`}>
      {/* Enhanced Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <DashboardHeader
          userRole={userRole}
          userRegion={userRegion}
          realTimeEnabled={realTimeEnabled}
          setRealTimeEnabled={setRealTimeEnabled}
          refreshInterval={refreshInterval}
          setRefreshInterval={setRefreshInterval}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          notifications={notifications}
          isFullscreen={isFullscreen}
          onFullscreenToggle={handleFullscreenToggle}
          onCommandPaletteToggle={onCommandPaletteToggle}
        />
        
        <DashboardNavTabs
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-slate-200 animate-fade-in">
          <AdvancedFiltersPanel 
            userRole={userRole}
            userRegion={userRegion}
            onFiltersChange={(filters) => console.log('Filters:', filters)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeView} className="w-full">
          <TabsContent value="overview" className="mt-0">
            <InteractiveMetricsGrid 
              userRole={userRole} 
              userRegion={userRegion}
              realTimeEnabled={realTimeEnabled}
            />
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>Deep insights and predictive analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Advanced analytics components will be rendered here</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">AI-powered insights panel</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="realtime" className="mt-0">
            <RealTimeDataPanel 
              userRole={userRole}
              userRegion={userRegion}
              refreshInterval={parseInt(refreshInterval)}
            />
          </TabsContent>

          <TabsContent value="reports" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Report Center</CardTitle>
                <CardDescription>Generate and schedule reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Report generation interface will be here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="mt-0">
            <CustomizableDashboard 
              userRole={userRole}
              layout={dashboardLayout}
              onLayoutChange={setDashboardLayout}
            />
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Settings</CardTitle>
                <CardDescription>Customize your dashboard experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme">Dark Mode</Label>
                    <Switch id="theme" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animations">Enable Animations</Label>
                    <Switch id="animations" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <Switch id="notifications" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedDashboardLayout;
