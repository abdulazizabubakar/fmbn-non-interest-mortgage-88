
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Search, Users, Wrench, Bell } from 'lucide-react';
import { toast } from 'sonner';

interface AdminActionCardsProps {
  region: string;
}

const AdminActionCards: React.FC<AdminActionCardsProps> = ({ region }) => {
  // Handler for quick actions
  const handleAction = (action: string) => {
    toast.success(`Action initiated: ${action}`);
    // In a real system, would navigate or trigger specific functions
  };
  
  const quickActions = [
    {
      title: 'Review Applications',
      description: '12 pending applications require review',
      icon: FileText,
      action: () => handleAction('Review Applications')
    },
    {
      title: 'Inspect Properties',
      description: '7 properties due for inspection this week',
      icon: Search,
      action: () => handleAction('Inspect Properties')
    },
    {
      title: 'User Access Reviews',
      description: '5 new users awaiting approval',
      icon: Users,
      action: () => handleAction('User Access Reviews')
    },
    {
      title: 'System Maintenance',
      description: 'Scheduled system updates available',
      icon: Wrench,
      action: () => handleAction('System Maintenance')
    },
    {
      title: 'Send Customer Notifications',
      description: 'Payment reminders for 25 accounts',
      icon: Bell,
      action: () => handleAction('Send Notifications')
    }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>Common administrative tasks requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {quickActions.map((action, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              onClick={action.action}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-muted p-2">
                  <action.icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{action.title}</h4>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminActionCards;
