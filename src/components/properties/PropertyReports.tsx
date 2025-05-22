
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const PropertyReports = () => {
  const [reportPeriod, setReportPeriod] = useState('monthly');
  
  // Mock occupancy data
  const occupancyData = [
    { location: 'Lagos', occupiedUnits: 68, availableUnits: 12 },
    { location: 'Abuja', occupiedUnits: 54, availableUnits: 8 },
    { location: 'Kano', occupiedUnits: 42, availableUnits: 14 },
    { location: 'Rivers', occupiedUnits: 35, availableUnits: 7 },
    { location: 'Kaduna', occupiedUnits: 28, availableUnits: 5 },
  ];
  
  // Mock construction progress data
  const constructionData = [
    { month: 'Jan', completed: 12, inProgress: 24, planned: 8 },
    { month: 'Feb', completed: 18, inProgress: 22, planned: 10 },
    { month: 'Mar', completed: 24, inProgress: 18, planned: 12 },
    { month: 'Apr', completed: 32, inProgress: 14, planned: 8 },
    { month: 'May', completed: 38, inProgress: 12, planned: 6 },
  ];
  
  // Mock developer performance data
  const developerData = [
    { 
      developer: 'Unity Homes', 
      onTimeDelivery: 85, 
      qualityScore: 92, 
      customerSatisfaction: 88 
    },
    { 
      developer: 'Kabash Developers', 
      onTimeDelivery: 72, 
      qualityScore: 85, 
      customerSatisfaction: 78 
    },
    { 
      developer: 'Northern Housing', 
      onTimeDelivery: 94, 
      qualityScore: 88, 
      customerSatisfaction: 92 
    },
    { 
      developer: 'Adkan Properties', 
      onTimeDelivery: 68, 
      qualityScore: 78, 
      customerSatisfaction: 74 
    },
  ];
  
  // Mock value trend data
  const valueTrendData = [
    { month: 'Jan', averageValue: 25000000, totalValue: 850000000 },
    { month: 'Feb', averageValue: 26000000, totalValue: 884000000 },
    { month: 'Mar', averageValue: 26500000, totalValue: 901000000 },
    { month: 'Apr', averageValue: 27200000, totalValue: 925000000 },
    { month: 'May', averageValue: 28000000, totalValue: 952000000 },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="text-sm font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color || entry.stroke }}>
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Format large numbers for display
  const formatValue = (value: number) => {
    if (value >= 1000000000) {
      return `₦${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `₦${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `₦${(value / 1000).toFixed(1)}K`;
    } else {
      return `₦${value}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Property Reports</h2>
          <p className="text-muted-foreground">Analytics and metrics on property portfolio</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={reportPeriod} onValueChange={setReportPeriod}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>
      
      {/* Occupancy Rates */}
      <Card>
        <CardHeader>
          <CardTitle>Occupancy Rates by Location</CardTitle>
          <CardDescription>
            Distribution of occupied vs. available units across top locations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={occupancyData}
                margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                barSize={40}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="occupiedUnits" name="Occupied Units" stackId="a" fill="#3B82F6" />
                <Bar dataKey="availableUnits" name="Available Units" stackId="a" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Construction Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Construction Progress Trends</CardTitle>
          <CardDescription>
            Monthly tracking of completed, in-progress, and planned units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={constructionData}
                margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="completed" name="Completed Units" fill="#10B981" />
                <Bar dataKey="inProgress" name="In Progress Units" fill="#3B82F6" />
                <Bar dataKey="planned" name="Planned Units" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Developer Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Developer Performance Metrics</CardTitle>
          <CardDescription>
            Comparison of key performance indicators across developers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={developerData}
                margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="developer" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="onTimeDelivery" name="On-Time Delivery %" fill="#3B82F6" />
                <Bar dataKey="qualityScore" name="Quality Score" fill="#10B981" />
                <Bar dataKey="customerSatisfaction" name="Customer Satisfaction" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Property Value Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Property Value Trends</CardTitle>
          <CardDescription>
            Monthly trends in average and total property values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={valueTrendData}
                margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" tickFormatter={formatValue} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={formatValue} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="averageValue" 
                  name="Average Property Value" 
                  stroke="#3B82F6" 
                  activeDot={{ r: 8 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="totalValue" 
                  name="Total Portfolio Value" 
                  stroke="#10B981" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyReports;
