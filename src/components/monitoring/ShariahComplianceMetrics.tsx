
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  FileCheck, 
  Users,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ShariahComplianceMetrics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedProduct, setSelectedProduct] = useState('all');

  const overallCompliance = {
    score: 94.2,
    trend: '+2.1%',
    status: 'Excellent'
  };

  const complianceMetrics = [
    { title: "Product Compliance", value: "96.8%", icon: Shield, status: "excellent", trend: "+1.2%" },
    { title: "Documentation Compliance", value: "92.4%", icon: FileCheck, status: "good", trend: "+0.8%" },
    { title: "Process Compliance", value: "94.1%", icon: CheckCircle, status: "excellent", trend: "+1.5%" },
    { title: "Audit Compliance", value: "89.7%", icon: Users, status: "good", trend: "-0.3%" },
  ];

  const productCompliance = [
    { product: 'Murabaha', compliance: 97.2, transactions: 1245, issues: 2 },
    { product: 'Ijarah', compliance: 94.8, transactions: 892, issues: 4 },
    { product: 'Musharakah', compliance: 91.3, transactions: 634, issues: 6 },
    { product: 'Istisna', compliance: 96.1, transactions: 387, issues: 1 },
  ];

  const auditResults = [
    { area: 'Contract Terms', score: 95, status: 'Pass' },
    { area: 'Interest Prohibition', score: 98, status: 'Pass' },
    { area: 'Risk Sharing', score: 89, status: 'Pass' },
    { area: 'Asset Backing', score: 92, status: 'Pass' },
    { area: 'Documentation', score: 87, status: 'Review' },
  ];

  const complianceIssues = [
    { type: 'Documentation Gap', severity: 'Medium', count: 8, resolved: 6 },
    { type: 'Process Deviation', severity: 'Low', count: 12, resolved: 10 },
    { type: 'Contract Issue', severity: 'High', count: 2, resolved: 2 },
    { type: 'Audit Finding', severity: 'Medium', count: 5, resolved: 4 },
  ];

  const monthlyComplianceData = [
    { month: 'Jan', score: 91.2, issues: 15 },
    { month: 'Feb', score: 92.8, issues: 12 },
    { month: 'Mar', score: 93.5, issues: 10 },
    { month: 'Apr', score: 94.1, issues: 8 },
    { month: 'May', score: 93.9, issues: 9 },
    { month: 'Jun', score: 94.2, issues: 7 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'review': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="murabaha">Murabaha</SelectItem>
              <SelectItem value="ijarah">Ijarah</SelectItem>
              <SelectItem value="musharakah">Musharakah</SelectItem>
              <SelectItem value="istisna">Istisna</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overall Compliance Score */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-700">{overallCompliance.score}%</h3>
                <p className="text-muted-foreground">Overall Shariah Compliance Score</p>
                <Badge className="mt-1 bg-green-100 text-green-700">
                  {overallCompliance.trend} from last period
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2">
                {overallCompliance.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <metric.icon className={`h-6 w-6 ${getStatusColor(metric.status).split(' ')[0]}`} />
                <Badge className={getStatusColor(metric.status)}>
                  {metric.trend}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Compliance */}
        <Card>
          <CardHeader>
            <CardTitle>Product-wise Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productCompliance.map((product, index) => (
                <div key={product.product} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{product.product}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{product.compliance}%</span>
                      {product.issues > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {product.issues} issues
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Progress value={product.compliance} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {product.transactions} transactions processed
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyComplianceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Results */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Shariah Audit Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {auditResults.map((audit, index) => (
              <div key={audit.area} className="text-center p-4 border rounded-lg">
                <div className="mb-2">
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                    audit.status === 'Pass' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {audit.status === 'Pass' ? 
                      <CheckCircle className="h-6 w-6 text-green-600" /> :
                      <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    }
                  </div>
                </div>
                <h4 className="font-medium text-sm mb-1">{audit.area}</h4>
                <p className="text-2xl font-bold mb-1">{audit.score}%</p>
                <Badge variant={audit.status === 'Pass' ? 'default' : 'secondary'}>
                  {audit.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Issues */}
      <Card>
        <CardHeader>
          <CardTitle>Active Compliance Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceIssues.map((issue, index) => (
              <div key={issue.type} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`h-5 w-5 ${
                    issue.severity === 'High' ? 'text-red-500' :
                    issue.severity === 'Medium' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <div>
                    <p className="font-medium">{issue.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {issue.resolved}/{issue.count} resolved
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={(issue.resolved / issue.count) * 100} 
                    className="w-20 h-2" 
                  />
                  <Badge variant={getSeverityColor(issue.severity)}>
                    {issue.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Alerts */}
      {complianceIssues.some(issue => issue.severity === 'High' && issue.resolved < issue.count) && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Attention Required:</strong> There are high-severity compliance issues that need immediate attention.
            Please review and resolve these issues to maintain compliance standards.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ShariahComplianceMetrics;
