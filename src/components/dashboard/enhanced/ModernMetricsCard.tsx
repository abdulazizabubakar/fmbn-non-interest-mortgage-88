
import React from 'react';
import { EnhancedCard, EnhancedCardContent } from '@/components/ui/enhanced-card';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ModernMetricsCardProps {
  title: string;
  value: number;
  previousValue?: number;
  icon: React.ReactNode;
  format?: 'number' | 'currency' | 'percentage';
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'none';
  className?: string;
}

const ModernMetricsCard: React.FC<ModernMetricsCardProps> = ({
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

  return (
    <EnhancedCard gradient={gradient} hover glow className={cn('relative overflow-hidden', className)}>
      <EnhancedCardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <AnimatedCounter
                value={value}
                className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                prefix={format === 'currency' ? '₦' : ''}
                suffix={format === 'percentage' ? '%' : ''}
                decimals={format === 'currency' ? 0 : format === 'percentage' ? 1 : 0}
              />
              {change && (
                <div className={cn(
                  'flex items-center text-xs font-medium px-2 py-1 rounded-full',
                  change.isPositive
                    ? 'text-green-700 bg-green-100'
                    : change.isNeutral
                    ? 'text-gray-700 bg-gray-100'
                    : 'text-red-700 bg-red-100'
                )}>
                  {change.isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {change.percentage.toFixed(1)}%
                </div>
              )}
            </div>
          </div>
          <div className={cn(
            'p-3 rounded-xl bg-gradient-to-br',
            gradient === 'blue' && 'from-blue-500 to-blue-600',
            gradient === 'purple' && 'from-purple-500 to-purple-600',
            gradient === 'green' && 'from-green-500 to-green-600',
            gradient === 'orange' && 'from-orange-500 to-orange-600',
            gradient === 'pink' && 'from-pink-500 to-pink-600'
          )}>
            <div className="text-white">
              {icon}
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12" />
      </EnhancedCardContent>
    </EnhancedCard>
  );
};

export { ModernMetricsCard };
