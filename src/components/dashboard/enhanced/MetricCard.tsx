
import React from 'react';
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

  const getGradientColors = (color: string) => {
    const colors = {
      blue: { from: '#3b82f6', to: '#60a5fa', iconBg: 'bg-white/20', iconText: 'text-white' },
      green: { from: '#10b981', to: '#34d399', iconBg: 'bg-white/20', iconText: 'text-white' },
      purple: { from: '#8b5cf6', to: '#a78bfa', iconBg: 'bg-white/20', iconText: 'text-white' },
      indigo: { from: '#6366f1', to: '#818cf8', iconBg: 'bg-white/20', iconText: 'text-white' },
      emerald: { from: '#059669', to: '#10b981', iconBg: 'bg-white/20', iconText: 'text-white' },
      red: { from: '#ef4444', to: '#f87171', iconBg: 'bg-white/20', iconText: 'text-white' }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const { from, to, iconBg, iconText } = getGradientColors(metric.color);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 ease-out group hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
        isSelected ? 'ring-4 ring-offset-2 ring-offset-background ring-blue-500 shadow-2xl -translate-y-2' : 'shadow-lg'
      }`}
      onClick={onSelect}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

      <div className="relative z-10 p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl ${iconBg} ${iconText}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-base">{metric.title}</h3>
              {realTimeEnabled && (
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <p className="text-3xl font-bold drop-shadow-md">{metric.value}</p>
              <div className="flex items-center space-x-2">
                <Badge 
                  className={`text-xs border-0 font-semibold ${
                    metric.trend === 'up' 
                      ? 'bg-white/30 text-white' 
                      : 'bg-red-900/50 text-white'
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
                    <Activity className="h-3 w-3 text-green-300" />
                    <span className="text-xs text-green-200">Live</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 h-12">
          <ChartRenderer metric={metric} animationKey={animationKey} />
        </div>
        
        <p className="text-xs text-white/80 mt-2 h-8">{metric.description}</p>
      </div>
    </div>
  );
};

export default MetricCard;
