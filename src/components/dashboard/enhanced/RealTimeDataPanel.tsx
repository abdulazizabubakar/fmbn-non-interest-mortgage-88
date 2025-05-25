import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Zap, 
  Users, 
  TrendingUp, 
  Bell, 
  RefreshCw,
  Play,
  Pause,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

interface RealTimeDataPanelProps {
  userRole: string;
  userRegion: string;
  refreshInterval: number;
}

const RealTimeDataPanel: React.FC<RealTimeDataPanelProps> = ({
  userRole,
  userRegion,
  refreshInterval
}) => {
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [liveData, setLiveData] = useState([]);
  const [systemStatus, setSystemStatus] = useState('operational');
  const [activeUsers, setActiveUsers] = useState(2841);
  const [processingQueue, setProcessingQueue] = useState(156);

  // Simulate real-time data updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
      setActiveUsers(prev => prev + Math.floor(Math.random() * 10) - 5);
      setProcessingQueue(prev => Math.max(0, prev + Math.floor(Math.random() * 20) - 10));
      
      // Update live chart data
      setLiveData(prev => {
        const newData = [...prev];
        const now = new Date();
        newData.push({
          time: now.toLocaleTimeString(),
          value: Math.floor(Math.random() * 100) + 50,
          timestamp: now.getTime()
        });
        
        // Keep only last 20 points
        return newData.slice(-20);
      });
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [isLive, refreshInterval]);

  const realtimeMetrics = [
    {
      title: 'System Status',
      value: systemStatus,
      icon: systemStatus === 'operational' ? CheckCircle : AlertCircle,
      color: systemStatus === 'operational' ? 'green' : 'red',
      status: systemStatus === 'operational' ? 'Operational' : 'Issues Detected'
    },
    {
      title: 'Active Users',
      value: activeUsers.toLocaleString(),
      icon: Users,
      color: 'blue',
      change: '+12'
    },
    {
      title: 'Processing Queue',
      value: processingQueue.toString(),
      icon: Clock,
      color: processingQueue > 200 ? 'red' : 'green',
      status: processingQueue > 200 ? 'High Load' : 'Normal'
    },
    {
      title: 'Response Time',
      value: '142ms',
      icon: Zap,
      color: 'yellow',
      trend: 'stable'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'New mortgage application submitted',
      time: '2 minutes ago',
      type: 'application',
      priority: 'normal'
    },
    {
      id: 2,
      title: 'Payment processed successfully',
      time: '5 minutes ago',
      type: 'payment',
      priority: 'normal'
    },
    {
      id: 3,
      title: 'Document verification completed',
      time: '8 minutes ago',
      type: 'document',
      priority: 'normal'
    },
    {
      id: 4,
      title: 'System backup completed',
      time: '15 minutes ago',
      type: 'system',
      priority: 'low'
    },
    {
      id: 5,
      title: 'High-value transaction alert',
      time: '18 minutes ago',
      type: 'alert',
      priority: 'high'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Real-time Controls */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-500" />
              <CardTitle className="text-lg">Live Data Stream</CardTitle>
              {isLive && (
                <Badge variant="default" className="bg-green-100 text-green-700 border-green-200 animate-pulse">
                  LIVE
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLive(!isLive)}
              >
                {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isLive ? 'Pause' : 'Resume'}
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>
            Last updated: {lastUpdate.toLocaleTimeString()} • Updates every {refreshInterval}s
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {realtimeMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const getColorClasses = (color: string) => {
            const colors = {
              green: 'text-green-600 bg-green-100',
              red: 'text-red-600 bg-red-100',
              blue: 'text-blue-600 bg-blue-100',
              yellow: 'text-yellow-600 bg-yellow-100'
            };
            return colors[color as keyof typeof colors] || 'text-gray-600 bg-gray-100';
          };

          return (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${getColorClasses(metric.color)}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {isLive && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  )}
                </div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-xl font-bold">{metric.value}</p>
                {metric.status && (
                  <Badge variant="outline" className="text-xs mt-1">
                    {metric.status}
                  </Badge>
                )}
                {metric.change && (
                  <p className="text-xs text-green-600 mt-1">+{metric.change} this hour</p>
                )}
              </CardContent>
              {isLive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
              )}
            </Card>
          );
        })}
      </div>

      {/* Live Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Live Activity Stream</span>
            </CardTitle>
            <CardDescription>Real-time system activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={liveData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    animationDuration={500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>Latest system events and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.priority === 'high' ? 'bg-red-500' :
                    activity.priority === 'normal' ? 'bg-blue-500' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      activity.type === 'alert' ? 'border-red-200 text-red-700' :
                      activity.type === 'system' ? 'border-blue-200 text-blue-700' : 
                      'border-gray-200 text-gray-700'
                    }`}
                  >
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Performance */}
      <Card>
        <CardHeader>
          <CardTitle>System Performance</CardTitle>
          <CardDescription>Real-time system health indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>CPU Usage</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Memory Usage</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Database Load</span>
                <span>23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeDataPanel;
