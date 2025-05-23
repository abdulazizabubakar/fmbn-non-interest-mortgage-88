
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  FileText, 
  Calendar, 
  MessageSquare, 
  ShieldCheck,
  Receipt,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import AmanahLogo from '../icons/AmanahLogo';
import { useAuth } from '@/hooks/useAuth';

const LesseeSidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const menuItems = [
    { path: '/lessee-portal', label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
    { path: '#application', label: 'My Application', icon: <FileText className="h-4 w-4" /> },
    { path: '#payments', label: 'Payments', icon: <CreditCard className="h-4 w-4" /> },
    { path: '#documents', label: 'Documents', icon: <FileText className="h-4 w-4" /> },
    { path: '#ownership', label: 'Ownership Tracker', icon: <ChevronRight className="h-4 w-4" /> },
    { path: '#takaful', label: 'Takaful Insurance', icon: <ShieldCheck className="h-4 w-4" /> },
    { path: '#support', label: 'Support', icon: <MessageSquare className="h-4 w-4" /> },
    { path: '#settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ];
  
  const handleLogout = () => {
    logout();
  };

  // Function to handle anchor links within the page
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const tabId = path.substring(1); // Remove the # character
      const tabElement = document.querySelector(`[data-value="${tabId}"]`) as HTMLElement;
      
      if (tabElement) {
        // Click the tab to activate it
        tabElement.click();
        
        // Scroll the tab content into view
        const tabContent = document.querySelector(`[data-state="active"][role="tabpanel"]`);
        if (tabContent) {
          tabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  return (
    <aside className="w-full md:w-64 bg-sidebar p-4 flex flex-col justify-between border-r border-border md:h-screen md:sticky md:top-0 overflow-y-auto shadow-sm">
      <div className="space-y-6">
        <div className="flex items-center justify-center p-2">
          <Link to="/lessee-portal" className="flex items-center flex-col">
            <AmanahLogo className="h-16 w-auto" />
          </Link>
        </div>

        <nav className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-3 mb-2">
              My Mortgage
            </p>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors",
                    (location.pathname === item.path || 
                    (location.hash === item.path && item.path.startsWith('#')))
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/90 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                  onClick={(e) => handleNavigation(e, item.path)}
                >
                  <span className="flex items-center justify-center w-5">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      <div className="mt-auto pt-4 border-t border-sidebar-border/50">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-sidebar-foreground/90 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
        <div className="mt-3 px-3 py-2 text-xs text-sidebar-foreground/60">
          <p>NIMMS v1.0.0</p>
          <p>© 2024 FMBN</p>
        </div>
      </div>
    </aside>
  );
};

export default LesseeSidebar;
