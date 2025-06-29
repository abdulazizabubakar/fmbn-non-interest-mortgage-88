
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Home, 
  CreditCard, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
  description: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, trend, color, description }) => {
  const getIcon = (title: string) => {
    if (title.includes('Application')) return FileText;
    if (title.includes('Mortgage')) return Home;
    if (title.includes('Collection') || title.includes('Payment')) return CreditCard;
    if (title.includes('Portfolio') || title.includes('Value')) return TrendingUp;
    if (title.includes('User')) return Users;
    if (title.includes('Alert') || title.includes('Risk')) return AlertTriangle;
    return FileText;
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-l-blue-500 bg-blue-50/50',
      green: 'border-l-green-500 bg-green-50/50',
      purple: 'border-l-purple-500 bg-purple-50/50',
      orange: 'border-l-orange-500 bg-orange-50/50',
      pink: 'border-l-pink-500 bg-pink-50/50',
      red: 'border-l-red-500 bg-red-50/50'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      orange: 'text-orange-600 bg-orange-100',
      pink: 'text-pink-600 bg-pink-100',
      red: 'text-red-600 bg-red-100'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const Icon = getIcon(title);

  return (
    <Card className={`border-l-4 ${getColorClasses(color)} transition-all duration-200 hover:shadow-lg hover:scale-105`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${getIconColor(color)}`}>
            <Icon className="h-5 w-5" />
          </div>
          <Badge 
            variant={trend === 'up' ? 'default' : 'secondary'}
            className={`${
              trend === 'up' 
                ? 'bg-green-100 text-green-700 border-green-200' 
                : 'bg-red-100 text-red-700 border-red-200'
            }`}
          >
            {trend === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {change}
          </Badge>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface KPIGridProps {
  kpiData: Array<{
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    color: string;
    description: string;
  }>;
}

const KPIGrid: React.FC<KPIGridProps> = ({ kpiData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {kpiData.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default KPIGrid;
