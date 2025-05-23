
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Bell, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, description }) => {
  const { user } = useAuth();
  const currentDate = new Date().toLocaleDateString('en-GB', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Simulated notification count - would come from a notifications service
  const notificationCount = 3;
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-nimms-primary">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <Calendar className="h-4 w-4 mr-2" />
          {currentDate}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <span className="font-medium">Notifications</span>
              <Badge variant="outline">New</Badge>
            </div>
            <DropdownMenuItem className="py-2 cursor-pointer">
              <div>
                <p className="font-medium">Payment reminder</p>
                <p className="text-sm text-muted-foreground">A payment is due in 3 days</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 cursor-pointer">
              <div>
                <p className="font-medium">New application</p>
                <p className="text-sm text-muted-foreground">A new application has been submitted</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 cursor-pointer">
              <div>
                <p className="font-medium">Document approved</p>
                <p className="text-sm text-muted-foreground">Your document has been approved</p>
              </div>
            </DropdownMenuItem>
            <div className="px-4 py-2 border-t">
              <Button variant="ghost" size="sm" className="w-full">View all notifications</Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="hidden md:flex items-center">
          <p className="text-sm font-medium mr-2">
            Welcome, <span className="text-nimms-primary">{user?.name || 'User'}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
