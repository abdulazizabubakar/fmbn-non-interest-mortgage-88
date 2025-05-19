
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, BarChart3, LineChart, Map, Users, TrendingUp } from 'lucide-react';
import PerformanceDashboard from './PerformanceDashboard';
import GeographicalInsights from './GeographicalInsights';
import CustomerAnalytics from './CustomerAnalytics';
import PredictiveInsights from './PredictiveInsights';

const AnalyticsModule = () => {
  const [activeTab, setActiveTab] = useState('performance');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const analyticsStats = [
    { title: "Mortgage Approval Rate", value: "78%", icon: TrendingUp, className: "text-green-500" },
    { title: "Active Customers", value: "2,481", icon: Users, className: "text-blue-500" },
    { title: "Avg. Processing Time", value: "14 days", icon: LineChart, className: "text-purple-500" },
    { title: "Default Rate", value: "1.2%", icon: BarChart3, className: "text-red-500" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-center space-x-4">
              <div className={`rounded-full p-2 ${stat.className} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.className}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>
            Analyze trends, visualize data, and gain strategic insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="geographical">Geographical</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="predictive">Predictive</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="space-y-4 mt-4">
              <PerformanceDashboard />
            </TabsContent>
            
            <TabsContent value="geographical" className="space-y-4 mt-4">
              <GeographicalInsights />
            </TabsContent>
            
            <TabsContent value="customers" className="space-y-4 mt-4">
              <CustomerAnalytics />
            </TabsContent>
            
            <TabsContent value="predictive" className="space-y-4 mt-4">
              <PredictiveInsights />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsModule;
