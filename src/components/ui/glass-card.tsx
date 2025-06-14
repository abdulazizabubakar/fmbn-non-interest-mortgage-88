
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  border?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  blur = 'md',
  opacity = 20,
  border = true,
  shadow = 'lg',
  hover = true
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  return (
    <Card
      className={cn(
        // Glass effect
        `bg-white/${opacity}`,
        blurClasses[blur],
        
        // Border
        border && 'border border-white/30',
        
        // Shadow
        shadowClasses[shadow],
        
        // Hover effects
        hover && 'transition-all duration-300 hover:shadow-xl hover:bg-white/30 hover:scale-[1.02]',
        
        // Base styles
        'relative overflow-hidden',
        
        className
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Card>
  );
};

export { GlassCard };
