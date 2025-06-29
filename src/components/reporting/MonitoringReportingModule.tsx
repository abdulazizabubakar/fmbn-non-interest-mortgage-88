
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  Map, 
  Shield, 
  FileText,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend
} from 'recharts';

// Mock data
const kpiMetrics = [
  { id: '1', name: 'Application Processing Time', category: 'applications', value: 12.3, target: 15, unit: 'days', trend: 'down', trendPercentage: -8.5, status: 'good', lastUpdated: '2024-01-15' },
  { id: '2', name: 'Loan Approval Rate', category: 'applications', value: 92.5, target: 90, unit: '%', trend: 'up', trendPercentage: 2.1, status: 'excellent', lastUpdated: '2024-01-15' },
  { id: '3', name: 'Collection Efficiency', category: 'repayments', value: 94.2, target: 95, unit: '%', trend: 'down', trendPercentage: -0.8, status: 'good', lastUpdated: '2024-01-15' },
  { id: '4', name: 'Default Rate', category: 'repayments', value: 2.1, target: 3, unit: '%', trend: 'down', trendPercentage: -12.5, status: 'excellent', lastUpdated: '2024-01-15' },
  { id: '5', name: 'Ownership Transfer Rate', category: 'ownership', value: 85.3, target: 80, unit: '%', trend: 'up', trendPercentage: 6.7, status: 'excellent', lastUpdated: '2024-01-15' },
  { id: '6', name: 'Shariah Compliance Score', category: 'compliance', value: 98.5, target: 95, unit: '%', trend: 'up', trendPercentage: 1.2, status: 'excellent', lastUpdated: '2024-01-15' }
];

const geographicData = [
  { region: 'Lagos', applications: 2456, approved: 2287, disbursed: 45600000000, collection: 94.2, performance: 92 },
  { region: 'Abuja', applications: 1843, approved: 1721, disbursed: 38900000000, collection: 96.1, performance: 95 },
  { region: 'Kano', applications: 1567, approved: 1434, disbursed: 28400000000, collection: 91.8, performance: 88 },
  { region: 'Rivers', applications: 1234, approved: 1156, disbursed: 24200000000, collection: 93.5, performance: 90 },
  { region: 'Oyo', applications: 1089, approved: 1001, disbursed: 21800000000, collection: 89.7, performance: 85 },
  { region: 'Kaduna', applications: 945, approved: 878, disbursed: 18600000000, collection: 92.3, performance: 89 }
];

const shariahMetrics = [
  { category: 'Contract Structure', score: 98.5, status: 'compliant', findings: 0 },
  { category: 'Profit Calculation', score: 97.2, status: 'compliant', findings: 1 },
  { category: 'Risk Sharing', score: 96.8, status: 'compliant', findings: 2 },
  { category: 'Documentation', score: 99.1, status: 'compliant', findings: 0 },
  { category: 'Asset Backing', score: 95.5, status: 'under-review', findings: 3 }
];

const regulatoryReports = [
  { id: 'CBN-001', type: 'CBN', title: 'Monthly Mortgage Lending Report', period: 'December 2024', status: 'submitted', deadline: '2024-01-15' },
  { id: 'NDIC-002', type: 'NDIC', title: 'Deposit Insurance Premium Report', period: 'Q4 2024', status: 'draft', deadline: '2024-01-20' },
  { id: 'FRCN-003', type: 'FRCN', title: 'Financial Reporting Compliance', period: 'December 2024', status: 'approved', deadline: '2024-01-10' },
  { id: 'INT-004', type: 'Internal', title: 'Risk Management Report', period: 'December 2024', status: 'draft', deadline: '2024-01-25' }
];

