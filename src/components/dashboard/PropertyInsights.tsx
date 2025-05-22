
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const PropertyInsights: React.FC = () => {
  // Mock data for property distribution
  const propertyTypeData = [
    { name: 'Apartment', value: 45, color: '#3B82F6' },
    { name: 'Bungalow', value: 25, color: '#10B981' },
    { name: 'Duplex', value: 20, color: '#6366F1' },
    { name: 'Terrace', value: 8, color: '#F59E0B' },
    { name: 'Mansion', value: 2, color: '#EC4899' },
  ];

  const propertyStatusData = [
    { name: 'Occupied', value: 68, color: '#10B981' },
    { name: 'Available', value: 12, color: '#3B82F6' },
    { name: 'Under Construction', value: 15, color: '#F59E0B' },
    { name: 'Under Maintenance', value: 5, color: '#9CA3AF' },
  ];

  const propertyByValueRange = [
    { range: 'Under ₦5M', count: 15, color: '#BFDBFE' },
    { range: '₦5M - ₦15M', count: 38, color: '#93C5FD' },
    { range: '₦15M - ₦25M', count: 55, color: '#60A5FA' },
    { range: '₦25M - ₦50M', count: 42, color: '#3B82F6' },
    { range: '₦50M - ₦100M', count: 28, color: '#2563EB' },
    { range: 'Over ₦100M', count: 12, color: '#1D4ED8' },
  ];

  const topDevelopers = [
    { name: 'ABC Properties', properties: 42, occupancy: 92 },
    { name: 'LekkiHomes Ltd', properties: 36, occupancy: 88 },
    { name: 'Abuja Estates', properties: 28, occupancy: 95 },
    { name: 'GreenLife Construction', properties: 24, occupancy: 79 },
    { name: 'BluePrint Developers', properties: 18, occupancy: 84 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Property Portfolio</CardTitle>
            <CardDescription>Distribution and insights about mortgage properties</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="type">
              <TabsList className="mb-4">
                <TabsTrigger value="type">Property Types</TabsTrigger>
                <TabsTrigger value="status">Property Status</TabsTrigger>
                <TabsTrigger value="value">Value Distribution</TabsTrigger>
              </TabsList>
              
              <TabsContent value="type" className="space-y-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={propertyTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {propertyTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend verticalAlign="bottom" height={36} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="status" className="space-y-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={propertyStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {propertyStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend verticalAlign="bottom" height={36} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="text-sm text-center text-muted-foreground">
                  Overall occupancy rate: <Badge variant="outline">87%</Badge>
                </div>
              </TabsContent>
              
              <TabsContent value="value" className="space-y-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={propertyByValueRange}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} properties`, 'Count']}
                        labelFormatter={(label) => `Value Range: ${label}`}
                      />
                      <Bar dataKey="count" name="Properties">
                        {propertyByValueRange.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Developers</CardTitle>
            <CardDescription>Most active property developers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topDevelopers.map((developer, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{developer.name}</span>
                    <span className="text-muted-foreground text-sm">{developer.properties} properties</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Occupancy</span>
                      <span>{developer.occupancy}%</span>
                    </div>
                    <Progress value={developer.occupancy} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyInsights;
