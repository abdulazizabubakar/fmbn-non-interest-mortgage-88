
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Home, 
  Shield,
  AlertTriangle,
  BarChart3,
  PieChart,
  Download
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend
} from 'recharts';

// Mock data
const cashflowData = [
  { month: 'Jan', expected: 450000000, actual: 420000000, variance: -30000000 },
  { month: 'Feb', expected: 480000000, actual: 495000000, variance: 15000000 },
  { month: 'Mar', expected: 520000000, actual: 510000000, variance: -10000000 },
  { month: 'Apr', expected: 490000000, actual: 485000000, variance: -5000000 },
  { month: 'May', expected: 550000000, actual: 575000000, variance: 25000000 },
  { month: 'Jun', expected: 580000000, actual: 560000000, variance: -20000000 }
];

const rentalProfitData = [
  { propertyType: 'Apartments', avgRent: 850000, occupancy: 92, netYield: 8.5, roi: 12.3 },
  { propertyType: 'Duplexes', avgRent: 1200000, occupancy: 88, netYield: 7.8, roi: 11.2 },
  { propertyType: 'Bungalows', avgRent: 950000, occupancy: 90, netYield: 8.1, roi: 11.8 },
  { propertyType: 'Terraced', avgRent: 750000, occupancy: 94, netYield: 9.2, roi: 13.1 }
];

const disbursementRepaymentData = [
  { period: 'Q1 2024', disbursed: 2400000000, repaid: 1800000000, collection: 92.5 },
  { period: 'Q2 2024', disbursed: 2600000000, repaid: 2100000000, collection: 94.2 },
  { period: 'Q3 2024', disbursed: 2800000000, repaid: 2350000000, collection: 93.8 },
  { period: 'Q4 2024', disbursed: 3000000000, repaid: 2500000000, collection: 91.7 }
];

const FinancialAnalyticsModule: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedView, setSelectedView] = useState('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Analytics</h1>
          <p className="text-muted-foreground">Comprehensive financial analysis and profit estimation</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
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
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(3200000000)}</p>
                <p className="text-sm text-muted-foreground">Total Collections MTD</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(2800000000)}</p>
                <p className="text-sm text-muted-foreground">Disbursements MTD</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-blue-500" />
                  <span className="text-xs text-blue-600">+8.3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Home className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8.4%</p>
                <p className="text-sm text-muted-foreground">Avg Rental Yield</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-purple-500" />
                  <span className="text-xs text-purple-600">+0.3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">15.2%</p>
                <p className="text-sm text-muted-foreground">Risk Buffer Ratio</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-orange-500" />
                  <span className="text-xs text-orange-600">-0.8%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cashflow" className="space-y-6">
        <TabsList>
          <TabsTrigger value="cashflow">Cashflow Analysis</TabsTrigger>
          <TabsTrigger value="rental">Rental Profits</TabsTrigger>
          <TabsTrigger value="disbursement">Disbursement Tracking</TabsTrigger>
          <TabsTrigger value="risk">Risk & Buffers</TabsTrigger>
        </TabsList>

        <TabsContent value="cashflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Cashflow Analysis - Expected vs Actual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cashflowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₦${(value / 1000000).toFixed(0)}M`} />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), '']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="expected"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="rgba(59, 130, 246, 0.1)"
                      name="Expected Cashflow"
                    />
                    <Area
                      type="monotone"
                      dataKey="actual"
                      stackId="2"
                      stroke="#10b981"
                      fill="rgba(16, 185, 129, 0.1)"
                      name="Actual Cashflow"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Variance Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Variance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cashflowData.slice(-3).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.month} 2024</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.expected)} expected
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${item.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.variance >= 0 ? '+' : ''}{formatCurrency(item.variance)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {((item.variance / item.expected) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Health Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Liquidity Ratio</span>
                    <Badge variant="outline" className="bg-green-100 text-green-700">
                      Healthy (2.4:1)
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Debt Service Coverage</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700">
                      Strong (3.2x)
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Collection Efficiency</span>
                    <Badge variant="outline" className="bg-green-100 text-green-700">
                      Excellent (94.2%)
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Profit Margin</span>
                    <Badge variant="outline" className="bg-purple-100 text-purple-700">
                      Good (18.5%)
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rental" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Rental Profit Estimation by Property Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Property Type</th>
                      <th className="text-right p-4">Avg Monthly Rent</th>
                      <th className="text-right p-4">Occupancy Rate</th>
                      <th className="text-right p-4">Net Yield</th>
                      <th className="text-right p-4">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentalProfitData.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{item.propertyType}</td>
                        <td className="text-right p-4">{formatCurrency(item.avgRent)}</td>
                        <td className="text-right p-4">{item.occupancy}%</td>
                        <td className="text-right p-4 text-green-600 font-semibold">{item.netYield}%</td>
                        <td className="text-right p-4 text-blue-600 font-semibold">{item.roi}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disbursement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Disbursement vs Repayment Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={disbursementRepaymentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis tickFormatter={(value) => `₦${(value / 1000000000).toFixed(1)}B`} />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), '']}
                    />
                    <Legend />
                    <Bar dataKey="disbursed" fill="#3b82f6" name="Disbursed Amount" />
                    <Bar dataKey="repaid" fill="#10b981" name="Repaid Amount" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Risk Buffers & Cost Recovery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Credit Risk Buffer</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">12.5%</p>
                    <p className="text-sm text-green-600">Above minimum requirement</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Operational Risk</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-700">8.3%</p>
                    <p className="text-sm text-yellow-600">Within acceptable range</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Market Risk</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">6.8%</p>
                    <p className="text-sm text-blue-600">Low risk exposure</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialAnalyticsModule;
