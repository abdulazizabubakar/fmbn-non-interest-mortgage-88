
import React, { useState } from 'react';
import { ModernCard, ModernCardHeader, ModernCardContent } from './ModernCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import InteractiveKPIGrid from './InteractiveKPIGrid';
import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  Calendar,
  Settings,
  Maximize2,
  Filter,
  Bell,
  Search,
  Sparkles
} from 'lucide-react';

interface DashboardLayoutProps {
  userRole: string;
  userRegion: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userRole,
  userRegion
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [notifications] = useState(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Branding & Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                  <LayoutDashboard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    FMBN Dashboard
                  </h1>
                  <p className="text-sm text-gray-600">Federal Mortgage Bank of Nigeria</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                  {userRole.replace('_', ' ').toUpperCase()}
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-medium">
                  {userRegion}
                </Badge>
              </div>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center space-x-3">
              {/* Real-time Toggle */}
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
                <Switch
                  id="realtime"
                  checked={realTimeEnabled}
                  onCheckedChange={setRealTimeEnabled}
                  size="sm"
                />
                <Label htmlFor="realtime" className="text-sm font-medium">Live</Label>
                {realTimeEnabled && (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
              </div>

              {/* Action Buttons */}
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="sm" className="relative">
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

              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-white/50 backdrop-blur border border-gray-200/50">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger 
                  value="realtime"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Real-time
                </TabsTrigger>
                <TabsTrigger 
                  value="reports"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Reports
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="overview" className="mt-0 space-y-6">
            {/* Enhanced KPI Grid */}
            <InteractiveKPIGrid 
              userRole={userRole} 
              userRegion={userRegion}
            />

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ModernCard variant="glass" className="lg:col-span-2">
                <ModernCardHeader
                  title="Recent Activity"
                  subtitle="Latest system updates and transactions"
                  icon={<Activity className="h-5 w-5" />}
                  badge={
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <Activity className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                  }
                />
                <ModernCardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg border border-gray-100">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            New mortgage application submitted
                          </p>
                          <p className="text-xs text-gray-500">
                            Application #APP-{2024 - i} • 2 minutes ago
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </ModernCardContent>
              </ModernCard>

              <ModernCard variant="gradient">
                <ModernCardHeader
                  title="Quick Actions"
                  subtitle="Common tasks and shortcuts"
                  icon={<Sparkles className="h-5 w-5" />}
                />
                <ModernCardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      New Application
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      System Settings
                    </Button>
                  </div>
                </ModernCardContent>
              </ModernCard>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <ModernCard variant="glass">
              <ModernCardHeader
                title="Advanced Analytics"
                subtitle="Deep insights and predictive analysis"
                icon={<TrendingUp className="h-5 w-5" />}
              />
              <ModernCardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Advanced analytics dashboard coming soon</p>
                  </div>
                </div>
              </ModernCardContent>
            </ModernCard>
          </TabsContent>

          <TabsContent value="realtime" className="mt-0">
            <ModernCard variant="glass">
              <ModernCardHeader
                title="Real-time Monitoring"
                subtitle="Live system status and updates"
                icon={<Activity className="h-5 w-5" />}
                badge={
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                    Live
                  </Badge>
                }
              />
              <ModernCardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Real-time monitoring dashboard</p>
                  </div>
                </div>
              </ModernCardContent>
            </ModernCard>
          </TabsContent>

          <TabsContent value="reports" className="mt-0">
            <ModernCard variant="gradient">
              <ModernCardHeader
                title="Report Center"
                subtitle="Generate and schedule reports"
                icon={<Calendar className="h-5 w-5" />}
              />
              <ModernCardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Report generation interface</p>
                  </div>
                </div>
              </ModernCardContent>
            </ModernCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardLayout;
