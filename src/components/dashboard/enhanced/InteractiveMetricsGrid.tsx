import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Home, 
  FileCheck,
  AlertTriangle,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart as RechartsPieChart, Cell } from 'recharts';

interface InteractiveMetricsGridProps {
  userRole: string;
  userRegion: string;
  realTimeEnabled: boolean;
}

const InteractiveMetricsGrid: React.FC<InteractiveMetricsGridProps> = ({
  userRole,
  userRegion,
  realTimeEnabled
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Simulate real-time data updates
  useEffect(() => {
    if (realTimeEnabled) {
      const interval = setInterval(() => {
        setAnimationKey(prev => prev + 1);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [realTimeEnabled]);

  // Mock data that updates with animations
  const mockTrendData = [
    { name: 'Jan', value: 400 + Math.random() * 100 },
    { name: 'Feb', value: 300 + Math.random() * 100 },
    { name: 'Mar', value: 500 + Math.random() * 100 },
    { name: 'Apr', value: 600 + Math.random() * 100 },
    { name: 'May', value: 700 + Math.random() * 100 },
    { name: 'Jun', value: 800 + Math.random() * 100 },
  ];

  const pieData = [
    { name: 'Active', value: 65, color: '#10b981' },
    { name: 'Pending', value: 20, color: '#f59e0b' },
    { name: 'Completed', value: 15, color: '#3b82f6' },
  ];

  const metrics = [
    {
      id: 'portfolio',
      title: 'Total Portfolio',
      value: '₦45.8B',
      change: '+12.3%',
      trend: 'up',
      icon: DollarSign,
      description: 'Total mortgage portfolio value',
      chartType: 'line',
      color: 'blue'
    },
    {
      id: 'applications',
      title: 'Active Applications',
      value: '1,243',
      change: '+5.3%',
      trend: 'up',
      icon: FileCheck,
      description: 'Applications in progress',
      chartType: 'area',
      color: 'green'
    },
    {
      id: 'properties',
      title: 'Properties',
      value: '856',
      change: '+2.1%',
      trend: 'up',
      icon: Home,
      description: 'Registered properties',
      chartType: 'line',
      color: 'purple'
    },
    {
      id: 'users',
      title: 'Active Users',
      value: '2,841',
      change: '+8.7%',
      trend: 'up',
      icon: Users,
      description: 'Monthly active users',
      chartType: 'area',
      color: 'indigo'
    },
    {
      id: 'completion',
      title: 'Completion Rate',
      value: '87.5%',
      change: '+3.2%',
      trend: 'up',
      icon: Target,
      description: 'Process completion rate',
      chartType: 'progress',
      color: 'emerald'
    },
    {
      id: 'alerts',
      title: 'Active Alerts',
      value: '24',
      change: '-15.8%',
      trend: 'down',
      icon: AlertTriangle,
      description: 'System alerts',
      chartType: 'pie',
      color: 'red'
    }
  ];

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      indigo: 'text-indigo-600 bg-indigo-100',
      emerald: 'text-emerald-600 bg-emerald-100',
      red: 'text-red-600 bg-red-100'
    };
    return colors[color as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const renderMiniChart = (metric: any) => {
    switch (metric.chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={40}>
            <LineChart data={mockTrendData} key={animationKey}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={`var(--${metric.color}-500)`}
                strokeWidth={2}
                dot={false}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={40}>
            <AreaChart data={mockTrendData} key={animationKey}>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={`var(--${metric.color}-500)`}
                fill={`var(--${metric.color}-200)`}
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'progress':
        return (
          <Progress 
            value={parseFloat(metric.value)} 
            className="h-2 mt-2"
            key={animationKey}
          />
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={40}>
            <RechartsPieChart key={animationKey}>
              <RechartsPieChart data={pieData}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </RechartsPieChart>
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isSelected = selectedMetric === metric.id;
          
          return (
            <Card 
              key={metric.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                isSelected ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''
              }`}
              onClick={() => setSelectedMetric(isSelected ? null : metric.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${getIconColor(metric.color)}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="font-medium text-sm text-gray-600">{metric.title}</h3>
                      {realTimeEnabled && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={metric.trend === 'up' ? 'default' : 'secondary'}
                          className={`text-xs ${
                            metric.trend === 'up' 
                              ? 'bg-green-100 text-green-700 border-green-200' 
                              : 'bg-red-100 text-red-700 border-red-200'
                          }`}
                        >
                          {metric.trend === 'up' ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {metric.change}
                        </Badge>
                        {realTimeEnabled && (
                          <div className="flex items-center space-x-1">
                            <Activity className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-green-600">Live</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  {renderMiniChart(metric)}
                </div>
                
                <p className="text-xs text-gray-500 mt-2">{metric.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed View for Selected Metric */}
      {selectedMetric && (
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Detailed View: {metrics.find(m => m.id === selectedMetric)?.title}</CardTitle>
                <CardDescription>Interactive analysis and trends</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedMetric(null)}
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockTrendData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveMetricsGrid;
