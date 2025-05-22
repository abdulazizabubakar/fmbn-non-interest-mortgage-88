
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';

interface ZonalDashboardProps {
  region: string;
}

const ZonalDashboard: React.FC<ZonalDashboardProps> = ({ region }) => {
  // Mock data for zonal performance
  const zonalPerformance = {
    'North Central': {
      totalMortgages: 287,
      activeApplications: 42,
      collections: 92000000,
      collectionRate: 94.2,
      defaultRate: 2.3,
      topPerformingState: 'FCT',
      targetAchievement: 97,
    },
    'North East': {
      totalMortgages: 143,
      activeApplications: 28,
      collections: 45000000,
      collectionRate: 87.4,
      defaultRate: 4.8,
      topPerformingState: 'Bauchi',
      targetAchievement: 82,
    },
    'North West': {
      totalMortgages: 218,
      activeApplications: 35,
      collections: 76000000,
      collectionRate: 91.2,
      defaultRate: 3.1,
      topPerformingState: 'Kano',
      targetAchievement: 93,
    },
    'South East': {
      totalMortgages: 185,
      activeApplications: 31,
      collections: 67000000,
      collectionRate: 89.7,
      defaultRate: 3.5,
      topPerformingState: 'Enugu',
      targetAchievement: 88,
    },
    'South South': {
      totalMortgages: 203,
      activeApplications: 38,
      collections: 73000000,
      collectionRate: 92.8,
      defaultRate: 2.8,
      topPerformingState: 'Rivers',
      targetAchievement: 94,
    },
    'South West': {
      totalMortgages: 312,
      activeApplications: 48,
      collections: 105000000,
      collectionRate: 95.3,
      defaultRate: 2.1,
      topPerformingState: 'Lagos',
      targetAchievement: 98,
    },
    'All Regions': {
      totalMortgages: 1348,
      activeApplications: 222,
      collections: 458000000,
      collectionRate: 92.4,
      defaultRate: 3.0,
      topPerformingState: 'Lagos',
      targetAchievement: 93,
    },
  };
  
  // Get the data for the selected region
  const regionData = zonalPerformance[region as keyof typeof zonalPerformance] || zonalPerformance['All Regions'];
  
  // Mock data for state performance within the region
  const statePerformance = {
    'North Central': [
      { name: 'FCT', mortgages: 85, collection: 97, default: 1.8 },
      { name: 'Niger', mortgages: 42, collection: 92, default: 2.5 },
      { name: 'Kogi', mortgages: 38, collection: 89, default: 3.2 },
      { name: 'Benue', mortgages: 46, collection: 94, default: 2.2 },
      { name: 'Plateau', mortgages: 35, collection: 93, default: 2.7 },
      { name: 'Nasarawa', mortgages: 41, collection: 95, default: 1.9 },
    ],
    'South West': [
      { name: 'Lagos', mortgages: 124, collection: 97, default: 1.5 },
      { name: 'Ogun', mortgages: 56, collection: 95, default: 2.2 },
      { name: 'Oyo', mortgages: 45, collection: 92, default: 2.8 },
      { name: 'Osun', mortgages: 32, collection: 94, default: 2.5 },
      { name: 'Ekiti', mortgages: 28, collection: 93, default: 2.4 },
      { name: 'Ondo', mortgages: 27, collection: 94, default: 2.3 },
    ],
    'All Regions': [
      { name: 'Lagos', mortgages: 124, collection: 97, default: 1.5 },
      { name: 'FCT', mortgages: 85, collection: 97, default: 1.8 },
      { name: 'Rivers', mortgages: 68, collection: 96, default: 2.0 },
      { name: 'Kano', mortgages: 62, collection: 93, default: 2.6 },
      { name: 'Ogun', mortgages: 56, collection: 95, default: 2.2 },
    ]
  };
  
  // Get state performance for the selected region or a default
  const states = statePerformance[region as keyof typeof statePerformance] || 
    statePerformance['All Regions'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Mock data for application status in the region
  const applicationStatusData = [
    { name: 'Draft', value: 12, color: '#E5E5E5' },
    { name: 'Submitted', value: 18, color: '#93C5FD' },
    { name: 'In Review', value: 14, color: '#60A5FA' },
    { name: 'Approved', value: 15, color: '#34D399' },
    { name: 'Rejected', value: 5, color: '#F87171' },
  ];

  return (
    <div className="space-y-6">
      {/* Region Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Total Mortgages</p>
            <div className="flex items-baseline justify-between mt-1">
              <h3 className="text-2xl font-bold">{regionData.totalMortgages}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Active Applications</p>
            <div className="flex items-baseline justify-between mt-1">
              <h3 className="text-2xl font-bold">{regionData.activeApplications}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Collection Rate</p>
            <div className="flex items-baseline justify-between mt-1">
              <h3 className="text-2xl font-bold">{regionData.collectionRate}%</h3>
              <Badge variant={regionData.collectionRate >= 90 ? "default" : "outline"}>
                {regionData.collectionRate >= 90 ? 'Excellent' : 'Good'}
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Target Achievement</p>
            <h3 className="text-2xl font-bold mt-1">{regionData.targetAchievement}%</h3>
            <Progress value={regionData.targetAchievement} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* State Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>State Performance</CardTitle>
          <CardDescription>
            {region === 'All Regions' 
              ? 'Top performing states across all regions' 
              : `Performance metrics for states in the ${region} region`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>State</TableHead>
                <TableHead className="text-right">Mortgages</TableHead>
                <TableHead className="text-right">Collection %</TableHead>
                <TableHead className="text-right">Default %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {states.map((state) => (
                <TableRow key={state.name}>
                  <TableCell className="font-medium">{state.name}</TableCell>
                  <TableCell className="text-right">{state.mortgages}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={state.collection >= 95 ? "default" : "outline"}>
                      {state.collection}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      variant={state.default <= 2 ? "default" : state.default <= 3 ? "outline" : "secondary"}
                      className={state.default <= 2 ? 'bg-green-100 text-green-800' : 
                        state.default <= 3 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}
                    >
                      {state.default}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Application Status Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>Current application statistics in the region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  applications: { label: "Applications", color: "#60A5FA" },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={applicationStatusData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}`, 'Applications']} />
                    <Bar dataKey="value" name="Applications">
                      {applicationStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Collection Summary</CardTitle>
            <CardDescription>Monthly collection performance in {region}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monthly Target</span>
                  <span>{formatCurrency(regionData.collections * 0.1)}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Collected</span>
                    <span>{formatCurrency(regionData.collections * 0.092)}</span>
                  </div>
                  <Progress value={92} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>92% of target</span>
                    <span>Due date: 30 May, 2025</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Collection Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Bank Transfer</span>
                    <span>64%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Direct Debit</span>
                    <span>28%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Online Payment</span>
                    <span>8%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ZonalDashboard;
