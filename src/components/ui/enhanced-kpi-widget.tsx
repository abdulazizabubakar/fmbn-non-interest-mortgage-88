
import React from 'react';
import { IslamicCard, IslamicCardContent } from './islamic-card';
import { AnimatedCounter } from './animated-counter';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface EnhancedKPIWidgetProps {
  title: string;
  value: number;
  previousValue?: number;
  icon: React.ReactNode;
  format?: 'number' | 'currency' | 'percentage';
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  subtitle?: string;
  target?: number;
  realTime?: boolean;
}

const EnhancedKPIWidget: React.FC<EnhancedKPIWidgetProps> = ({
  title,
  value,
  previousValue,
  icon,
  format = 'number',
  trend,
  className,
  subtitle,
  target,
  realTime = false
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
  const actualTrend = trend || (change ? (change.isPositive ? 'up' : change.isNeutral ? 'neutral' : 'down') : 'neutral');

  const getTrendIcon = () => {
    switch (actualTrend) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />;
      case 'down':
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = () => {
    switch (actualTrend) {
      case 'up':
        return 'text-green-700 bg-green-100 border-green-200';
      case 'down':
        return 'text-red-700 bg-red-100 border-red-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const progressPercentage = target ? Math.min((value / target) * 100, 100) : 0;

  return (
    <IslamicCard variant="financial" elevation="medium" className={cn('relative overflow-hidden', className)}>
      <IslamicCardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-fmbn-primary to-fmbn-secondary rounded-xl shadow-lg">
              <div className="text-white">
                {icon}
              </div>
            </div>
            {realTime && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-600 font-medium">Live</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-fmbn-primary/80 uppercase tracking-wider">
            {title}
          </h3>
          
          <div className="flex items-baseline space-x-3">
            <AnimatedCounter
              value={value}
              className="text-3xl font-bold gradient-text font-mono"
              prefix={format === 'currency' ? '₦' : ''}
              suffix={format === 'percentage' ? '%' : ''}
              decimals={format === 'currency' ? 0 : format === 'percentage' ? 1 : 0}
            />
            
            {change && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={cn(
                  'flex items-center text-xs font-semibold px-2 py-1 rounded-full border',
                  getTrendColor()
                )}
              >
                {getTrendIcon()}
                <span className="ml-1">{change.percentage.toFixed(1)}%</span>
              </motion.div>
            )}
          </div>

          {subtitle && (
            <p className="text-sm text-fmbn-primary/60 font-medium">{subtitle}</p>
          )}

          {target && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-fmbn-primary/70">Target Progress</span>
                <span className="text-fmbn-primary">{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-fmbn-light rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-fmbn-primary to-fmbn-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div className="text-xs text-fmbn-primary/60">
                Target: {formatValue(target)}
              </div>
            </div>
          )}
        </div>

        {/* Islamic pattern decoration */}
        <div className="absolute bottom-0 right-0 w-20 h-20 opacity-10">
          <div className="w-full h-full bg-gradient-to-tl from-fmbn-accent to-transparent rounded-tl-full" />
        </div>
      </IslamicCardContent>
    </IslamicCard>
  );
};

export { EnhancedKPIWidget };
