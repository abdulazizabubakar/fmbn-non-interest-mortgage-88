
import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Menu, 
  X,
  CheckCircle,
  AlertCircle,
  InfoIcon,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { mockNotifications } from '@/data/mockData';
import { Notification } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const Topbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <header className="border-b border-border bg-background p-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex relative flex-1 max-w-md mx-auto md:mx-0">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="search"
              className="w-full pl-10 py-2 pr-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-nimms-primary bg-muted"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-nimms-accent" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b border-border">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 border-b border-border flex items-start gap-3 hover:bg-muted transition-colors",
                      !notification.read && "bg-muted/50"
                    )}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-2">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-border">
                <Button variant="ghost" className="w-full text-center text-sm">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User profile */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm hidden md:inline-block">Admin User</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end">
              <div className="p-4 border-b border-border">
                <p className="font-medium">Admin User</p>
                <p className="text-sm text-muted-foreground">admin@fmbn.gov.ng</p>
              </div>
              <div className="p-2">
                <ul className="space-y-1">
                  <li>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      Profile
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      Settings
                    </Button>
                  </li>
                  <li className="border-t border-border pt-1 mt-1">
                    <Button variant="ghost" className="w-full justify-start text-sm text-destructive">
                      Logout
                    </Button>
                  </li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
