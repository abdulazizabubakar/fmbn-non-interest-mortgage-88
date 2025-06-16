
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const menuItems = [
    { path: '/lessee-portal', label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
    { path: '/lessee-portal/application', label: 'My Application', icon: <FileText className="h-4 w-4" /> },
    { path: '/lessee-portal/payments', label: 'Payments', icon: <CreditCard className="h-4 w-4" /> },
    { path: '/lessee-portal/schedule', label: 'Payment Schedule', icon: <Calendar className="h-4 w-4" /> },
    { path: '/lessee-portal/documents', label: 'Documents', icon: <FileText className="h-4 w-4" /> },
    { path: '/lessee-portal/ownership', label: 'Ownership Tracker', icon: <ChevronRight className="h-4 w-4" /> },
    { path: '/lessee-portal/takaful', label: 'Takaful Insurance', icon: <ShieldCheck className="h-4 w-4" /> },
    { path: '/lessee-portal/statements', label: 'Statements', icon: <Receipt className="h-4 w-4" /> },
    { path: '/lessee-portal/support', label: 'Support', icon: <MessageSquare className="h-4 w-4" /> },
  ];
  
  const handleLogout = () => {
    logout();
    navigate('/login');
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
                    location.pathname === item.path || 
                    (item.path !== '/lessee-portal' && location.pathname.startsWith(item.path))
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/90 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <span className="flex items-center justify-center w-5">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-3 mb-2">
              Account
            </p>
            <div className="space-y-1">
              <Link
                to="/lessee-portal/settings"
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors",
                  location.pathname === '/lessee-portal/settings'
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/90 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <span className="flex items-center justify-center w-5"><Settings className="h-4 w-4" /></span>
                <span>Settings</span>
              </Link>
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
