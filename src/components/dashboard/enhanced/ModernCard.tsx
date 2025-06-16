
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass' | 'elevated';
  interactive?: boolean;
  glow?: boolean;
  style?: React.CSSProperties;
}

const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className,
  variant = 'default',
  interactive = false,
  glow = false,
  style
}) => {
  const variants = {
    default: 'bg-white border-gray-200/50',
    gradient: 'bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-blue-200/30',
    glass: 'backdrop-blur-xl bg-white/60 border-white/30 shadow-xl',
    elevated: 'bg-white shadow-2xl border-0'
  };

  const interactiveStyles = interactive 
    ? 'cursor-pointer hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 active:scale-[0.98]' 
    : '';
  
  const glowStyles = glow 
    ? 'shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30' 
    : '';

  return (
    <Card 
      className={cn(
        'border rounded-2xl transition-all duration-300',
        variants[variant],
        interactiveStyles,
        glowStyles,
        className
      )}
      style={style}
    >
      {children}
    </Card>
  );
};

interface ModernCardHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const ModernCardHeader: React.FC<ModernCardHeaderProps> = ({
  title,
  subtitle,
  badge,
  icon,
  action
}) => {
  return (
    <div className="p-6 pb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <div className="text-white">
                {icon}
              </div>
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
            {subtitle && (
              <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {badge}
          {action}
        </div>
      </div>
    </div>
  );
};

const ModernCardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => {
  return (
    <CardContent className={cn('px-6 pb-6 pt-0', className)}>
      {children}
    </CardContent>
  );
};

export { ModernCard, ModernCardHeader, ModernCardContent };
