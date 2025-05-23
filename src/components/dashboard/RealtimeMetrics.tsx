
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BadgeDollarSign, Home, AlertTriangle, BarChart4, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface RealtimeMetricsProps {
  userRole: string;
  region?: string;
  timeframe: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}

const RealtimeMetrics: React.FC<RealtimeMetricsProps> = ({ userRole, region = 'Global', timeframe = 'monthly' }) => {
  // Mock data for application status
  const applicationStatusData = {
    new: 42,
    inReview: 58,
    approved: 23,
    rejected: 12,
    pendingDocuments: 34,
    total: 169
  };

  // Mock data for payment collection
  const paymentCollectionData = {
    today: 1850000,
    thisMonth: 36700000,
    thisQuarter: 98400000,
    byState: [
      { state: 'Lagos', amount: 12500000, percentage: 34.1 },
      { state: 'FCT Abuja', amount: 9800000, percentage: 26.7 },
      { state: 'Kano', amount: 5600000, percentage: 15.3 },
      { state: 'Rivers', amount: 4300000, percentage: 11.7 },
      { state: 'Kaduna', amount: 4500000, percentage: 12.2 },
    ],
    collectionRate: 94.3
  };

  // Mock data for default metrics
  const defaultMetricsData = {
    accountsInArrears: 86,
    valueOfArrears: 68900000,
    ageingBuckets: [
      { bucket: '1-30 days', accounts: 47, amount: 28700000 },
      { bucket: '31-60 days', accounts: 21, amount: 15400000 },
      { bucket: '61-90 days', accounts: 12, amount: 14200000 },
      { bucket: '90+ days', accounts: 6, amount: 10600000 }
    ]
  };

  // Mock data for property insights
  const propertyInsightsData = {
    occupancyRate: 87.2,
    unitsAvailable: 78,
    unitsUnderConstruction: 124,
    byState: [
      { state: 'Lagos', occupied: 145, available: 18, underConstruction: 42 },
      { state: 'FCT Abuja', occupied: 112, available: 24, underConstruction: 36 },
      { state: 'Kano', occupied: 86, available: 12, underConstruction: 18 },
      { state: 'Rivers', occupied: 68, available: 15, underConstruction: 12 },
      { state: 'Kaduna', occupied: 74, available: 9, underConstruction: 16 }
    ]
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Real-Time Metrics</CardTitle>
            <CardDescription>Key performance indicators across the system</CardDescription>
          </div>
          <span className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" /> 
            Updated: Today at {new Date().toLocaleTimeString()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <BarChart4 className="w-4 h-4" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <BadgeDollarSign className="w-4 h-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="defaults" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Defaults
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Properties
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="p-0">
            <div className="grid grid-cols-5 gap-4">
              <Card className="col-span-1">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">New</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold">{applicationStatusData.new}</span>
                    <span className="ml-2 text-sm text-muted-foreground">applications</span>
                  </div>
                  <Progress value={(applicationStatusData.new / applicationStatusData.total) * 100} className="h-1 mt-2" />
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">In Review</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold">{applicationStatusData.inReview}</span>
                    <span className="ml-2 text-sm text-muted-foreground">applications</span>
                  </div>
                  <Progress value={(applicationStatusData.inReview / applicationStatusData.total) * 100} className="h-1 mt-2" />
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">Approved</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold">{applicationStatusData.approved}</span>
                    <span className="ml-2 text-sm text-muted-foreground">applications</span>
                  </div>
                  <Progress value={(applicationStatusData.approved / applicationStatusData.total) * 100} className="h-1 mt-2" />
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">Rejected</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold">{applicationStatusData.rejected}</span>
                    <span className="ml-2 text-sm text-muted-foreground">applications</span>
                  </div>
                  <Progress value={(applicationStatusData.rejected / applicationStatusData.total) * 100} className="h-1 mt-2" />
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">Pending Docs</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold">{applicationStatusData.pendingDocuments}</span>
                    <span className="ml-2 text-sm text-muted-foreground">applications</span>
                  </div>
                  <Progress value={(applicationStatusData.pendingDocuments / applicationStatusData.total) * 100} className="h-1 mt-2" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="payments" className="p-0">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1 space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Today's Collections</h3>
                    <div className="mt-1">
                      <span className="text-2xl font-bold">{formatCurrency(paymentCollectionData.today)}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Month to Date</h3>
                    <div className="mt-1">
                      <span className="text-2xl font-bold">{formatCurrency(paymentCollectionData.thisMonth)}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Quarter to Date</h3>
                    <div className="mt-1">
                      <span className="text-2xl font-bold">{formatCurrency(paymentCollectionData.thisQuarter)}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Collection Rate</h3>
                    <div className="mt-1 flex items-baseline">
                      <span className="text-2xl font-bold">{paymentCollectionData.collectionRate}%</span>
                      <span className="ml-2 text-sm text-green-600">(Target: 90%)</span>
                    </div>
                    <Progress value={paymentCollectionData.collectionRate} className="h-1 mt-3" />
                  </CardContent>
                </Card>
              </div>
              
              <div className="col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Collections by State</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>State</TableHead>
                          <TableHead>Amount Collected</TableHead>
                          <TableHead>% of Total</TableHead>
                          <TableHead>Collection Rate</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paymentCollectionData.byState.map((item) => (
                          <TableRow key={item.state}>
                            <TableCell className="font-medium">{item.state}</TableCell>
                            <TableCell>{formatCurrency(item.amount)}</TableCell>
                            <TableCell>{item.percentage}%</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Progress value={item.percentage > 30 ? 96 : item.percentage > 20 ? 93 : 91} className="h-2 w-20" />
                                <span className="ml-2 text-sm">{item.percentage > 30 ? 96 : item.percentage > 20 ? 93 : 91}%</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="defaults" className="p-0">
            <div className="grid grid-cols-3 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Default Statistics</CardTitle>
                  <CardDescription>Accounts in arrears and amounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Accounts in Arrears</span>
                    <div className="mt-1">
                      <span className="text-2xl font-bold">{defaultMetricsData.accountsInArrears}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Value of Arrears</span>
                    <div className="mt-1">
                      <span className="text-2xl font-bold">{formatCurrency(defaultMetricsData.valueOfArrears)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Default Rate</span>
                    <div className="mt-1 flex items-baseline">
                      <span className="text-2xl font-bold">3.8%</span>
                      <span className="ml-2 text-sm text-amber-600">(Target: &lt;3%)</span>
                    </div>
                    <Progress value={3.8 / 0.03 * 100} className="h-1 mt-2" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Ageing Analysis</CardTitle>
                  <CardDescription>Default distribution by time period</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ageing Bucket</TableHead>
                        <TableHead>Accounts</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>% of Total</TableHead>
                        <TableHead>Risk Level</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {defaultMetricsData.ageingBuckets.map((bucket) => (
                        <TableRow key={bucket.bucket}>
                          <TableCell className="font-medium">{bucket.bucket}</TableCell>
                          <TableCell>{bucket.accounts}</TableCell>
                          <TableCell>{formatCurrency(bucket.amount)}</TableCell>
                          <TableCell>{(bucket.amount / defaultMetricsData.valueOfArrears * 100).toFixed(1)}%</TableCell>
                          <TableCell>
                            <Badge className={
                              bucket.bucket === '90+ days' ? 'bg-red-100 text-red-800' :
                              bucket.bucket === '61-90 days' ? 'bg-amber-100 text-amber-800' :
                              bucket.bucket === '31-60 days' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }>
                              {bucket.bucket === '90+ days' ? 'Critical' :
                               bucket.bucket === '61-90 days' ? 'High' :
                               bucket.bucket === '31-60 days' ? 'Medium' : 'Low'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="properties" className="p-0">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1 space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Occupancy Rate</h3>
                    <div className="mt-1 flex items-baseline">
                      <span className="text-2xl font-bold">{propertyInsightsData.occupancyRate}%</span>
                      <span className="ml-2 text-sm text-green-600">(Target: 85%)</span>
                    </div>
                    <Progress value={propertyInsightsData.occupancyRate} className="h-1 mt-3" />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Units Available</h3>
                    <div className="mt-1">
                      <span className="text-2xl font-bold">{propertyInsightsData.unitsAvailable}</span>
                      <span className="ml-2 text-sm text-muted-foreground">properties</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Under Construction</h3>
                    <div className="mt-1">
                      <span className="text-2xl font-bold">{propertyInsightsData.unitsUnderConstruction}</span>
                      <span className="ml-2 text-sm text-muted-foreground">units</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Property Portfolio by State</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>State</TableHead>
                          <TableHead>Occupied</TableHead>
                          <TableHead>Available</TableHead>
                          <TableHead>Under Construction</TableHead>
                          <TableHead>Occupancy Rate</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {propertyInsightsData.byState.map((item) => {
                          const totalUnits = item.occupied + item.available;
                          const occupancyRate = (item.occupied / totalUnits) * 100;
                          
                          return (
                            <TableRow key={item.state}>
                              <TableCell className="font-medium">{item.state}</TableCell>
                              <TableCell>{item.occupied}</TableCell>
                              <TableCell>{item.available}</TableCell>
                              <TableCell>{item.underConstruction}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Progress value={occupancyRate} className="h-2 w-20" />
                                  <span className="ml-2 text-sm">{occupancyRate.toFixed(1)}%</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RealtimeMetrics;
