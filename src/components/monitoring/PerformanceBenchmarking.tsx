
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const PerformanceBenchmarking = () => {
  const [selectedBenchmark, setSelectedBenchmark] = useState('industry');
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly');

  const benchmarkMetrics = [
    {
      metric: 'Application Processing Time',
      current: 14.2,
      industry: 18.5,
      historical: 16.8,
      target: 12.0,
      unit: 'days',
      trend: 'improving'
    },
    {
      metric: 'Approval Rate',
      current: 76.3,
      industry: 72.1,
      historical: 74.2,
      target: 80.0,
      unit: '%',
      trend: 'improving'
    },
    {
      metric: 'Customer Satisfaction',
      current: 4.2,
      industry: 3.9,
      historical: 4.0,
      target: 4.5,
      unit: '/5',
      trend: 'improving'
    },
    {
      metric: 'Default Rate',
      current: 2.3,
      industry: 3.1,
      historical: 2.8,
      target: 2.0,
      unit: '%',
      trend: 'improving'
    },
    {
      metric: 'Cost per Application',
      current: 4200,
      industry: 4800,
      historical: 4500,
      target: 3800,
      unit: '₦',
      trend: 'improving'
    },
    {
      metric: 'Digital Adoption Rate',
      current: 68.4,
      industry: 62.1,
      historical: 61.2,
      target: 75.0,
      unit: '%',
      trend: 'improving'
    }
  ];

  const competitorComparison = [
    { name: 'FMBN', processTime: 14.2, approvalRate: 76.3, satisfaction: 4.2 },
    { name: 'Bank A', processTime: 16.8, approvalRate: 74.1, satisfaction: 3.9 },
    { name: 'Bank B', processTime: 19.2, approvalRate: 71.5, satisfaction: 3.7 },
    { name: 'Bank C', processTime: 21.5, approvalRate: 69.8, satisfaction: 3.8 },
    { name: 'Industry Avg', processTime: 18.5, approvalRate: 72.1, satisfaction: 3.9 },
  ];

  const performanceScores = [
    { category: 'Efficiency', current: 85, industry: 72, target: 90 },
    { category: 'Quality', current: 78, industry: 75, target: 85 },
    { category: 'Customer Experience', current: 82, industry: 77, target: 88 },
    { category: 'Innovation', current: 71, industry: 68, target: 80 },
    { category: 'Risk Management', current: 88, industry: 79, target: 92 },
    { category: 'Compliance', current: 94, industry: 86, target: 96 },
  ];

  const monthlyTrends = [
    { month: 'Jan', FMBN: 76.3, Industry: 72.1, Target: 80.0 },
    { month: 'Feb', FMBN: 77.1, Industry: 72.3, Target: 80.0 },
    { month: 'Mar', FMBN: 75.8, Industry: 71.9, Target: 80.0 },
    { month: 'Apr', FMBN: 78.2, Industry: 72.5, Target: 80.0 },
    { month: 'May', FMBN: 76.9, Industry: 72.0, Target: 80.0 },
    { month: 'Jun', FMBN: 79.1, Industry: 72.8, Target: 80.0 },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPerformanceStatus = (current: number, target: number, isLowerBetter = false) => {
    const difference = isLowerBetter ? target - current : current - target;
    const percentage = Math.abs(difference / target * 100);
    
    if (isLowerBetter) {
      if (current <= target) return { status: 'exceeds', color: 'text-green-600', icon: ArrowUpRight };
      if (percentage <= 10) return { status: 'meets', color: 'text-blue-600', icon: Minus };
      return { status: 'below', color: 'text-red-600', icon: ArrowDownRight };
    } else {
      if (current >= target) return { status: 'exceeds', color: 'text-green-600', icon: ArrowUpRight };
      if (percentage <= 10) return { status: 'meets', color: 'text-blue-600', icon: Minus };
      return { status: 'below', color: 'text-red-600', icon: ArrowDownRight };
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <Select value={selectedBenchmark} onValueChange={setSelectedBenchmark}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="industry">Industry Average</SelectItem>
              <SelectItem value="competitors">Top Competitors</SelectItem>
              <SelectItem value="historical">Historical Performance</SelectItem>
              <SelectItem value="targets">Internal Targets</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {benchmarkMetrics.map((metric, index) => {
          const isLowerBetter = metric.metric.includes('Time') || metric.metric.includes('Cost') || metric.metric.includes('Default');
          const status = getPerformanceStatus(metric.current, metric.target, isLowerBetter);
          
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{metric.metric}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">
                        {metric.current}{metric.unit}
                      </span>
                      {getTrendIcon(metric.trend)}
                    </div>
                  </div>
                  <status.icon className={`h-5 w-5 ${status.color}`} />
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">vs Industry:</span>
                    <span className={metric.current > metric.industry ? 'text-green-600' : 'text-red-600'}>
                      {metric.industry}{metric.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">vs Target:</span>
                    <span className={status.color}>
                      {metric.target}{metric.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Historical:</span>
                    <span>{metric.historical}{metric.unit}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <Progress 
                    value={isLowerBetter ? 
                      Math.max(0, 100 - (metric.current / metric.target * 100)) :
                      Math.min(100, (metric.current / metric.target * 100))
                    } 
                    className="h-2" 
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Scorecard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performanceScores}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Industry" dataKey="industry" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                  <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Competitive Benchmarking */}
        <Card>
          <CardHeader>
            <CardTitle>Competitive Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={competitorComparison} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="approvalRate" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends vs Benchmarks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="FMBN" fill="#3b82f6" name="FMBN Performance" />
                <Bar dataKey="Industry" fill="#ef4444" name="Industry Average" />
                <Bar dataKey="Target" fill="#10b981" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Rankings and Awards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Performance Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h5 className="font-medium">Processing Efficiency</h5>
                  <p className="text-sm text-muted-foreground">Among Nigerian Mortgage Banks</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">
                  #2 of 15
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h5 className="font-medium">Customer Satisfaction</h5>
                  <p className="text-sm text-muted-foreground">Industry Leadership</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  #1 of 15
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h5 className="font-medium">Digital Innovation</h5>
                  <p className="text-sm text-muted-foreground">Technology Adoption</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  #3 of 15
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Improvement Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-l-orange-500 pl-4">
                <h5 className="font-medium">Digital Adoption</h5>
                <p className="text-sm text-muted-foreground mb-2">
                  7% gap to target - Focus on mobile app usage
                </p>
                <Progress value={68.4 / 75 * 100} className="h-2" />
              </div>
              
              <div className="border-l-4 border-l-orange-500 pl-4">
                <h5 className="font-medium">Processing Speed</h5>
                <p className="text-sm text-muted-foreground mb-2">
                  2.2 days above target - Streamline verification
                </p>
                <Progress value={12 / 14.2 * 100} className="h-2" />
              </div>
              
              <div className="border-l-4 border-l-green-500 pl-4">
                <h5 className="font-medium">Cost Efficiency</h5>
                <p className="text-sm text-muted-foreground mb-2">
                  ₦400 below industry average - Maintain lead
                </p>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceBenchmarking;
