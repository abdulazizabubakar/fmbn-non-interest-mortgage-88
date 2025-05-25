
import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Users, 
  Home, 
  FileCheck,
  AlertTriangle,
  Target
} from 'lucide-react';
import MetricCard from './MetricCard';
import MetricDetailView from './MetricDetailView';

interface InteractiveMetricsGridProps {
  userRole: string;
  userRegion: string;
  realTimeEnabled: boolean;
}

const InteractiveMetricsGrid: React.FC<InteractiveMetricsGridProps> = ({
  userRole,
  userRegion,
  realTimeEnabled
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Simulate real-time data updates
  useEffect(() => {
    if (realTimeEnabled) {
      const interval = setInterval(() => {
        setAnimationKey(prev => prev + 1);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [realTimeEnabled]);

  const metrics = [
    {
      id: 'portfolio',
      title: 'Total Portfolio',
      value: '₦45.8B',
      change: '+12.3%',
      trend: 'up' as const,
      icon: DollarSign,
      description: 'Total mortgage portfolio value',
      chartType: 'line',
      color: 'blue'
    },
    {
      id: 'applications',
      title: 'Active Applications',
      value: '1,243',
      change: '+5.3%',
      trend: 'up' as const,
      icon: FileCheck,
      description: 'Applications in progress',
      chartType: 'area',
      color: 'green'
    },
    {
      id: 'properties',
      title: 'Properties',
      value: '856',
      change: '+2.1%',
      trend: 'up' as const,
      icon: Home,
      description: 'Registered properties',
      chartType: 'line',
      color: 'purple'
    },
    {
      id: 'users',
      title: 'Active Users',
      value: '2,841',
      change: '+8.7%',
      trend: 'up' as const,
      icon: Users,
      description: 'Monthly active users',
      chartType: 'area',
      color: 'indigo'
    },
    {
      id: 'completion',
      title: 'Completion Rate',
      value: '87.5%',
      change: '+3.2%',
      trend: 'up' as const,
      icon: Target,
      description: 'Process completion rate',
      chartType: 'progress',
      color: 'emerald'
    },
    {
      id: 'alerts',
      title: 'Active Alerts',
      value: '24',
      change: '-15.8%',
      trend: 'down' as const,
      icon: AlertTriangle,
      description: 'System alerts',
      chartType: 'pie',
      color: 'red'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            isSelected={selectedMetric === metric.id}
            realTimeEnabled={realTimeEnabled}
            animationKey={animationKey}
            onSelect={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
          />
        ))}
      </div>

      {/* Detailed View for Selected Metric */}
      {selectedMetric && (
        <MetricDetailView
          selectedMetric={selectedMetric}
          metrics={metrics}
          onClose={() => setSelectedMetric(null)}
        />
      )}
    </div>
  );
};

export default InteractiveMetricsGrid;