const MonitoringReportingModule: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-700 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'warning': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getReportStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-700';
      case 'approved': return 'bg-blue-100 text-blue-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

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
          <h1 className="text-3xl font-bold">Monitoring & Reporting</h1>
          <p className="text-muted-foreground">Comprehensive KPIs, compliance metrics, and regulatory reporting</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Dashboard
          </Button>
        </div>
      </div>

      <Tabs defaultValue="kpi" className="space-y-6">
        <TabsList>
          <TabsTrigger value="kpi">KPI Dashboard</TabsTrigger>
          <TabsTrigger value="geographic">Geographic Performance</TabsTrigger>
          <TabsTrigger value="shariah">Shariah Compliance</TabsTrigger>
          <TabsTrigger value="reports">Regulatory Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="kpi" className="space-y-6">
          {/* KPI Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">92.8%</p>
                    <p className="text-sm text-muted-foreground">Overall Performance</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600">+3.2%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">18/20</p>
                    <p className="text-sm text-muted-foreground">KPIs on Target</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-blue-500" />
                      <span className="text-xs text-blue-600">+2 improved</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">Attention Required</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingDown className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-yellow-600">2 new alerts</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* KPI Metrics Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Key Performance Indicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Metric</th>
                      <th className="text-right p-4">Current</th>
                      <th className="text-right p-4">Target</th>
                      <th className="text-right p-4">Trend</th>
                      <th className="text-center p-4">Status</th>
                      <th className="text-right p-4">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpiMetrics.map((metric) => (
                      <tr key={metric.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{metric.name}</td>
                        <td className="text-right p-4 font-semibold">
                          {metric.value}{metric.unit}
                        </td>
                        <td className="text-right p-4 text-muted-foreground">
                          {metric.target}{metric.unit}
                        </td>
                        <td className="text-right p-4">
                          <div className="flex items-center justify-end gap-1">
                            {metric.trend === 'up' ? 
                              <TrendingUp className="h-3 w-3 text-green-500" /> : 
                              <TrendingDown className="h-3 w-3 text-red-500" />
                            }
                            <span className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                              {metric.trend === 'up' ? '+' : ''}{metric.trendPercentage}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <Badge variant="outline" className={getStatusColor(metric.status)}>
                            {metric.status}
                          </Badge>
                        </td>
                        <td className="text-right p-4 text-muted-foreground text-sm">
                          {new Date(metric.lastUpdated).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                State/Regional Performance Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={geographicData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="region" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="performance" fill="#3b82f6" name="Performance Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Region</th>
                      <th className="text-right p-4">Applications</th>
                      <th className="text-right p-4">Approved</th>
                      <th className="text-right p-4">Disbursed</th>
                      <th className="text-right p-4">Collection Rate</th>
                      <th className="text-right p-4">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {geographicData.map((region, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{region.region}</td>
                        <td className="text-right p-4">{region.applications.toLocaleString()}</td>
                        <td className="text-right p-4">{region.approved.toLocaleString()}</td>
                        <td className="text-right p-4">{formatCurrency(region.disbursed)}</td>
                        <td className="text-right p-4">{region.collection}%</td>
                        <td className="text-right p-4">
                          <Badge variant="outline" className={
                            region.performance >= 90 ? 'bg-green-100 text-green-700' :
                            region.performance >= 80 ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }>
                            {region.performance}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shariah" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Shariah Compliance Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shariahMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{metric.category}</h3>
                      <Badge variant="outline" className={
                        metric.status === 'compliant' ? 'bg-green-100 text-green-700' :
                        metric.status === 'under-review' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }>
                        {metric.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Compliance Score</span>
                        <span className="font-semibold">{metric.score}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Findings</span>
                        <span className={`font-semibold ${metric.findings === 0 ? 'text-green-600' : 'text-yellow-600'}`}>
                          {metric.findings}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Regulatory Reporting Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regulatoryReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary">{report.type}</Badge>
                        <h3 className="font-medium">{report.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Period: {report.period}</span>
                        <span>Deadline: {new Date(report.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={getReportStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Generation Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">CBN Monthly Report</p>
                      <p className="text-sm text-blue-700">Due: 15th of each month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">NDIC Quarterly Report</p>
                      <p className="text-sm text-green-700">Due: 20th after quarter end</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-900">Internal Risk Report</p>
                      <p className="text-sm text-purple-700">Due: 25th of each month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-900">NDIC Report Pending</p>
                      <p className="text-sm text-yellow-700">Due in 3 days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="font-medium text-red-900">Asset Backing Review</p>
                      <p className="text-sm text-red-700">Requires immediate attention</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonitoringReportingModule;
