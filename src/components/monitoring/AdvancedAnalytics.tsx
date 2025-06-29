
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Brain, 
  Target, 
  Users, 
  BarChart3,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, BarChart, Bar } from 'recharts';

const AdvancedAnalytics = () => {
  const [selectedModel, setSelectedModel] = useState('approval-prediction');
  const [selectedTimeframe, setSelectedTimeframe] = useState('3months');

  const predictionModels = [
    {
      name: 'Application Approval Prediction',
      id: 'approval-prediction',
      accuracy: 87.3,
      status: 'active',
      lastTrained: '2024-01-10',
      predictions: 1245
    },
    {
      name: 'Default Risk Assessment',
      id: 'default-risk',
      accuracy: 82.1,
      status: 'active', 
      lastTrained: '2024-01-08',
      predictions: 892
    },
    {
      name: 'Customer Behavior Analysis',
      id: 'customer-behavior',
      accuracy: 79.4,
      status: 'training',
      lastTrained: '2024-01-05',
      predictions: 634
    },
    {
      name: 'Market Trend Prediction',
      id: 'market-trends',
      accuracy: 74.8,
      status: 'inactive',
      lastTrained: '2024-01-01',
      predictions: 287
    }
  ];

  const approvalPredictionData = [
    { creditScore: 650, income: 45000, prediction: 0.3, actual: 0 },
    { creditScore: 720, income: 65000, prediction: 0.75, actual: 1 },
    { creditScore: 680, income: 52000, prediction: 0.55, actual: 1 },
    { creditScore: 750, income: 85000, prediction: 0.92, actual: 1 },
    { creditScore: 620, income: 38000, prediction: 0.15, actual: 0 },
    { creditScore: 690, income: 58000, prediction: 0.68, actual: 1 },
  ];

  const riskAssessmentData = [
    { month: 'Jan', predicted: 12, actual: 14 },
    { month: 'Feb', predicted: 8, actual: 9 },
    { month: 'Mar', predicted: 15, actual: 13 },
    { month: 'Apr', predicted: 11, actual: 12 },
    { month: 'May', predicted: 7, actual: 8 },
    { month: 'Jun', predicted: 9, actual: 7 },
  ];

  const customerSegments = [
    { segment: 'High Value', size: 342, conversionRate: 84.2, avgLoanSize: 2.3 },
    { segment: 'Growing Professional', size: 567, conversionRate: 72.1, avgLoanSize: 1.8 },
    { segment: 'First Time Buyer', size: 891, conversionRate: 68.4, avgLoanSize: 1.2 },
    { segment: 'Refinancing', size: 234, conversionRate: 91.3, avgLoanSize: 2.8 },
  ];

  const marketInsights = [
    { metric: 'Application Volume Trend', prediction: '+15%', confidence: 78, timeframe: 'Next Quarter' },
    { metric: 'Interest Rate Impact', prediction: '-8%', confidence: 85, timeframe: 'Next 6 Months' },
    { metric: 'Regional Growth', prediction: '+22%', confidence: 72, timeframe: 'Lagos/Abuja' },
    { metric: 'Product Demand', prediction: '+12%', confidence: 81, timeframe: 'Murabaha' },
  ];

  const getModelStatus = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'training':
        return <Badge className="bg-blue-100 text-blue-800"><Brain className="h-3 w-3 mr-1" />Training</Badge>;
      case 'inactive':
        return <Badge variant="secondary"><AlertTriangle className="h-3 w-3 mr-1" />Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {predictionModels.map(model => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button>
          <Brain className="h-4 w-4 mr-2" />
          Retrain Models
        </Button>
      </div>

      {/* Model Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {predictionModels.map((model, index) => (
          <Card key={model.id} className={`hover:shadow-md transition-shadow ${selectedModel === model.id ? 'ring-2 ring-blue-500' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Brain className="h-6 w-6 text-blue-600" />
                {getModelStatus(model.status)}
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">{model.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Accuracy</span>
                  <span className="text-sm font-bold">{model.accuracy}%</span>
                </div>
                <Progress value={model.accuracy} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {model.predictions} predictions • Last trained: {model.lastTrained}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prediction Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Model Performance Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedModel === 'approval-prediction' && (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={approvalPredictionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="creditScore" />
                    <YAxis dataKey="prediction" />
                    <Tooltip />
                    <Scatter dataKey="prediction" fill="#3b82f6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            )}
            {selectedModel === 'default-risk' && (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskAssessmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="predicted" fill="#3b82f6" />
                    <Bar dataKey="actual" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Customer Segmentation */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Behavior Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerSegments.map((segment, index) => (
                <div key={segment.segment} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{segment.segment}</h5>
                    <Badge variant="outline">{segment.size} customers</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Conversion Rate</span>
                      <p className="font-medium">{segment.conversionRate}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg Loan Size</span>
                      <p className="font-medium">₦{segment.avgLoanSize}M</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Predictive Market Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketInsights.map((insight, index) => (
              <div key={insight.metric} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <div className="text-right">
                    <span className={`text-lg font-bold ${
                      insight.prediction.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {insight.prediction}
                    </span>
                  </div>
                </div>
                <h5 className="font-medium text-sm mb-1">{insight.metric}</h5>
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                  <span>{insight.timeframe}</span>
                  <span>{insight.confidence}% confidence</span>
                </div>
                <Progress value={insight.confidence} className="h-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scenario Planning */}
      <Card>
        <CardHeader>
          <CardTitle>What-If Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Interest Rate Changes</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">+1% Rate Increase</span>
                  <span className="text-sm font-medium text-red-600">-12% Applications</span>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">-0.5% Rate Decrease</span>
                  <span className="text-sm font-medium text-green-600">+8% Applications</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Economic Scenarios</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">Recession Impact</span>
                  <span className="text-sm font-medium text-red-600">-25% Volume</span>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">Growth Scenario</span>
                  <span className="text-sm font-medium text-green-600">+18% Volume</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Competitive Response</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">Market Share Loss</span>
                  <span className="text-sm font-medium text-red-600">-15% Revenue</span>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">Market Leadership</span>
                  <span className="text-sm font-medium text-green-600">+22% Revenue</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalytics;
