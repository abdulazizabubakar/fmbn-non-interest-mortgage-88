
import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Menu, 
  X,
  CheckCircle,
  AlertCircle,
  InfoIcon,
  AlertTriangle,
  User,
  Settings,
  HelpCircle,
  LogOut
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
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <header className="border-b border-border bg-background p-2 md:p-3 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-9 w-9"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex relative flex-1 max-w-md mx-auto md:mx-0">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              className="w-full h-9 pl-9 pr-4 text-sm bg-muted/50 focus-visible:bg-background border-muted focus-visible:ring-nimms-primary/30"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-1 md:space-x-2">
          {/* Help */}
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hidden md:flex">
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          {/* Settings */}
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hidden md:flex">
            <Settings className="h-5 w-5" />
          </Button>
          
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-nimms-accent flex items-center justify-center text-xs text-white font-medium">{unreadCount}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 shadow-md" align="end">
              <div className="p-3 border-b border-border bg-muted/30">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-[70vh] overflow-y-auto">
                {mockNotifications.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    <Bell className="mx-auto h-10 w-10 mb-2 opacity-20" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  mockNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-3 border-b border-border flex items-start gap-3 hover:bg-muted/50 transition-colors",
                        !notification.read && "bg-muted/30"
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
                  ))
                )}
              </div>
              <div className="p-2 border-t border-border">
                <Button variant="ghost" className="w-full text-center text-sm h-9">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-nimms-primary/10 text-nimms-primary">AU</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm hidden md:inline-block">Admin User</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 shadow-md" align="end">
              <div className="p-2 border-b border-border flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-nimms-primary/10 text-nimms-primary">AU</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm leading-none">Admin User</p>
                  <p className="text-xs text-muted-foreground mt-1">admin@fmbn.gov.ng</p>
                </div>
              </div>
              <div className="p-2">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help Center</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
