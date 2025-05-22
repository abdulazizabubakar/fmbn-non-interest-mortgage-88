
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Home, 
  FileText, 
  CreditCard, 
  AlertTriangle, 
  BarChart, 
  Users 
} from 'lucide-react';

interface DashboardKPIsProps {
  userRole: string;
  region?: string;
}

const DashboardKPIs: React.FC<DashboardKPIsProps> = ({ userRole, region }) => {
  // Mock data - in a real app this would come from an API
  const kpiData = [
    {
      title: 'Active Leases',
      value: '1,243',
      trend: '+5.3%',
      trendDirection: 'up',
      progress: 78,
      icon: Home,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Applications',
      value: '356',
      subtitle: '89 pending review',
      trend: '+12.7%',
      trendDirection: 'up',
      icon: FileText,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Collections MTD',
      value: '₦432.8M',
      progress: 92,
      target: '₦470M',
      icon: CreditCard,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Defaults',
      value: '86',
      subtitle: '₦124.5M at risk',
      trend: '-2.4%',
      trendDirection: 'down',
      icon: AlertTriangle,
      color: 'bg-amber-100 text-amber-600',
    },
    {
      title: userRole === 'finance' ? 'Revenue YTD' : 'Ownership Transfers',
      value: userRole === 'finance' ? '₦4.2B' : '38',
      subtitle: userRole === 'finance' ? '92% of target' : '12 in progress',
      icon: userRole === 'finance' ? BarChart : Users,
      color: userRole === 'finance' ? 'bg-indigo-100 text-indigo-600' : 'bg-cyan-100 text-cyan-600',
    },
    {
      title: 'Avg Processing Time',
      value: '12.3 days',
      trend: '-1.2 days',
      trendDirection: 'down',
      isPositive: true,
      icon: BarChart,
      color: 'bg-teal-100 text-teal-600',
    },
  ];

  // Filter KPIs based on user role if needed
  const filteredKpis = kpiData;

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
      {filteredKpis.map((kpi, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`rounded-full p-2 ${kpi.color}`}>
                <kpi.icon className="h-5 w-5" />
              </div>
              {kpi.trend && (
                <div className={`text-sm font-medium ${
                  (kpi.trendDirection === 'up' && !kpi.isPositive) || (kpi.trendDirection === 'down' && kpi.isPositive) 
                    ? 'text-red-500' 
                    : 'text-green-500'
                }`}>
                  {kpi.trend}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
              <h3 className="text-2xl font-bold">{kpi.value}</h3>
              {kpi.subtitle && (
                <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
              )}
              {kpi.progress && (
                <div className="space-y-1 pt-1">
                  <Progress value={kpi.progress} className="h-1" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{kpi.progress}%</span>
                    {kpi.target && <span>{kpi.target}</span>}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardKPIs;
