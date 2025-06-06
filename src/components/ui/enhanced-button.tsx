
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface EnhancedButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
  icon?: React.ReactNode;
  gradient?: boolean;
  glow?: boolean;
  ripple?: boolean;
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, loading, icon, gradient, glow, ripple, children, disabled, ...props }, ref) => {
    const gradientClass = gradient
      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0'
      : '';
    
    const glowClass = glow
      ? 'shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40'
      : '';
    
    const rippleClass = ripple
      ? 'relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500'
      : '';

    return (
      <Button
        ref={ref}
        className={cn(
          'transition-all duration-300 transform hover:scale-105 active:scale-95',
          gradientClass,
          glowClass,
          rippleClass,
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        <div className="flex items-center space-x-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {!loading && icon && <span>{icon}</span>}
          {children && <span>{children}</span>}
        </div>
      </Button>
    );
  }
);

EnhancedButton.displayName = 'EnhancedButton';

export { EnhancedButton };
