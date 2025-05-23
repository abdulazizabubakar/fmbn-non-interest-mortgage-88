
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Home, Check, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';

interface AdminMetricCardsProps {
  region: string;
  timeframe: 'daily' | 'weekly' | 'monthly';
}

const AdminMetricCards: React.FC<AdminMetricCardsProps> = ({ region, timeframe }) => {
  // Mock data - would come from API
  const metrics = [
    { 
      title: 'Total Applications',
      value: '2,457',
      change: 12.5,
      trend: 'up',
      icon: UserPlus,
      color: 'bg-blue-100 text-blue-700'
    },
    { 
      title: 'Active Mortgages',
      value: '1,893',
      change: 5.2,
      trend: 'up',
      icon: Home,
      color: 'bg-green-100 text-green-700'
    },
    { 
      title: 'Approval Rate',
      value: '73.8%',
      change: 2.1,
      trend: 'up',
      icon: Check,
      color: 'bg-indigo-100 text-indigo-700'
    },
    { 
      title: 'Default Rate',
      value: '4.2%',
      change: 0.5,
      trend: 'down',
      icon: AlertCircle,
      color: 'bg-amber-100 text-amber-700'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-4 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
              <p className="text-2xl font-bold mt-1">{metric.value}</p>
              <div className="flex items-center mt-1 text-xs">
                {metric.trend === 'up' ? (
                  <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {metric.change}%
                </span>
                <span className="text-muted-foreground ml-1">vs last {timeframe}</span>
              </div>
            </div>
            <div className={`rounded-full p-2 ${metric.color}`}>
              <metric.icon className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminMetricCards;
