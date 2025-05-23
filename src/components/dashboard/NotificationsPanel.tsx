
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Bell, Calendar, CheckCircle, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationsPanelProps {
  userRole: string;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ userRole }) => {
  // Mock notifications data based on user role
  const notifications = [
    {
      id: 'notif-1',
      type: 'payment-due',
      title: '8 payments due today',
      description: 'Reminder notifications have been sent to customers',
      time: '2 hours ago',
      priority: 'medium',
      roles: ['admin', 'finance_officer', 'treasury_officer']
    },
    {
      id: 'notif-2',
      type: 'default-alert',
      title: '3 accounts entered default status',
      description: 'Accounts have missed payments for over 90 days',
      time: '4 hours ago',
      priority: 'high',
      roles: ['admin', 'finance_officer', 'manager']
    },
    {
      id: 'notif-3',
      type: 'document-upload',
      title: 'New documents uploaded',
      description: '12 mortgage applications awaiting document verification',
      time: 'Yesterday',
      priority: 'medium',
      roles: ['admin', 'application_officer', 'legal_officer']
    },
    {
      id: 'notif-4',
      type: 'contract-signing',
      title: 'Contracts awaiting signature',
      description: '5 contracts pending customer signatures',
      time: 'Yesterday',
      priority: 'low',
      roles: ['admin', 'legal_officer', 'application_officer']
    },
    {
      id: 'notif-5',
      type: 'system-alert',
      title: 'Database backup completed',
      description: 'Daily backup completed successfully',
      time: 'Yesterday',
      priority: 'low',
      roles: ['admin', 'super_admin']
    }
  ];

  // Filter notifications based on user role
  const filteredNotifications = notifications.filter(notif => 
    notif.roles.includes(userRole as any) || userRole === 'admin' || userRole === 'super_admin'
  );

  // Get icon based on notification type
  const getIcon = (type: string) => {
    switch(type) {
      case 'payment-due':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'default-alert':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'document-upload':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'contract-signing':
        return <Info className="h-4 w-4 text-amber-500" />;
      case 'system-alert':
        return <Bell className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  // Get background color based on priority
  const getBgColor = (priority: string) => {
    switch(priority) {
      case 'high':
        return 'bg-red-50';
      case 'medium':
        return 'bg-amber-50';
      case 'low':
        return 'bg-blue-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
        <span className="text-xs text-muted-foreground">
          {filteredNotifications.length} new
        </span>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[350px] overflow-auto">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-3 rounded-lg border ${getBgColor(notification.priority)} flex gap-3 items-start`}
            >
              <div className="mt-0.5">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{notification.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" /> {notification.time}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-20" />
            <p>No new notifications</p>
          </div>
        )}
      </CardContent>
      {filteredNotifications.length > 0 && (
        <div className="px-4 pb-3 pt-1">
          <Button variant="outline" size="sm" className="w-full">
            View All Notifications
          </Button>
        </div>
      )}
    </Card>
  );
};

export default NotificationsPanel;
