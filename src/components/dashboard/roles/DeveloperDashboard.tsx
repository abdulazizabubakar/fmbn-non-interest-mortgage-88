
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DeveloperDashboard: React.FC = () => {
  // Mock data for a property developer
  const developerSummary = {
    name: 'GreenLife Developers Ltd',
    totalProperties: 124,
    availableUnits: 28,
    occupiedUnits: 96,
    underConstructionUnits: 32,
  };

  // Mock data for property performance
  const propertyPerformanceData = [
    { month: 'Jan', sales: 4, inquiries: 15 },
    { month: 'Feb', sales: 6, inquiries: 23 },
    { month: 'Mar', sales: 8, inquiries: 28 },
    { month: 'Apr', sales: 7, inquiries: 32 },
    { month: 'May', sales: 12, inquiries: 45 },
  ];

  // Mock data for property types
  const propertyTypes = [
    { type: '2-Bedroom Apartment', units: 48, priceRange: '15M - 22M', occupancyRate: 85 },
    { type: '3-Bedroom Apartment', units: 36, priceRange: '25M - 32M', occupancyRate: 92 },
    { type: '2-Bedroom Terrace', units: 24, priceRange: '28M - 35M', occupancyRate: 75 },
    { type: '3-Bedroom Duplex', units: 16, priceRange: '45M - 55M', occupancyRate: 68 },
  ];

  // Mock data for construction projects
  const constructionProjects = [
    { 
      name: 'Greenville Estate Phase 2', 
      location: 'Lekki, Lagos',
      units: 24,
      progress: 68,
      deadline: '2025-09-15',
      status: 'on_track'
    },
    { 
      name: 'Sunrise Gardens', 
      location: 'Abuja',
      units: 18,
      progress: 45,
      deadline: '2025-12-20',
      status: 'on_track'
    },
    { 
      name: 'Riverfront Residences', 
      location: 'Port Harcourt',
      units: 12,
      progress: 22,
      deadline: '2026-04-30',
      status: 'delayed'
    },
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'on_track':
        return <Badge className="bg-green-100 text-green-800 border-green-200">On Track</Badge>;
      case 'delayed':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Delayed</Badge>;
      case 'at_risk':
        return <Badge className="bg-red-100 text-red-800 border-red-200">At Risk</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Developer Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
            <h3 className="text-2xl font-bold mt-1">{developerSummary.totalProperties}</h3>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Available Units</p>
            <h3 className="text-2xl font-bold mt-1">{developerSummary.availableUnits}</h3>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Occupancy Rate</p>
            <h3 className="text-2xl font-bold mt-1">
              {Math.round(developerSummary.occupiedUnits / (developerSummary.occupiedUnits + developerSummary.availableUnits) * 100)}%
            </h3>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Under Construction</p>
            <h3 className="text-2xl font-bold mt-1">{developerSummary.underConstructionUnits}</h3>
          </CardContent>
        </Card>
      </div>
      
      {/* Sales Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Property Performance</CardTitle>
          <CardDescription>Monthly sales and inquiries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                sales: { label: "Sales", color: "#10B981" },
                inquiries: { label: "Inquiries", color: "#3B82F6" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={propertyPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#10B981" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="inquiries" 
                    stroke="#3B82F6" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Property Types and Construction Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Property Types</CardTitle>
            <CardDescription>Distribution of property types and occupancy</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Price Range</TableHead>
                  <TableHead className="text-right">Occupancy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propertyTypes.map((property, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{property.type}</TableCell>
                    <TableCell>{property.units}</TableCell>
                    <TableCell>{property.priceRange}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span>{property.occupancyRate}%</span>
                      </div>
                      <Progress value={property.occupancyRate} className="h-1.5 mt-1" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Overall average occupancy rate: 82%
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Construction Projects</CardTitle>
            <CardDescription>Status of ongoing property developments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {constructionProjects.map((project, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">{project.location} • {project.units} units</p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(project.status)}
                      <p className="text-xs text-muted-foreground mt-1">
                        Deadline: {formatDate(project.deadline)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Construction Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Customer Feedback Section */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Satisfaction</CardTitle>
          <CardDescription>Feedback metrics for delivered properties</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { category: 'Quality', rating: 4.2 },
                    { category: 'Value', rating: 3.9 },
                    { category: 'Amenities', rating: 4.5 },
                    { category: 'Location', rating: 4.7 },
                    { category: 'Support', rating: 4.0 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis dataKey="category" />
                  <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                  <Tooltip formatter={(value) => [`${value}/5`, 'Rating']} />
                  <Bar dataKey="rating" fill="#8884d8" name="Customer Rating" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-medium">Overall Customer Satisfaction</span>
                  <span className="text-sm font-medium">4.3/5</span>
                </div>
                <Progress value={86} className="h-2" />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Recommend to others</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Maintenance Response Time</span>
                  <span>3.8/5</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Based on feedback from 86 customers in the last 12 months.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperDashboard;
