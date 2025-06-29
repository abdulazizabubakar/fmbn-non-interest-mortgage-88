
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Home, DollarSign, Calendar, TrendingUp, AlertTriangle, Shield } from 'lucide-react';

const portfolioData = [
  { month: 'Jan', active: 1250, disbursed: 180, collected: 125 },
  { month: 'Feb', active: 1285, disbursed: 165, collected: 132 },
  { month: 'Mar', active: 1322, disbursed: 210, collected: 142 },
  { month: 'Apr', active: 1354, disbursed: 195, collected: 138 },
  { month: 'May', active: 1387, disbursed: 172, collected: 145 },
  { month: 'Jun', active: 1421, disbursed: 225, collected: 155 }
];

const paymentData = [
  { category: 'On Time', count: 1156, percentage: 81.4, color: '#22c55e' },
  { category: '1-30 Days Late', count: 187, percentage: 13.2, color: '#f59e0b' },
  { category: '31-60 Days Late', count: 45, percentage: 3.2, color: '#f97316' },
  { category: '60+ Days Late', count: 33, percentage: 2.3, color: '#ef4444' }
];

const MortgagesTabContent = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Mortgages</p>
                <p className="text-2xl font-bold">1,421</p>
                <p className="text-sm text-green-600">+34 this month</p>
              </div>
              <Home className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Portfolio Value</p>
                <p className="text-2xl font-bold">₦45.8B</p>
                <p className="text-sm text-green-600">+12.3% YoY</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Collections</p>
                <p className="text-2xl font-bold">₦1.55B</p>
                <p className="text-sm text-green-600">96.2% collection rate</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">At Risk Accounts</p>
                <p className="text-2xl font-bold">78</p>
                <p className="text-sm text-red-600">5.5% of portfolio</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="portfolio" className="space-y-4">
        <TabsList>
          <TabsTrigger value="portfolio">Portfolio Overview</TabsTrigger>
          <TabsTrigger value="payments">Payment Analysis</TabsTrigger>
          <TabsTrigger value="geographic">Geographic View</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="active" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Active Mortgages" />
                      <Area type="monotone" dataKey="disbursed" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} name="New Disbursements" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mortgage Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { status: 'Performing', count: 1156, percentage: 81.4, color: 'bg-green-500' },
                    { status: 'Watch List', count: 187, percentage: 13.2, color: 'bg-yellow-500' },
                    { status: 'Sub-Standard', count: 45, percentage: 3.2, color: 'bg-orange-500' },
                    { status: 'Non-Performing', count: 33, percentage: 2.3, color: 'bg-red-500' }
                  ].map((item) => (
                    <div key={item.status} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.status}</span>
                        <span className="text-sm text-gray-600">{item.count} ({item.percentage}%)</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Payment Status Breakdown</h4>
                  {paymentData.map((item) => (
                    <div key={item.category} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{item.count}</div>
                        <div className="text-sm text-gray-600">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Collection Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">96.2%</div>
                      <div className="text-sm text-gray-600">Collection Rate</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">₦1.55B</div>
                      <div className="text-sm text-gray-600">Monthly Collection</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">8.2</div>
                      <div className="text-sm text-gray-600">Avg Days Late</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">2.3%</div>
                      <div className="text-sm text-gray-600">Default Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { region: 'Lagos', mortgages: 425, value: '₦12.8B', performance: 94.2, growth: '+8.3%' },
                  { region: 'Abuja', mortgages: 298, value: '₦9.2B', performance: 96.1, growth: '+12.1%' },
                  { region: 'Kano', mortgages: 189, value: '₦5.8B', performance: 91.7, growth: '+6.7%' },
                  { region: 'Rivers', mortgages: 156, value: '₦4.9B', performance: 93.4, growth: '+9.2%' },
                  { region: 'Ogun', mortgages: 134, value: '₦4.1B', performance: 95.3, growth: '+7.8%' },
                  { region: 'Kaduna', mortgages: 112, value: '₦3.4B', performance: 89.6, growth: '+4.5%' }
                ].map((region) => (
                  <div key={region.region} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{region.region}</h4>
                      <Badge variant="outline" className="text-green-600">{region.growth}</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Mortgages:</span>
                        <span className="font-medium">{region.mortgages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Portfolio Value:</span>
                        <span className="font-medium">{region.value}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Performance:</span>
                        <span className="font-medium">{region.performance}%</span>
                      </div>
                    </div>
                    <Progress value={region.performance} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Risk Assessment Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'Credit Risk', level: 'Low', score: 82, accounts: 1156 },
                    { category: 'Concentration Risk', level: 'Medium', score: 65, accounts: 425 },
                    { category: 'Interest Rate Risk', level: 'Low', score: 78, accounts: 1421 },
                    { category: 'Operational Risk', level: 'Low', score: 88, accounts: 1421 }
                  ].map((risk) => (
                    <div key={risk.category} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{risk.category}</span>
                        <Badge variant={risk.level === 'Low' ? 'default' : 'outline'}>
                          {risk.level} Risk
                        </Badge>
                      </div>
                      <Progress value={risk.score} className="h-2 mb-1" />
                      <div className="text-xs text-gray-600">
                        Score: {risk.score}/100 • {risk.accounts} accounts affected
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Early Warning Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { indicator: 'Payment Delays', status: 'Watch', count: 23, trend: 'stable' },
                    { indicator: 'Income Reduction', status: 'Alert', count: 8, trend: 'increasing' },
                    { indicator: 'Property Devaluation', status: 'Normal', count: 3, trend: 'decreasing' },
                    { indicator: 'Employment Changes', status: 'Watch', count: 15, trend: 'stable' }
                  ].map((indicator) => (
                    <div key={indicator.indicator} className={`p-3 rounded-lg border-l-4 ${
                      indicator.status === 'Alert' ? 'border-red-500 bg-red-50' :
                      indicator.status === 'Watch' ? 'border-yellow-500 bg-yellow-50' :
                      'border-green-500 bg-green-50'
                    }`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-sm">{indicator.indicator}</div>
                          <div className="text-xs text-gray-600">{indicator.count} accounts • {indicator.trend}</div>
                        </div>
                        <Badge variant={
                          indicator.status === 'Alert' ? 'destructive' :
                          indicator.status === 'Watch' ? 'outline' : 'default'
                        }>
                          {indicator.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MortgagesTabContent;
