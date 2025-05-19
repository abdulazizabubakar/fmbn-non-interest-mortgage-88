
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { StatCard as StatCardType } from '@/types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  data: StatCardType;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ data, className }) => {
  const { title, value, change, icon } = data;
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            
            {change !== undefined && (
              <div className="flex items-center space-x-1">
                {change >= 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-xs font-medium text-green-500">
                      +{change}%
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span className="text-xs font-medium text-red-500">
                      {change}%
                    </span>
                  </>
                )}
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          
          <div className="p-2 bg-muted rounded-md">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
