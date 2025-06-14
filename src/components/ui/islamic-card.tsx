
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface IslamicCardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 'low' | 'medium' | 'high' | 'highest';
  variant?: 'default' | 'financial' | 'status' | 'interactive';
  status?: 'approved' | 'pending' | 'rejected' | 'processing';
  hover?: boolean;
  expandable?: boolean;
  onExpand?: () => void;
}

const IslamicCard: React.FC<IslamicCardProps> = ({
  children,
  className,
  elevation = 'medium',
  variant = 'default',
  status,
  hover = true,
  expandable = false,
  onExpand
}) => {
  const elevationClasses = {
    low: 'shadow-sm hover:shadow-md',
    medium: 'shadow-md hover:shadow-lg',
    high: 'shadow-lg hover:shadow-xl',
    highest: 'shadow-xl hover:shadow-2xl'
  };

  const variantClasses = {
    default: 'bg-gradient-to-br from-white via-fmbn-light/30 to-white border-fmbn-primary/20',
    financial: 'bg-gradient-to-br from-fmbn-light via-white to-fmbn-accent/10 border-fmbn-primary/30',
    status: 'bg-gradient-to-br from-white to-fmbn-light/50 border-fmbn-secondary/20',
    interactive: 'bg-gradient-to-br from-white via-fmbn-light/20 to-white border-fmbn-primary/30 cursor-pointer'
  };

  const statusClasses = {
    approved: 'border-l-4 border-l-green-500 bg-gradient-to-r from-green-50/50 to-white',
    pending: 'border-l-4 border-l-fmbn-accent bg-gradient-to-r from-amber-50/50 to-white',
    rejected: 'border-l-4 border-l-red-500 bg-gradient-to-r from-red-50/50 to-white',
    processing: 'border-l-4 border-l-fmbn-secondary bg-gradient-to-r from-blue-50/50 to-white'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      onClick={expandable ? onExpand : undefined}
    >
      <Card className={cn(
        'rounded-2xl border-0 relative overflow-hidden transition-all duration-300',
        elevationClasses[elevation],
        variantClasses[variant],
        status && statusClasses[status],
        className
      )}>
        {/* Islamic geometric pattern overlay */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-fmbn-primary to-fmbn-secondary transform rotate-45 translate-x-16 -translate-y-16" 
               style={{
                 clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 50% 100%, 0% 50%)'
               }} />
        </div>
        
        {children}
      </Card>
    </motion.div>
  );
};

interface IslamicCardHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  amount?: string;
  className?: string;
}

const IslamicCardHeader: React.FC<IslamicCardHeaderProps> = ({
  title,
  description,
  icon,
  badge,
  amount,
  className
}) => {
  return (
    <CardHeader className={cn('pb-3 relative z-10', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="p-3 bg-gradient-to-br from-fmbn-primary to-fmbn-secondary rounded-xl shadow-lg">
              <div className="text-white">
                {icon}
              </div>
            </div>
          )}
          <div>
            <CardTitle className="text-lg font-bold gradient-text font-playfair">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="mt-1 text-fmbn-primary/70 font-medium">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {amount && (
            <div className="text-right">
              <div className="text-2xl font-bold text-fmbn-primary font-mono">
                {amount}
              </div>
            </div>
          )}
          {badge && <div>{badge}</div>}
        </div>
      </div>
    </CardHeader>
  );
};

const IslamicCardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => {
  return (
    <CardContent className={cn('pt-0 relative z-10', className)}>
      {children}
    </CardContent>
  );
};

export { IslamicCard, IslamicCardHeader, IslamicCardContent };
