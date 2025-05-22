
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, Bell, CheckCircle, Clock, FileText, CalendarClock, CreditCard 
} from 'lucide-react';

interface NotificationsPanelProps {
  limit?: number;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ limit = 5 }) => {
  // Mock notifications
  const notifications = [
    {
      id: '1',
      title: 'Payment Due Soon',
      message: '12 customers have payments due in the next 48 hours',
      time: '2 hours ago',
      type: 'reminder',
      read: false,
      icon: CalendarClock,
    },
    {
      id: '2',
      title: 'New Default Alert',
      message: '5 accounts have moved to the 30+ days default category',
      time: '4 hours ago',
      type: 'alert',
      read: false,
      icon: AlertTriangle,
    },
    {
      id: '3',
      title: 'Documents Uploaded',
      message: 'Fatima Aliyu has uploaded property documents for verification',
      time: '10 hours ago',
      type: 'info',
      read: true,
      icon: FileText,
    },
    {
      id: '4',
      title: 'Application Approved',
      message: '3 new applications have been approved by the credit committee',
      time: '1 day ago',
      type: 'success',
      read: true,
      icon: CheckCircle,
    },
    {
      id: '5',
      title: 'Payment Received',
      message: 'Large payment of ₦15,000,000 received from Customer #4521',
      time: '1 day ago',
      type: 'info',
      read: true,
      icon: CreditCard,
    },
    {
      id: '6',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 11 PM to 2 AM',
      time: '2 days ago',
      type: 'info',
      read: true,
      icon: Clock,
    }
  ];
  
  const displayedNotifications = limit ? notifications.slice(0, limit) : notifications;
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'alert':
        return { bg: 'bg-red-100', text: 'text-red-600', iconClass: 'text-red-500' };
      case 'success':
        return { bg: 'bg-green-100', text: 'text-green-600', iconClass: 'text-green-500' };
      case 'info':
        return { bg: 'bg-blue-100', text: 'text-blue-600', iconClass: 'text-blue-500' };
      case 'reminder':
        return { bg: 'bg-amber-100', text: 'text-amber-600', iconClass: 'text-amber-500' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600', iconClass: 'text-gray-500' };
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Alerts & Notifications</CardTitle>
          <CardDescription>Recent system alerts and notifications</CardDescription>
        </div>
        <div className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              {unreadCount}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedNotifications.map((notification) => {
            const style = getNotificationStyle(notification.type);
            return (
              <div 
                key={notification.id} 
                className={`flex items-start space-x-3 p-3 rounded-lg ${notification.read ? 'bg-muted/40' : style.bg}`}
              >
                <div className={`flex-shrink-0 mt-0.5 ${style.iconClass}`}>
                  <notification.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className={`font-medium ${!notification.read ? style.text : ''}`}>{notification.title}</p>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-3">
        <Button variant="link" className="w-full text-center">
          View All Notifications
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationsPanel;
