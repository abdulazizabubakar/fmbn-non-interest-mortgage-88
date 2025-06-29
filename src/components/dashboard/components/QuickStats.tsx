
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp } from 'lucide-react';

interface QuickStatsProps {
  stats: Array<{
    label: string;
    value: string;
    status: 'excellent' | 'good' | 'warning' | 'poor';
  }>;
}

const QuickStats: React.FC<QuickStatsProps> = ({ stats }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'good':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'poor':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'excellent':
        return 95;
      case 'good':
        return 75;
      case 'warning':
        return 50;
      case 'poor':
        return 25;
      default:
        return 0;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-blue-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'poor':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-indigo-600" />
          Performance Metrics
        </CardTitle>
        <CardDescription>
          Key performance indicators and system health
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{stat.label}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold">{stat.value}</span>
                <Badge variant="outline" className={getStatusColor(stat.status)}>
                  {stat.status}
                </Badge>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(stat.status)}`}
                style={{ width: `${getProgressValue(stat.status)}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickStats;
