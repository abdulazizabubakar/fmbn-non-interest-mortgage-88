
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, Home, CreditCard, Users, AlertTriangle, BarChart, CalendarClock
} from 'lucide-react';

interface ActionShortcutsProps {
  userRole?: string;
}

const ActionShortcuts: React.FC<ActionShortcutsProps> = ({ userRole = 'admin' }) => {
  // Define action shortcuts based on user role
  const getShortcutsByRole = () => {
    const common = [
      {
        title: 'Review Applications',
        description: '15 applications pending review',
        icon: FileText,
        action: '/applications',
        color: 'bg-blue-100 text-blue-600',
      },
      {
        title: 'Property Management',
        description: 'Manage properties and listings',
        icon: Home,
        action: '/properties',
        color: 'bg-green-100 text-green-600',
      }
    ];
    
    switch (userRole) {
      case 'finance':
        return [
          ...common,
          {
            title: 'Payment Collection',
            description: 'Process incoming payments',
            icon: CreditCard,
            action: '/payments',
            color: 'bg-indigo-100 text-indigo-600',
          },
          {
            title: 'Financial Reports',
            description: 'Generate financial reports',
            icon: BarChart,
            action: '/reports?type=financial',
            color: 'bg-purple-100 text-purple-600',
          },
        ];
      case 'legal':
        return [
          ...common,
          {
            title: 'Ownership Transfers',
            description: '8 transfers pending approval',
            icon: Users,
            action: '/transfers',
            color: 'bg-amber-100 text-amber-600',
          },
          {
            title: 'Default Management',
            description: 'Handle defaulting accounts',
            icon: AlertTriangle,
            action: '/defaults',
            color: 'bg-red-100 text-red-600',
          },
        ];
      default:
        return [
          ...common,
          {
            title: 'Send Payment Reminders',
            description: 'Notify customers of upcoming payments',
            icon: CalendarClock,
            action: '/notifications/send',
            color: 'bg-amber-100 text-amber-600',
          },
          {
            title: 'View Daily Collections',
            description: 'Today\'s payment collections report',
            icon: BarChart,
            action: '/reports/daily-collections',
            color: 'bg-indigo-100 text-indigo-600',
          },
        ];
    }
  };

  const shortcuts = getShortcutsByRole();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {shortcuts.map((shortcut, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto flex-col items-start justify-start p-4 text-left gap-2"
              onClick={() => window.location.href = shortcut.action}
            >
              <div className={`rounded-full p-2 ${shortcut.color}`}>
                <shortcut.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{shortcut.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{shortcut.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionShortcuts;
