
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModernMetricCardProps {
  title: string;
  value: number;
  previousValue?: number;
  icon: React.ReactNode;
  format?: 'number' | 'currency' | 'percentage';
  gradient?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  className?: string;
}

const ModernMetricCard: React.FC<ModernMetricCardProps> = ({
  title,
  value,
  previousValue,
  icon,
  format = 'number',
  gradient = 'blue',
  className
}) => {
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
          maximumFractionDigits: 0,
          notation: val >= 1000000000 ? 'compact' : 'standard',
          compactDisplay: 'short'
        }).format(val);
      case 'percentage':
        return `${val}%`;
      default:
        return val.toLocaleString();
    }
  };

  const calculateChange = () => {
    if (!previousValue || previousValue === 0) return null;
    const change = ((value - previousValue) / previousValue) * 100;
    return {
      percentage: Math.abs(change),
      isPositive: change > 0,
      isNeutral: change === 0
    };
  };

  const change = calculateChange();

  const gradientClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600'
  };

  return (
    <Card className={cn(
      'relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm shadow-md',
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            'p-3 rounded-xl bg-gradient-to-br text-white shadow-lg',
            gradientClasses[gradient]
          )}>
            {icon}
          </div>
          {change && (
            <Badge variant="outline" className={cn(
              'text-xs font-medium border-0',
              change.isPositive
                ? 'bg-green-50 text-green-700'
                : change.isNeutral
                ? 'bg-gray-50 text-gray-700'
                : 'bg-red-50 text-red-700'
            )}>
              {change.isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {change.percentage.toFixed(1)}%
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold text-slate-900">
            {formatValue(value)}
          </p>
        </div>

        {/* Background decoration */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-slate-100/50 to-transparent rounded-full" />
      </CardContent>
    </Card>
  );
};

export { ModernMetricCard };
