
import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  animation = 'pulse'
}) => {
  const baseClasses = 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]';
  
  const variantClasses = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded',
    rounded: 'rounded-lg'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-[wave_1.5s_ease-in-out_infinite]',
    none: ''
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
    />
  );
};

interface SkeletonCardProps {
  lines?: number;
  showAvatar?: boolean;
  showButton?: boolean;
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  lines = 3,
  showAvatar = false,
  showButton = false,
  className
}) => {
  return (
    <div className={cn('p-6 bg-white rounded-lg border shadow-sm', className)}>
      <div className="flex items-start space-x-4">
        {showAvatar && (
          <Skeleton variant="circular" className="w-12 h-12" />
        )}
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
              key={i}
              className={cn(
                'h-4',
                i === lines - 1 ? 'w-1/2' : 'w-full'
              )}
            />
          ))}
          {showButton && (
            <div className="pt-2">
              <Skeleton className="h-9 w-24" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Skeleton, SkeletonCard };
