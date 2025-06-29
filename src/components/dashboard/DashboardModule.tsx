
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LayoutDashboard, 
  BarChart3,
  Activity,
  FileText,
  Home,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

// Import existing components
import KPIGrid from './components/KPIGrid';
import DashboardCharts from './components/DashboardCharts';
import ActivityFeed from './components/ActivityFeed';
import QuickStats from './components/QuickStats';

// Import new enhanced visualizations
import PortfolioTrendsChart from './enhanced-visualizations/PortfolioTrendsChart';
import ApplicationFunnelChart from './enhanced-visualizations/ApplicationFunnelChart';
import RegionalHeatmap from './enhanced-visualizations/RegionalHeatmap';
import RiskAnalyticsDashboard from './enhanced-visualizations/RiskAnalyticsDashboard';

// Import new tab content components
import ApplicationsTabContent from './applications/ApplicationsTabContent';
import MortgagesTabContent from './mortgages/MortgagesTabContent';
import AnalyticsTabContent from './analytics/AnalyticsTabContent';

// Import sample data
import { mockKPIData, chartData, recentActivities, quickStats } from '@/data/dashboardData';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <LayoutDashboard className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  NIMMS Dashboard
                </h1>
                <p className="text-gray-600">
                  Federal Mortgage Bank of Nigeria - {userRegion}
                </p>
              </div>
            </div>
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
            
            <Button variant="outline" size="sm" className="shadow-sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            
            <Button variant="outline" size="sm" className="shadow-sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>

            <Button variant="outline" size="sm" className="shadow-sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <KPIGrid kpiData={mockKPIData} />

        {/* Main Content Tabs - Settings and Reports tabs removed */}
        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 lg:max-w-2xl bg-white border shadow-sm">
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
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Enhanced Overview with New Visualizations */}
            
            {/* Original Charts Section */}
            <DashboardCharts 
              monthlyData={chartData.monthlyPerformance}
              propertyData={chartData.propertyTypes}
              regionalData={chartData.regionalDistribution}
            />

            {/* New Enhanced Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PortfolioTrendsChart />
              <ApplicationFunnelChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RegionalHeatmap />
              <RiskAnalyticsDashboard />
            </div>

            {/* Bottom Section with Activity and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ActivityFeed activities={recentActivities} />
              </div>
              <div>
                <QuickStats stats={quickStats} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <ApplicationsTabContent />
          </TabsContent>

          <TabsContent value="mortgages">
            <MortgagesTabContent />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardModule;
