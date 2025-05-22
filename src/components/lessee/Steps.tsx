
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepProps {
  title: string;
  description?: string;
  completed?: boolean;
  active?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

interface StepsProps {
  activeStep: number;
  completedSteps?: number[];
  children: React.ReactNode;
}

export const Step = ({ 
  title, 
  description, 
  completed = false, 
  active = false,
  onClick,
  children 
}: StepProps) => {
  return (
    <div 
      className={cn(
        "flex gap-2 items-start",
        onClick && completed && "cursor-pointer"
      )}
      onClick={onClick && completed ? onClick : undefined}
    >
      <div className="flex-shrink-0 relative">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center border-2",
            active ? "border-primary bg-primary text-primary-foreground" :
            completed ? "border-primary bg-primary text-primary-foreground" :
            "border-muted bg-background text-muted-foreground"
          )}
        >
          {completed ? <Check className="h-4 w-4" /> : null}
          {!completed && !active && <span className="text-sm">•</span>}
          {!completed && active && <span className="text-sm">•</span>}
        </div>
      </div>
      <div className="flex flex-col">
        <span 
          className={cn(
            "font-medium",
            active && "text-foreground",
            !active && completed && "text-foreground",
            !active && !completed && "text-muted-foreground"
          )}
        >
          {title}
        </span>
        {description && (
          <span className="text-xs text-muted-foreground mt-1">{description}</span>
        )}
        {children}
      </div>
    </div>
  );
};

export const Steps = ({ activeStep, completedSteps = [], children }: StepsProps) => {
  // Convert React.Children to array for manipulation
  const childrenArray = React.Children.toArray(children);
  
  // Add line connectors between steps
  const stepsWithConnectors = childrenArray.map((child, index) => {
    const isActive = index === activeStep;
    const isCompleted = index < activeStep || completedSteps.includes(index);
    
    // Clone the child with additional props
    const stepWithProps = React.cloneElement(
      child as React.ReactElement<StepProps>,
      {
        active: isActive,
        completed: isCompleted,
      }
    );
    
    const isLast = index === childrenArray.length - 1;
    
    return (
      <div key={index} className="flex flex-col">
        {stepWithProps}
        {!isLast && (
          <div className="ml-4 my-1 w-0.5 h-8 bg-border" />
        )}
      </div>
    );
  });
  
  return <div className="flex flex-col">{stepsWithConnectors}</div>;
};
