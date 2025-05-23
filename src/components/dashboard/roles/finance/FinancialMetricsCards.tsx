
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface FinancialMetricsCardsProps {
  region?: string;
}

const FinancialMetricsCards: React.FC<FinancialMetricsCardsProps> = ({ region }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="bg-blue-50 border-0">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-muted-foreground">MTD Collections</p>
            <span className="text-green-600 flex items-center text-xs font-medium">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +15.7%
            </span>
          </div>
          <p className="text-2xl font-bold mt-1">₦52.1M</p>
          <p className="text-xs text-muted-foreground mt-1">Target: ₦45M</p>
          <Progress value={116} className="h-1 mt-2" />
        </CardContent>
      </Card>
      
      <Card className="bg-green-50 border-0">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-muted-foreground">YTD Revenue</p>
            <span className="text-green-600 flex items-center text-xs font-medium">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +8.2%
            </span>
          </div>
          <p className="text-2xl font-bold mt-1">₦276.2M</p>
          <p className="text-xs text-muted-foreground mt-1">Annual Target: ₦540M</p>
          <Progress value={51} className="h-1 mt-2" />
        </CardContent>
      </Card>
      
      <Card className="bg-amber-50 border-0">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-muted-foreground">Total Arrears</p>
            <span className="text-red-600 flex items-center text-xs font-medium">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +2.4%
            </span>
          </div>
          <p className="text-2xl font-bold mt-1">₦68.9M</p>
          <p className="text-xs text-muted-foreground mt-1">Accounts in Arrears: 124</p>
          <Progress value={68} className="h-1 mt-2 bg-amber-100">
            <div className="bg-amber-500 h-full rounded-full" />
          </Progress>
        </CardContent>
      </Card>
      
      <Card className="bg-purple-50 border-0">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-muted-foreground">Fund Utilization</p>
            <span className="text-purple-600 flex items-center text-xs font-medium">
              Target: 85%
            </span>
          </div>
          <p className="text-2xl font-bold mt-1">78.3%</p>
          <p className="text-xs text-muted-foreground mt-1">Available: ₦124.5M</p>
          <Progress value={78} className="h-1 mt-2 bg-purple-100">
            <div className="bg-purple-500 h-full rounded-full" />
          </Progress>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialMetricsCards;
