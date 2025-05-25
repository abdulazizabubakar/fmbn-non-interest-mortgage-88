
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import ChartRenderer from './ChartRenderer';

interface MetricCardProps {
  metric: {
    id: string;
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    chartType: string;
    color: string;
  };
  isSelected: boolean;
  realTimeEnabled: boolean;
  animationKey: number;
  onSelect: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  metric,
  isSelected,
  realTimeEnabled,
  animationKey,
  onSelect
}) => {
  const Icon = metric.icon;

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

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
        isSelected ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''
      }`}
      onClick={onSelect}
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
          <ChartRenderer metric={metric} animationKey={animationKey} />
        </div>
        
        <p className="text-xs text-gray-500 mt-2">{metric.description}</p>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
