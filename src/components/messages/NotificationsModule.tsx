
import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Filter, Check, X, ChevronDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { mockNotifications } from '@/data/mockNotifications';
import { NotificationType } from '@/types/notifications';
import NotificationsList from './NotificationsList';
import InboxMessages from './InboxMessages';
import NotificationSettings from './NotificationSettings';

const NotificationsModule = () => {
  const [unreadCount, setUnreadCount] = useState(mockNotifications.filter(n => !n.read).length);
  const [activeTab, setActiveTab] = useState('notifications');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const notificationStats = [
    { title: "Unread Notifications", value: unreadCount, icon: Bell, className: "text-amber-500" },
    { title: "System Messages", value: "12", icon: Mail, className: "text-blue-500" },
    { title: "Chat Messages", value: "5", icon: MessageSquare, className: "text-green-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {notificationStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-center space-x-4">
              <div className={`rounded-full p-2 ${stat.className} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.className}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Messages & Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="notifications" className="relative">
                Notifications
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-primary px-1.5 absolute -top-2 -right-2 text-[10px]">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="inbox">Inbox</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="notifications" className="space-y-4 mt-4">
              <NotificationsList setUnreadCount={setUnreadCount} />
            </TabsContent>
            
            <TabsContent value="inbox" className="space-y-4 mt-4">
              <InboxMessages />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 mt-4">
              <NotificationSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsModule;
