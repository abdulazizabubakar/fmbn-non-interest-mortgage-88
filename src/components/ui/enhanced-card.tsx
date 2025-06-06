
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'none';
  glass?: boolean;
  hover?: boolean;
  glow?: boolean;
}

const EnhancedCard: React.FC<EnhancedCardProps> = ({
  children,
  className,
  gradient = 'none',
  glass = false,
  hover = true,
  glow = false
}) => {
  const gradientClasses = {
    blue: 'bg-gradient-to-br from-blue-50 via-white to-blue-100 border-blue-200/50',
    purple: 'bg-gradient-to-br from-purple-50 via-white to-purple-100 border-purple-200/50',
    green: 'bg-gradient-to-br from-green-50 via-white to-green-100 border-green-200/50',
    orange: 'bg-gradient-to-br from-orange-50 via-white to-orange-100 border-orange-200/50',
    pink: 'bg-gradient-to-br from-pink-50 via-white to-pink-100 border-pink-200/50',
    none: ''
  };

  const glassClass = glass ? 'backdrop-blur-md bg-white/20 border-white/30' : '';
  const hoverClass = hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : '';
  const glowClass = glow ? 'shadow-xl shadow-blue-500/20' : '';

  return (
    <Card className={cn(
      'border-0 shadow-md',
      gradientClasses[gradient],
      glassClass,
      hoverClass,
      glowClass,
      className
    )}>
      {children}
    </Card>
  );
};

interface EnhancedCardHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

const EnhancedCardHeader: React.FC<EnhancedCardHeaderProps> = ({
  title,
  description,
  icon,
  badge,
  className
}) => {
  return (
    <CardHeader className={cn('pb-3', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="p-2 bg-primary/10 rounded-lg">
              {icon}
            </div>
          )}
          <div>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="mt-1 text-sm text-muted-foreground">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
        {badge && <div>{badge}</div>}
      </div>
    </CardHeader>
  );
};

const EnhancedCardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => {
  return (
    <CardContent className={cn('pt-0', className)}>
      {children}
    </CardContent>
  );
};

export { EnhancedCard, EnhancedCardHeader, EnhancedCardContent };
