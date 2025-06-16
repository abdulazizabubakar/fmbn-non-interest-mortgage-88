
import React from 'react';
import { EnhancedCard, EnhancedCardContent } from '@/components/ui/enhanced-card';
import { Users, BarChart3, Home } from 'lucide-react';

interface ZonalMetricsCardsProps {
  region?: string;
}

const ZonalMetricsCards: React.FC<ZonalMetricsCardsProps> = ({ region }) => {
  const metrics = [
    { title: 'Active Leases', value: '287', change: '↑ 4.2% from last month', gradient: 'blue' as const, icon: <Users className="h-6 w-6 text-blue-600" /> },
    { title: 'Collection Rate', value: '94.3%', change: '↑ 1.5% from last month', gradient: 'green' as const, icon: <BarChart3 className="h-6 w-6 text-green-600" /> },
    { title: 'Properties', value: '225', change: '+12 new this month', gradient: 'orange' as const, icon: <Home className="h-6 w-6 text-orange-600" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric) => (
        <EnhancedCard key={metric.title} gradient={metric.gradient} hover glow>
          <EnhancedCardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{metric.title}</p>
                <p className="text-3xl font-bold mt-1 text-gray-800">{metric.value}</p>
              </div>
              <div className="p-3 bg-white/50 rounded-xl shadow-inner">
                {metric.icon}
              </div>
            </div>
            <p className="text-xs mt-2 font-medium text-gray-500">{metric.change}</p>
          </EnhancedCardContent>
        </EnhancedCard>
      ))}
    </div>
  );
};

export default ZonalMetricsCards;
