
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LayoutDashboard, 
  Settings, 
  Maximize2, 
  Minimize2, 
  RefreshCw, 
  Filter,
  Download,
  Bell,
  User,
  Calendar,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import InteractiveMetricsGrid from './InteractiveMetricsGrid';
import RealTimeDataPanel from './RealTimeDataPanel';
import CustomizableDashboard from './CustomizableDashboard';
import AdvancedFiltersPanel from './AdvancedFiltersPanel';

interface EnhancedDashboardLayoutProps {
  userRole: string;
  userRegion?: string;
}

const EnhancedDashboardLayout: React.FC<EnhancedDashboardLayoutProps> = ({
  userRole,
  userRegion = 'All Regions'
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
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <LayoutDashboard className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NIMMS Dashboard
              </h1>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {userRole.replace('_', ' ').toUpperCase()}
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {userRegion}
            </Badge>
          </div>

          <div className="flex items-center space-x-3">
            {/* Real-time toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="realtime"
                checked={realTimeEnabled}
                onCheckedChange={setRealTimeEnabled}
              />
              <Label htmlFor="realtime" className="text-sm">Real-time</Label>
              {realTimeEnabled && (
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>

            {/* Refresh interval */}
            <Select value={refreshInterval} onValueChange={setRefreshInterval}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10s</SelectItem>
                <SelectItem value="30">30s</SelectItem>
                <SelectItem value="60">1m</SelectItem>
                <SelectItem value="300">5m</SelectItem>
              </SelectContent>
            </Select>

            {/* Action buttons */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-blue-50 border-blue-200" : ""}
            >
              <Filter className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="relative"
            >
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {notifications}
                </Badge>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleFullscreenToggle}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>

            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 pb-2">
          <Tabs value={activeView} onValueChange={setActiveView}>
            <TabsList className="grid w-full grid-cols-6 lg:max-w-4xl bg-slate-100">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="realtime" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Real-time
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Reports
              </TabsTrigger>
              <TabsTrigger value="custom" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Custom
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
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
