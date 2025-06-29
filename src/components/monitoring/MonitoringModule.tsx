
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Map, 
  Shield, 
  FileText, 
  TrendingUp,
  AlertTriangle,
  Download,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import KPIDashboards from './KPIDashboards';
import GeographicalHeatmaps from './GeographicalHeatmaps';
import ShariahComplianceMetrics from './ShariahComplianceMetrics';
import RegulatoryReporting from './RegulatoryReporting';
import AdvancedAnalytics from './AdvancedAnalytics';
import PerformanceBenchmarking from './PerformanceBenchmarking';

const MonitoringModule = () => {
  const [activeTab, setActiveTab] = useState('kpi-dashboard');

  const moduleStats = [
    { title: "Active KPIs", value: "48", icon: BarChart3, gradient: "blue" as const },
    { title: "Compliance Score", value: "94.2%", icon: Shield, gradient: "green" as const },
    { title: "Reports Generated", value: "127", icon: FileText, gradient: "purple" as const },
    { title: "Performance Index", value: "87.5", icon: TrendingUp, gradient: "orange" as const },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monitoring, Evaluation & Reporting</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive performance monitoring and regulatory compliance tracking
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {moduleStats.map((stat, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className={`rounded-full p-3 ${
                stat.gradient === 'blue' ? 'bg-blue-100' :
                stat.gradient === 'green' ? 'bg-green-100' :
                stat.gradient === 'purple' ? 'bg-purple-100' :
                'bg-orange-100'
              }`}>
                <stat.icon className={`h-6 w-6 ${
                  stat.gradient === 'blue' ? 'text-blue-600' :
                  stat.gradient === 'green' ? 'text-green-600' :
                  stat.gradient === 'purple' ? 'text-purple-600' :
                  'text-orange-600'
                }`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Monitoring & Analytics Center</CardTitle>
          <CardDescription>
            Access comprehensive monitoring tools, compliance metrics, and regulatory reporting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 grid grid-cols-3 lg:grid-cols-6 w-full bg-muted/50 p-1 rounded-lg">
              <TabsTrigger 
                value="kpi-dashboard" 
                className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
              >
                KPI Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="heatmaps" 
                className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
              >
                Geo Heatmaps
              </TabsTrigger>
              <TabsTrigger 
                value="shariah" 
                className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
              >
                Shariah Metrics
              </TabsTrigger>
              <TabsTrigger 
                value="regulatory" 
                className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
              >
                Regulatory
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="benchmarking" 
                className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
              >
                Benchmarking
              </TabsTrigger>
            </TabsList>
            
            <div className="pt-2">
              <TabsContent value="kpi-dashboard" className="mt-0">
                <KPIDashboards />
              </TabsContent>
              
              <TabsContent value="heatmaps" className="mt-0">
                <GeographicalHeatmaps />
              </TabsContent>
              
              <TabsContent value="shariah" className="mt-0">
                <ShariahComplianceMetrics />
              </TabsContent>
              
              <TabsContent value="regulatory" className="mt-0">
                <RegulatoryReporting />
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                <AdvancedAnalytics />
              </TabsContent>
              
              <TabsContent value="benchmarking" className="mt-0">
                <PerformanceBenchmarking />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringModule;
