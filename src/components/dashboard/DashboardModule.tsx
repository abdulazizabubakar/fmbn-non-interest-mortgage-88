
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Settings,
  BarChart3,
  Activity,
  Users,
  FileText,
  CreditCard,
  Home,
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  Bell,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface DashboardModuleProps {
  userRole: string | null;
  userRegion?: string;
}

const DashboardModule: React.FC<DashboardModuleProps> = ({ 
  userRole,
  userRegion = 'All Regions'
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [activeView, setActiveView] = useState('overview');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock KPI data
  const kpiData = [
    {
      title: 'Total Applications',
      value: '2,456',
      change: '+12.5%',
      trend: 'up',
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Active Mortgages',
      value: '1,843',
      change: '+8.2%',
      trend: 'up',
      icon: Home,
      color: 'green'
    },
    {
      title: 'Monthly Collections',
      value: '₦4.2B',
      change: '+15.3%',
      trend: 'up',
      icon: CreditCard,
      color: 'purple'
    },
    {
      title: 'Portfolio Value',
      value: '₦87.5B',
      change: '+6.7%',
      trend: 'up',
      icon: TrendingUp,
      color: 'orange'
    },
    {
      title: 'Active Users',
      value: '3,204',
      change: '+4.1%',
      trend: 'up',
      icon: Users,
      color: 'pink'
    },
    {
      title: 'Risk Alerts',
      value: '23',
      change: '-18.2%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  const getKpiCardColor = (color: string) => {
    const colors = {
      blue: 'border-l-blue-500 bg-blue-50/50',
      green: 'border-l-green-500 bg-green-50/50',
      purple: 'border-l-purple-500 bg-purple-50/50',
      orange: 'border-l-orange-500 bg-orange-50/50',
      pink: 'border-l-pink-500 bg-pink-50/50',
      red: 'border-l-red-500 bg-red-50/50'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600',
      pink: 'text-pink-600',
      red: 'text-red-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <LayoutDashboard className="h-8 w-8 text-white" />
              </div>
              NIMMS Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Federal Mortgage Bank of Nigeria - {userRegion}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="auto-refresh"
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
              />
              <Label htmlFor="auto-refresh" className="text-sm font-medium">
                Auto Refresh
              </Label>
              {autoRefresh && (
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
            
            <Select value={selectedTimeframe} onValueChange={(value: any) => setSelectedTimeframe(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {kpiData.map((kpi, index) => {
            const IconComponent = kpi.icon;
            return (
              <Card 
                key={index} 
                className={`border-l-4 ${getKpiCardColor(kpi.color)} transition-all duration-200 hover:shadow-md`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <IconComponent className={`h-6 w-6 ${getIconColor(kpi.color)}`} />
                    <span className={`text-sm font-medium ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {kpi.value}
                    </p>
                    <p className="text-sm text-gray-600">
                      {kpi.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 lg:max-w-4xl bg-white border">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="mortgages" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Mortgages
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Portfolio Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Interactive chart will be rendered here</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">Approval Rate</span>
                    <span className="font-semibold text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">Avg. Processing Time</span>
                    <span className="font-semibold">12.3 days</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">Default Rate</span>
                    <span className="font-semibold text-red-600">2.1%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Collection Rate</span>
                    <span className="font-semibold text-blue-600">97.8%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Application #{2000 + item} submitted</p>
                        <p className="text-xs text-gray-500">{item} minutes ago</p>
                      </div>
                      <Badge variant="outline">New</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Application Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Application management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mortgages">
            <Card>
              <CardHeader>
                <CardTitle>Mortgage Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Mortgage portfolio management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Advanced analytics and reporting tools will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Report generation and documentation tools will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Auto Refresh</h3>
                      <p className="text-sm text-gray-600">Automatically refresh dashboard data</p>
                    </div>
                    <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Dark Mode</h3>
                      <p className="text-sm text-gray-600">Switch to dark theme</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notifications</h3>
                      <p className="text-sm text-gray-600">Enable push notifications</p>
                    </div>
                    <Switch defaultChecked />
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

export default DashboardModule;
