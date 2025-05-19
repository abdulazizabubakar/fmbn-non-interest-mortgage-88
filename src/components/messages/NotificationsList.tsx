
import React, { useState, useEffect } from 'react';
import { Bell, AlertCircle, CheckCircle, Clock, Calendar, X, Check, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockNotifications } from '@/data/mockNotifications';
import { Notification, NotificationType } from '@/types/notifications';

interface NotificationsListProps {
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

const NotificationsList = ({ setUnreadCount }: NotificationsListProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filterType, setFilterType] = useState<NotificationType | 'all'>('all');

  useEffect(() => {
    let filteredNotifications = [...mockNotifications];
    
    if (filterType !== 'all') {
      filteredNotifications = filteredNotifications.filter(
        notification => notification.type === filterType
      );
    }
    
    setNotifications(filteredNotifications);
  }, [filterType]);

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    
    // Update the unread count
    const updatedUnreadCount = notifications.filter(n => !n.read && n.id !== id).length;
    setUnreadCount(updatedUnreadCount);
    
    toast({
      description: "Notification marked as read",
    });
  };

  const dismissNotification = (id: string) => {
    const notificationToRemove = notifications.find(n => n.id === id);
    const wasUnread = notificationToRemove && !notificationToRemove.read;
    
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
    
    // If the removed notification was unread, update the count
    if (wasUnread) {
      setUnreadCount(prevCount => prevCount - 1);
    }
    
    toast({
      description: "Notification dismissed",
    });
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    
    setUnreadCount(0);
    
    toast({
      description: "All notifications marked as read",
    });
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'info':
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationBadge = (type: NotificationType) => {
    switch (type) {
      case 'alert':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Alert</Badge>;
      case 'success':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Success</Badge>;
      case 'reminder':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">Reminder</Badge>;
      case 'info':
      default:
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Info</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterType} onValueChange={(value) => setFilterType(value as NotificationType | 'all')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="alert">Alerts</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="reminder">Reminders</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" onClick={markAllAsRead}>
          <Check className="h-4 w-4 mr-2" /> Mark all as read
        </Button>
      </div>

      <div className="space-y-1">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 rounded-md ${notification.read ? 'bg-background' : 'bg-muted'} border`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{notification.title}</h4>
                      {getNotificationBadge(notification.type)}
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{new Date(notification.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!notification.read && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8" 
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => dismissNotification(notification.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No notifications</h3>
            <p className="text-muted-foreground">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsList;
