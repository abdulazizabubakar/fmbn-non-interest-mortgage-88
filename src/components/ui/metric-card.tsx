
import React from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { CardContent } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  previousValue?: number;
  icon: React.ReactNode;
  format?: 'number' | 'currency' | 'percentage';
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  previousValue,
  icon,
  format = 'number',
  gradient = 'blue',
  className,
  size = 'md'
}) => {
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
    blue: 'from-blue-500/20 via-blue-400/10 to-transparent',
    purple: 'from-purple-500/20 via-purple-400/10 to-transparent',
    green: 'from-green-500/20 via-green-400/10 to-transparent',
    orange: 'from-orange-500/20 via-orange-400/10 to-transparent',
    pink: 'from-pink-500/20 via-pink-400/10 to-transparent'
  };

  const iconGradients = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    pink: 'from-pink-500 to-pink-600'
  };

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <GlassCard 
      className={cn(
        'relative overflow-hidden group cursor-pointer',
        'hover:scale-105 transition-all duration-300',
        className
      )}
      hover={true}
    >
      {/* Background gradient */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-br opacity-50',
        gradientClasses[gradient]
      )} />
      
      <CardContent className={cn(sizeClasses[size], 'relative')}>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {title}
            </p>
            <div className="space-y-1">
              <AnimatedCounter
                value={value}
                className={cn(
                  'font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent',
                  size === 'sm' ? 'text-2xl' : size === 'md' ? 'text-3xl' : 'text-4xl'
                )}
                prefix={format === 'currency' ? '₦' : ''}
                suffix={format === 'percentage' ? '%' : ''}
                decimals={format === 'currency' ? 0 : format === 'percentage' ? 1 : 0}
              />
              
              {change && (
                <Badge
                  variant="outline"
                  className={cn(
                    'text-xs font-medium animate-fade-in',
                    change.isPositive
                      ? 'text-green-700 bg-green-50 border-green-200 hover:bg-green-100'
                      : change.isNeutral
                      ? 'text-gray-700 bg-gray-50 border-gray-200'
                      : 'text-red-700 bg-red-50 border-red-200 hover:bg-red-100'
                  )}
                >
                  {change.isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {change.percentage.toFixed(1)}%
                </Badge>
              )}
            </div>
          </div>
          
          {/* Icon with gradient background */}
          <div className={cn(
            'p-3 rounded-xl bg-gradient-to-br shadow-lg',
            'group-hover:scale-110 transition-transform duration-300',
            iconGradients[gradient]
          )}>
            <div className="text-white">
              {icon}
            </div>
          </div>
        </div>
        
        {/* Animated decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-700" />
      </CardContent>
    </GlassCard>
  );
};

export { MetricCard };
