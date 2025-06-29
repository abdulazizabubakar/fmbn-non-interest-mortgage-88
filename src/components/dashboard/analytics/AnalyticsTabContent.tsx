
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, BarChart, Bar } from 'recharts';
import { TrendingUp, Brain, Target, Zap, Download, Filter } from 'lucide-react';

const predictiveData = [
  { month: 'Jul', predicted: 380, actual: null, confidence: 85 },
  { month: 'Aug', predicted: 420, actual: null, confidence: 82 },
  { month: 'Sep', predicted: 450, actual: null, confidence: 78 },
  { month: 'Oct', predicted: 480, actual: null, confidence: 75 }
];

const customerBehaviorData = [
  { segment: 'High Value', applications: 245, conversion: 78, satisfaction: 94 },
  { segment: 'Growing', applications: 189, conversion: 65, satisfaction: 87 },
  { segment: 'Standard', applications: 567, conversion: 52, satisfaction: 82 },
  { segment: 'At Risk', applications: 89, conversion: 34, satisfaction: 71 }
];

const marketTrendData = [
  { quarter: 'Q1 2024', property_prices: 12.5, interest_rates: 15.2, demand: 78 },
  { quarter: 'Q2 2024', property_prices: 13.8, interest_rates: 14.8, demand: 82 },
  { quarter: 'Q3 2024', property_prices: 14.2, interest_rates: 14.5, demand: 85 },
  { quarter: 'Q4 2024', property_prices: 15.1, interest_rates: 14.2, demand: 88 }
];

const AnalyticsTabContent = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('quarterly');
  const [selectedMetric, setSelectedMetric] = useState('applications');

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Advanced Analytics</h2>
          <p className="text-gray-600">Deep insights and predictive analysis for mortgage operations</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
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

      {/* Key Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Predicted Growth</p>
                <p className="text-2xl font-bold text-green-600">+15.8%</p>
                <p className="text-sm text-gray-500">Next quarter</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI Confidence</p>
                <p className="text-2xl font-bold text-blue-600">87.3%</p>
                <p className="text-sm text-gray-500">Model accuracy</p>
              </div>
              <Brain className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Optimization Score</p>
                <p className="text-2xl font-bold text-purple-600">94.2%</p>
                <p className="text-sm text-gray-500">Process efficiency</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alert Index</p>
                <p className="text-2xl font-bold text-orange-600">12</p>
                <p className="text-sm text-gray-500">Requires attention</p>
              </div>
              <Zap className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="predictive" className="space-y-4">
        <TabsList>
          <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="customer">Customer Insights</TabsTrigger>
          <TabsTrigger value="market">Market Analysis</TabsTrigger>
          <TabsTrigger value="operational">Operational Intelligence</TabsTrigger>
        </TabsList>

        <TabsContent value="predictive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Application Volume Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={predictiveData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        strokeDasharray="5 5"
                        name="Predicted Applications" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {predictiveData.map((item) => (
                    <div key={item.month} className="flex justify-between items-center text-sm">
                      <span>{item.month} 2024:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.predicted} applications</span>
                        <Badge variant="outline">{item.confidence}% confidence</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Prediction Model</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { factor: 'Payment History', impact: 85, trend: 'stable' },
                    { factor: 'Income Stability', impact: 72, trend: 'improving' },
                    { factor: 'Property Value', impact: 68, trend: 'declining' },
                    { factor: 'Economic Indicators', impact: 59, trend: 'stable' }
                  ].map((factor) => (
                    <div key={factor.factor} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{factor.factor}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{factor.impact}% impact</span>
                          <Badge variant={
                            factor.trend === 'improving' ? 'default' :
                            factor.trend === 'declining' ? 'destructive' : 'outline'
                          }>
                            {factor.trend}
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${factor.impact}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Behavior Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={customerBehaviorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="conversion" name="Conversion Rate" unit="%" />
                    <YAxis dataKey="satisfaction" name="Satisfaction" unit="%" />
                    <Tooltip 
                      formatter={(value, name) => [
                        `${value}${name === 'conversion' ? '%' : name === 'satisfaction' ? '%' : ''}`, 
                        name === 'conversion' ? 'Conversion Rate' : 
                        name === 'satisfaction' ? 'Satisfaction' : 'Applications'
                      ]}
                      labelFormatter={(label, payload) => 
                        payload?.[0]?.payload?.segment ? `Segment: ${payload[0].payload.segment}` : ''
                      }
                    />
                    <Scatter dataKey="applications" fill="#3b82f6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {customerBehaviorData.map((segment) => (
                  <div key={segment.segment} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{segment.segment}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Applications:</span>
                        <span className="font-medium">{segment.applications}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversion:</span>
                        <span className="font-medium">{segment.conversion}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Satisfaction:</span>
                        <span className="font-medium">{segment.satisfaction}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="property_prices" fill="#3b82f6" name="Property Prices (₦M)" />
                    <Bar dataKey="interest_rates" fill="#22c55e" name="Interest Rates (%)" />
                    <Bar dataKey="demand" fill="#f59e0b" name="Demand Index" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Process Efficiency Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { process: 'Application Processing', efficiency: 92, target: 90, status: 'above' },
                    { process: 'Document Verification', efficiency: 87, target: 85, status: 'above' },
                    { process: 'Credit Assessment', efficiency: 78, target: 80, status: 'below' },
                    { process: 'Disbursement', efficiency: 95, target: 90, status: 'above' }
                  ].map((metric) => (
                    <div key={metric.process} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{metric.process}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{metric.efficiency}%</span>
                          <Badge variant={metric.status === 'above' ? 'default' : 'destructive'}>
                            {metric.status === 'above' ? 'Above Target' : 'Below Target'}
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            metric.status === 'above' ? 'bg-green-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${metric.efficiency}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600">Target: {metric.target}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Benchmarks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { metric: 'Processing Time', value: '12.3 days', benchmark: '15 days', status: 'good' },
                    { metric: 'Approval Rate', value: '78.5%', benchmark: '75%', status: 'good' },
                    { metric: 'Customer Satisfaction', value: '94.2%', benchmark: '90%', status: 'excellent' },
                    { metric: 'Cost per Application', value: '₦15,200', benchmark: '₦18,000', status: 'good' }
                  ].map((benchmark) => (
                    <div key={benchmark.metric} className="border rounded-lg p-4 text-center">
                      <div className="text-sm text-gray-600 mb-1">{benchmark.metric}</div>
                      <div className="text-lg font-bold">{benchmark.value}</div>
                      <div className="text-xs text-gray-500">vs {benchmark.benchmark}</div>
                      <Badge 
                        variant={benchmark.status === 'excellent' ? 'default' : 'outline'}
                        className="mt-2"
                      >
                        {benchmark.status}
                      </Badge>
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

export default AnalyticsTabContent;
