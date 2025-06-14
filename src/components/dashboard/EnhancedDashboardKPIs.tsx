
import React from 'react';
import { MetricCard } from '@/components/ui/metric-card';
import { 
  Home, 
  FileText, 
  CreditCard, 
  AlertTriangle, 
  BarChart, 
  Users,
  Clock,
  TrendingUp,
  Shield
} from 'lucide-react';

interface EnhancedDashboardKPIsProps {
  userRole: string;
  region?: string;
}

const EnhancedDashboardKPIs: React.FC<EnhancedDashboardKPIsProps> = ({ userRole, region }) => {
  // Enhanced KPI data with FMBN styling
  const kpiData = [
    {
      title: 'Active Portfolios',
      value: 1243,
      previousValue: 1178,
      icon: <Home className="h-6 w-6" />,
      gradient: 'blue' as const,
      format: 'number' as const,
    },
    {
      title: 'New Applications',
      value: 356,
      previousValue: 318,
      icon: <FileText className="h-6 w-6" />,
      gradient: 'purple' as const,
      format: 'number' as const,
    },
    {
      title: 'Monthly Collections',
      value: 432800000,
      previousValue: 408500000,
      icon: <CreditCard className="h-6 w-6" />,
      gradient: 'green' as const,
      format: 'currency' as const,
    },
    {
      title: 'Risk Alerts',
      value: 86,
      previousValue: 94,
      icon: <AlertTriangle className="h-6 w-6" />,
      gradient: 'orange' as const,
      format: 'number' as const,
    },
    {
      title: userRole === 'finance_officer' ? 'Revenue YTD' : 'Completion Rate',
      value: userRole === 'finance_officer' ? 4200000000 : 94.8,
      previousValue: userRole === 'finance_officer' ? 3850000000 : 91.2,
      icon: userRole === 'finance_officer' ? <BarChart className="h-6 w-6" /> : <Shield className="h-6 w-6" />,
      gradient: userRole === 'finance_officer' ? 'pink' as const : 'blue' as const,
      format: userRole === 'finance_officer' ? 'currency' as const : 'percentage' as const,
    },
    {
      title: 'Processing Time',
      value: 12.3,
      previousValue: 13.5,
      icon: <Clock className="h-6 w-6" />,
      gradient: 'green' as const,
      format: 'number' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text font-playfair">
            Key Performance Indicators
          </h2>
          <p className="text-muted-foreground mt-1">
            Real-time insights for {region || 'All Regions'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-fmbn-primary rounded-full animate-pulse" />
          <span className="text-sm text-fmbn-primary font-medium">Live Data</span>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className="animate-scale-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className={`
              glass-card shadow-xl
              ${kpi.gradient === 'green' && 'bg-gradient-to-br from-green-50 via-white to-green-100'}
              ${kpi.gradient === 'blue' && 'bg-gradient-to-br from-blue-50 via-white to-blue-100'}
              ${kpi.gradient === 'purple' && 'bg-gradient-to-br from-purple-50 via-white to-purple-100'}
              ${kpi.gradient === 'pink' && 'bg-gradient-to-br from-pink-50 via-white to-pink-100'}
              ${kpi.gradient === 'orange' && 'bg-gradient-to-br from-amber-50 via-white to-amber-100'}
            `}>
              <MetricCard
                title={kpi.title}
                value={kpi.value}
                previousValue={kpi.previousValue}
                icon={kpi.icon}
                gradient={kpi.gradient}
                format={kpi.format}
                size="md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedDashboardKPIs;
