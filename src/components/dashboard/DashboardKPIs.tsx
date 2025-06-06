
import React from 'react';
import { ModernMetricsCard } from './enhanced/ModernMetricsCard';
import { 
  Home, 
  FileText, 
  CreditCard, 
  AlertTriangle, 
  BarChart, 
  Users,
  Clock,
  TrendingUp
} from 'lucide-react';

interface DashboardKPIsProps {
  userRole: string;
  region?: string;
}

const DashboardKPIs: React.FC<DashboardKPIsProps> = ({ userRole, region }) => {
  // Mock data with previous values for trend calculation
  const kpiData = [
    {
      title: 'Active Leases',
      value: 1243,
      previousValue: 1178,
      icon: <Home className="h-6 w-6" />,
      gradient: 'blue' as const,
      format: 'number' as const,
    },
    {
      title: 'Applications',
      value: 356,
      previousValue: 318,
      icon: <FileText className="h-6 w-6" />,
      gradient: 'purple' as const,
      format: 'number' as const,
    },
    {
      title: 'Collections MTD',
      value: 432800000,
      previousValue: 408500000,
      icon: <CreditCard className="h-6 w-6" />,
      gradient: 'green' as const,
      format: 'currency' as const,
    },
    {
      title: 'Defaults',
      value: 86,
      previousValue: 94,
      icon: <AlertTriangle className="h-6 w-6" />,
      gradient: 'orange' as const,
      format: 'number' as const,
    },
    {
      title: userRole === 'finance' ? 'Revenue YTD' : 'Ownership Transfers',
      value: userRole === 'finance' ? 4200000000 : 38,
      previousValue: userRole === 'finance' ? 3850000000 : 32,
      icon: userRole === 'finance' ? <BarChart className="h-6 w-6" /> : <Users className="h-6 w-6" />,
      gradient: userRole === 'finance' ? 'pink' as const : 'blue' as const,
      format: userRole === 'finance' ? 'currency' as const : 'number' as const,
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
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 animate-fade-in">
      {kpiData.map((kpi, index) => (
        <div
          key={index}
          className="animate-scale-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <ModernMetricsCard
            title={kpi.title}
            value={kpi.value}
            previousValue={kpi.previousValue}
            icon={kpi.icon}
            gradient={kpi.gradient}
            format={kpi.format}
          />
        </div>
      ))}
    </div>
  );
};

export default DashboardKPIs;
