
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  Briefcase,
  ClipboardList,
  Building,
  MessageSquare
} from 'lucide-react';
import AmanahLogo from '../icons/AmanahLogo';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { path: '/customers', label: 'Customers', icon: <Users className="h-5 w-5" /> },
    { path: '/mortgages', label: 'Mortgages', icon: <Briefcase className="h-5 w-5" /> },
    { path: '/applications', label: 'Applications', icon: <ClipboardList className="h-5 w-5" /> },
    { path: '/properties', label: 'Properties', icon: <Building className="h-5 w-5" /> },
    { path: '/reports', label: 'Reports', icon: <FileText className="h-5 w-5" /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { path: '/messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <aside className="w-full md:w-64 bg-sidebar p-4 flex flex-col justify-between border-r border-border md:h-screen md:sticky md:top-0">
      <div className="space-y-6">
        <div className="flex items-center justify-center md:justify-start p-2">
          <Link to="/" className="flex items-center space-x-2">
            <AmanahLogo />
          </Link>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto pt-4 border-t border-sidebar-border">
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
        <div className="mt-4 px-3 py-2 text-xs text-sidebar-foreground/70">
          <p>NIMMS v1.0.0</p>
          <p>© 2024 FMBN</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
