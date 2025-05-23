
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const PropertyInsights = () => {
  // Mock data for property types
  const propertyTypeData = [
    { name: 'Apartments', value: 45, color: '#3B82F6' },
    { name: 'Bungalows', value: 25, color: '#10B981' },
    { name: 'Duplexes', value: 15, color: '#8B5CF6' },
    { name: 'Terraces', value: 10, color: '#F59E0B' },
    { name: 'Mansions', value: 5, color: '#EC4899' },
  ];

  // Mock data for property status
  const propertyStatusData = [
    { name: 'Available', value: 22, color: '#10B981' },
    { name: 'Reserved', value: 18, color: '#F59E0B' },
    { name: 'Allocated', value: 35, color: '#3B82F6' },
    { name: 'Occupied', value: 25, color: '#8B5CF6' },
  ];

  // Mock data for top performing properties
  const topProperties = [
    { id: 'PROP-478', name: 'Asokoro Heights', location: 'FCT Abuja', occupancy: 98, units: 120 },
    { id: 'PROP-329', name: 'Lagos Marina Towers', location: 'Lagos', occupancy: 95, units: 85 },
    { id: 'PROP-512', name: 'Kano Residences', location: 'Kano', occupancy: 92, units: 64 },
    { id: 'PROP-187', name: 'Garden City Homes', location: 'Rivers', occupancy: 90, units: 48 },
    { id: 'PROP-249', name: 'Kaduna Terraces', location: 'Kaduna', occupancy: 89, units: 72 },
  ];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.8;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Insights</CardTitle>
        <CardDescription>Analysis of property portfolio and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-[200px]">
                <h4 className="text-sm font-medium text-center mb-2">Property Types</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={propertyTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={renderCustomizedLabel}
                    >
                      {propertyTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="h-[200px]">
                <h4 className="text-sm font-medium text-center mb-2">Property Status</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={propertyStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={renderCustomizedLabel}
                    >
                      {propertyStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">Property Portfolio Summary</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Total Properties</p>
                  <p className="text-xl font-bold">487</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Total Units</p>
                  <p className="text-xl font-bold">2,458</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Avg. Occupancy</p>
                  <p className="text-xl font-bold">87.2%</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <div>
              <h4 className="text-sm font-medium mb-3">Top Performing Properties</h4>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Units</TableHead>
                      <TableHead>Occupancy</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">{property.id}</TableCell>
                        <TableCell>{property.name}</TableCell>
                        <TableCell>{property.location}</TableCell>
                        <TableCell>{property.units}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={property.occupancy} className="h-2 w-16" />
                            <span>{property.occupancy}%</span>
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              High
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PropertyInsights;
