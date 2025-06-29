
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  FileText, 
  CheckCircle, 
  CreditCard, 
  Shield, 
  DollarSign,
  Clock,
  Activity
} from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'application' | 'approval' | 'disbursement' | 'document' | 'payment';
  title: string;
  description: string;
  time: string;
  status: string;
  user: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <FileText className="h-4 w-4" />;
      case 'approval':
        return <CheckCircle className="h-4 w-4" />;
      case 'disbursement':
        return <DollarSign className="h-4 w-4" />;
      case 'document':
        return <Shield className="h-4 w-4" />;
      case 'payment':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'application':
        return 'bg-blue-100 text-blue-600';
      case 'approval':
        return 'bg-green-100 text-green-600';
      case 'disbursement':
        return 'bg-purple-100 text-purple-600';
      case 'document':
        return 'bg-orange-100 text-orange-600';
      case 'payment':
        return 'bg-emerald-100 text-emerald-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { variant: 'default' as const, className: 'bg-blue-100 text-blue-700 border-blue-200' },
      approved: { variant: 'default' as const, className: 'bg-green-100 text-green-700 border-green-200' },
      completed: { variant: 'default' as const, className: 'bg-purple-100 text-purple-700 border-purple-200' },
      verified: { variant: 'default' as const, className: 'bg-orange-100 text-orange-700 border-orange-200' },
      received: { variant: 'default' as const, className: 'bg-emerald-100 text-emerald-700 border-emerald-200' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Recent Activities
        </CardTitle>
        <CardDescription>
          Latest system activities and user interactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.description}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {getStatusBadge(activity.status)}
                  </div>
                </div>
                
                <div className="flex items-center mt-2 space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-gray-100">
                      {getUserInitials(activity.user)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-500">{activity.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
