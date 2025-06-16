
import React, { useState, useEffect } from 'react';
import { ModernCard, ModernCardContent } from './ModernCard';
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
  Target,
  Activity,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPIData {
  id: string;
  title: string;
  value: string;
  previousValue: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

interface InteractiveKPIGridProps {
  userRole: string;
  userRegion: string;
  className?: string;
}

const InteractiveKPIGrid: React.FC<InteractiveKPIGridProps> = ({
  userRole,
  userRegion,
  className
}) => {
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const kpiData: KPIData[] = [
    {
      id: 'portfolio',
      title: 'Total Portfolio',
      value: '₦45.8B',
      previousValue: '₦42.1B',
      change: 8.8,
      trend: 'up',
      icon: DollarSign,
      color: 'emerald',
      description: 'Total mortgage portfolio value'
    },
    {
      id: 'applications',
      title: 'Active Applications',
      value: '1,243',
      previousValue: '1,178',
      change: 5.5,
      trend: 'up',
      icon: FileCheck,
      color: 'blue',
      description: 'Applications in progress'
    },
    {
      id: 'properties',
      title: 'Properties',
      value: '856',
      previousValue: '838',
      change: 2.1,
      trend: 'up',
      icon: Home,
      color: 'purple',
      description: 'Registered properties'
    },
    {
      id: 'users',
      title: 'Active Users',
      value: '2,841',
      previousValue: '2,615',
      change: 8.6,
      trend: 'up',
      icon: Users,
      color: 'indigo',
      description: 'Monthly active users'
    },
    {
      id: 'completion',
      title: 'Completion Rate',
      value: '94.2%',
      previousValue: '91.8%',
      change: 2.6,
      trend: 'up',
      icon: Target,
      color: 'green',
      description: 'Process completion rate'
    },
    {
      id: 'alerts',
      title: 'Active Alerts',
      value: '12',
      previousValue: '18',
      change: -33.3,
      trend: 'down',
      icon: AlertTriangle,
      color: 'orange',
      description: 'System alerts requiring attention'
    }
  ];

  const colorClasses = {
    emerald: {
      icon: 'from-emerald-500 to-emerald-600',
      badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      glow: 'shadow-emerald-500/20'
    },
    blue: {
      icon: 'from-blue-500 to-blue-600',
      badge: 'bg-blue-100 text-blue-700 border-blue-200',
      glow: 'shadow-blue-500/20'
    },
    purple: {
      icon: 'from-purple-500 to-purple-600',
      badge: 'bg-purple-100 text-purple-700 border-purple-200',
      glow: 'shadow-purple-500/20'
    },
    indigo: {
      icon: 'from-indigo-500 to-indigo-600',
      badge: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      glow: 'shadow-indigo-500/20'
    },
    green: {
      icon: 'from-green-500 to-green-600',
      badge: 'bg-green-100 text-green-700 border-green-200',
      glow: 'shadow-green-500/20'
    },
    orange: {
      icon: 'from-orange-500 to-orange-600',
      badge: 'bg-orange-100 text-orange-700 border-orange-200',
      glow: 'shadow-orange-500/20'
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Key Performance Indicators
          </h2>
          <p className="text-gray-600">Real-time insights for {userRegion}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-600 font-medium">Live Data</span>
          </div>
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const colors = colorClasses[kpi.color as keyof typeof colorClasses];
          const isSelected = selectedKPI === kpi.id;
          
          return (
            <ModernCard
              key={`${kpi.id}-${animationKey}`}
              variant="gradient"
              interactive={true}
              glow={isSelected}
              className={cn(
                'transform transition-all duration-300',
                isSelected && `ring-2 ring-blue-500 scale-105 ${colors.glow}`,
                'animate-fade-in'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => setSelectedKPI(isSelected ? null : kpi.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      'p-3 rounded-xl bg-gradient-to-br shadow-lg transition-transform duration-300',
                      colors.icon,
                      isSelected && 'scale-110'
                    )}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">
                        {kpi.title}
                      </h3>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {kpi.value}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={cn(
                      'text-xs font-medium border',
                      kpi.trend === 'up' ? 'bg-green-100 text-green-700 border-green-200' :
                      kpi.trend === 'down' ? 'bg-red-100 text-red-700 border-red-200' :
                      'bg-gray-100 text-gray-700 border-gray-200'
                    )}>
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : kpi.trend === 'down' ? (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      ) : (
                        <Zap className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(kpi.change)}%
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">{kpi.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Previous: {kpi.previousValue}</span>
                    <div className="flex items-center space-x-1">
                      <Activity className="h-3 w-3 text-green-500" />
                      <span className="text-green-600">Live</span>
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-gray-500 mb-1">Trend</p>
                        <p className="font-semibold text-gray-900">
                          {kpi.trend === 'up' ? 'Increasing' : 
                           kpi.trend === 'down' ? 'Decreasing' : 'Stable'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Change</p>
                        <p className="font-semibold text-gray-900">
                          {kpi.change > 0 ? '+' : ''}{kpi.change}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ModernCard>
          );
        })}
      </div>

      {selectedKPI && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setSelectedKPI(null)}
            className="text-gray-600"
          >
            Hide Details
          </Button>
        </div>
      )}
    </div>
  );
};

export default InteractiveKPIGrid;
