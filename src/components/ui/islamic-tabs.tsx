
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface IslamicTabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
  disabled?: boolean;
}

interface IslamicTabsProps {
  tabs: IslamicTabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'horizontal' | 'vertical';
  className?: string;
  children: React.ReactNode;
}

const IslamicTabs: React.FC<IslamicTabsProps> = ({
  tabs,
  defaultValue,
  value,
  onValueChange,
  variant = 'horizontal',
  className,
  children
}) => {
  return (
    <Tabs 
      defaultValue={defaultValue} 
      value={value} 
      onValueChange={onValueChange}
      className={cn('w-full', className)}
    >
      <TabsList className={cn(
        'bg-gradient-to-r from-fmbn-light via-white to-fmbn-light border border-fmbn-primary/20 shadow-lg',
        variant === 'horizontal' 
          ? 'grid w-full h-12 p-1 rounded-2xl' 
          : 'flex flex-col h-auto w-64 p-1 rounded-2xl space-y-1',
        variant === 'horizontal' && `grid-cols-${tabs.length}`
      )}>
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className={cn(
              'relative flex items-center justify-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300',
              'data-[state=active]:bg-gradient-to-r data-[state=active]:from-fmbn-primary data-[state=active]:to-fmbn-secondary',
              'data-[state=active]:text-white data-[state=active]:shadow-lg',
              'hover:bg-fmbn-light/50 text-fmbn-primary',
              variant === 'vertical' && 'w-full justify-start',
              tab.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <motion.div
              initial={{ opacity: 0, x: variant === 'horizontal' ? -10 : 0, y: variant === 'vertical' ? -10 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2"
            >
              {tab.icon && (
                <div className="flex-shrink-0">
                  {tab.icon}
                </div>
              )}
              <span className={cn(
                'font-semibold',
                variant === 'vertical' ? 'text-sm' : 'text-sm'
              )}>
                {tab.label}
              </span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <Badge 
                  variant="destructive" 
                  className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-bold bg-fmbn-accent text-fmbn-dark border-0"
                >
                  {tab.badge > 99 ? '99+' : tab.badge}
                </Badge>
              )}
            </motion.div>
            
            {/* Active indicator */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fmbn-accent to-fmbn-secondary rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: value === tab.value || defaultValue === tab.value ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </TabsTrigger>
        ))}
      </TabsList>
      
      <div className="mt-6">
        {children}
      </div>
    </Tabs>
  );
};

interface IslamicTabContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const IslamicTabContent: React.FC<IslamicTabContentProps> = ({ 
  value, 
  children, 
  className 
}) => {
  return (
    <TabsContent 
      value={value} 
      className={cn('mt-0 focus-visible:outline-none', className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </TabsContent>
  );
};

export { IslamicTabs, IslamicTabContent };
export type { IslamicTabItem };
