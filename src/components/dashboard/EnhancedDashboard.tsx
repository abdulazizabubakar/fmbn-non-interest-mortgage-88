
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Home, 
  CreditCard,
  AlertTriangle,
  BarChart3,
  Activity,
  Settings,
  Bell,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { ModernMetricCard } from './enhanced/ModernMetricCard';
import { QuickActionsPanel } from './enhanced/QuickActionsPanel';
import { AnalyticsChart } from './enhanced/AnalyticsChart';

interface EnhancedDashboardProps {
  userRole: string;
  userRegion?: string;
}

const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({
  userRole,
  userRegion = 'Global'
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);

  const metricsData = [
    {
      title: 'Total Portfolio',
      value: 45800000000,
      previousValue: 42300000000,
      icon: <Home className="h-5 w-5" />,
      format: 'currency' as const,
      gradient: 'blue' as const
    },
    {
      title: 'Active Applications',
      value: 1243,
      previousValue: 1178,
      icon: <Users className="h-5 w-5" />,
      format: 'number' as const,
      gradient: 'green' as const
    },
    {
      title: 'Monthly Collections',
      value: 432800000,
      previousValue: 408500000,
      icon: <CreditCard className="h-5 w-5" />,
      format: 'currency' as const,
      gradient: 'purple' as const
    },
    {
      title: 'Processing Time',
      value: 12.3,
      previousValue: 13.5,
      icon: <Activity className="h-5 w-5" />,
      format: 'number' as const,
      gradient: 'orange' as const
    },
    {
      title: 'Completion Rate',
      value: 94.8,
      previousValue: 91.2,
      icon: <TrendingUp className="h-5 w-5" />,
      format: 'percentage' as const,
      gradient: 'green' as const
    },
    {
      title: 'Risk Alerts',
      value: 24,
      previousValue: 31,
      icon: <AlertTriangle className="h-5 w-5" />,
      format: 'number' as const,
      gradient: 'red' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-600 rounded-xl">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">FMBN Dashboard</h1>
                <p className="text-sm text-slate-600">Federal Mortgage Bank of Nigeria - {userRegion}</p>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {userRole.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center space-x-3">
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

              <Button variant="outline" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Key Metrics Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Key Performance Indicators</h2>
            {realTimeEnabled && (
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <Activity className="h-4 w-4" />
                <span>Live Updates</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {metricsData.map((metric, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ModernMetricCard {...metric} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:max-w-2xl mx-auto bg-slate-100">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="operations" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Operations
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AnalyticsChart />
              </div>
              <div>
                <QuickActionsPanel userRole={userRole} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Detailed analytics and insights will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Operations Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Operational tools and controls will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Report generation and documentation tools will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Dashboard configuration options will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
