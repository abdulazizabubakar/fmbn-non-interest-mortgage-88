
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  FileText, 
  Users, 
  Calculator,
  CreditCard,
  AlertTriangle,
  Clock,
  CheckCircle
} from 'lucide-react';

interface QuickActionsPanelProps {
  userRole: string;
}

const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({ userRole }) => {
  const quickActions = [
    {
      title: 'New Application',
      description: 'Start a new mortgage application',
      icon: <Plus className="h-4 w-4" />,
      variant: 'default' as const,
      count: null
    },
    {
      title: 'Review Applications',
      description: 'Pending applications awaiting review',
      icon: <FileText className="h-4 w-4" />,
      variant: 'outline' as const,
      count: 12
    },
    {
      title: 'Customer Support',
      description: 'Active support tickets',
      icon: <Users className="h-4 w-4" />,
      variant: 'outline' as const,
      count: 5
    },
    {
      title: 'Calculate Eligibility',
      description: 'Mortgage eligibility calculator',
      icon: <Calculator className="h-4 w-4" />,
      variant: 'outline' as const,
      count: null
    }
  ];

  const recentActivities = [
    {
      title: 'Application #APP-2024-001 approved',
      time: '2 minutes ago',
      status: 'success',
      icon: <CheckCircle className="h-4 w-4 text-green-500" />
    },
    {
      title: 'Payment collection overdue',
      time: '15 minutes ago',
      status: 'warning',
      icon: <AlertTriangle className="h-4 w-4 text-orange-500" />
    },
    {
      title: 'New disbursement request',
      time: '1 hour ago',
      status: 'info',
      icon: <CreditCard className="h-4 w-4 text-blue-500" />
    },
    {
      title: 'System maintenance scheduled',
      time: '2 hours ago',
      status: 'info',
      icon: <Clock className="h-4 w-4 text-blue-500" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="w-full justify-between h-auto p-4 text-left"
            >
              <div className="flex items-center space-x-3">
                {action.icon}
                <div>
                  <p className="font-medium">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
              {action.count && (
                <Badge variant="secondary">{action.count}</Badge>
              )}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
              {activity.icon}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export { QuickActionsPanel };
