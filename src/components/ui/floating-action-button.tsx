
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  icon = <Plus className="h-6 w-6" />,
  className,
  size = 'md',
  position = 'bottom-right'
}) => {
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-14 w-14',
    lg: 'h-16 w-16'
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        'fixed z-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300',
        'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
        'transform hover:scale-110 active:scale-95',
        'border-0 text-white',
        sizeClasses[size],
        positionClasses[position],
        className
      )}
    >
      {icon}
    </Button>
  );
};

export { FloatingActionButton };
