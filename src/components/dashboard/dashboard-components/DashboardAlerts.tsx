
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { UserRole } from '@/types/user';
import { AlertCircle, Clock, Check, Ban, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardAlertsProps {
  role: UserRole | null;
  region: string;
}

// Mock alert data - in a real system, this would come from an API
const mockAlerts = [
  {
    id: '1',
    type: 'warning',
    title: 'Payment Due Reminder',
    description: '15 lessees have payments due in the next 7 days',
    roles: ['admin', 'finance_officer', 'zonal_admin'],
    actionText: 'Send Reminders',
    icon: Clock,
  },
  {
    id: '2',
    type: 'info',
    title: 'New Applications',
    description: '8 new applications require review',
    roles: ['admin', 'super_admin', 'legal_officer', 'zonal_admin', 'application_officer'],
    actionText: 'Review Now',
    icon: AlertCircle,
  },
  {
    id: '3',
    type: 'success',
    title: 'Mortgage Disbursements',
    description: '5 mortgages were successfully disbursed today',
    roles: ['admin', 'super_admin', 'finance_officer', 'treasury_officer'],
    actionText: 'View Details',
    icon: Check,
  },
  {
    id: '4',
    type: 'error',
    title: 'Failed Payments',
    description: '3 payment attempts failed in the last 24 hours',
    roles: ['admin', 'finance_officer', 'treasury_officer'],
    actionText: 'Investigate',
    icon: Ban,
  },
  {
    id: '5',
    type: 'warning',
    title: 'Property Inspections',
    description: '7 properties are due for inspection this week',
    roles: ['admin', 'property_officer', 'zonal_admin'],
    actionText: 'Schedule Inspections',
    icon: AlertTriangle,
  }
];

const DashboardAlerts: React.FC<DashboardAlertsProps> = ({ role, region }) => {
  // Filter alerts based on role
  const filteredAlerts = mockAlerts.filter(alert => {
    if (!role) return false;
    return alert.roles.includes(role);
  });
  
  if (filteredAlerts.length === 0) {
    return null;
  }
  
  return (
    <Card className="border-dashed">
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">Alerts & Notifications</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="grid gap-4">
          {filteredAlerts.map(alert => (
            <Alert
              key={alert.id}
              variant={alert.type === 'info' ? 'default' : alert.type as 'warning' | 'destructive' | 'default'}
              className={`
                ${alert.type === 'success' ? 'border-green-500 bg-green-50 text-green-800' : ''}
                ${alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50 text-yellow-800' : ''}
                ${alert.type === 'error' ? 'border-red-500 bg-red-50 text-red-800' : ''}
                ${alert.type === 'info' ? 'border-blue-500 bg-blue-50 text-blue-800' : ''}
              `}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <alert.icon className={`h-5 w-5 ${
                    alert.type === 'success' ? 'text-green-600' : 
                    alert.type === 'warning' ? 'text-yellow-600' : 
                    alert.type === 'error' ? 'text-red-600' : 
                    'text-blue-600'
                  }`} />
                  <div>
                    <AlertTitle className="mb-1">{alert.title}</AlertTitle>
                    <AlertDescription>{alert.description}</AlertDescription>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="whitespace-nowrap">
                  {alert.actionText}
                </Button>
              </div>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardAlerts;
