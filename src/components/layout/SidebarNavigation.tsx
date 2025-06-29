
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, Users, FileText, BarChart3, Settings, LogOut, Briefcase,
  ClipboardList, Building, MessageSquare, FilePlus, Receipt, CreditCard,
  Shield, Calendar, Gavel, AlertTriangle, Database, TrendingUp, Lock, GitBranch,
  Handshake, Monitor
} from 'lucide-react';

interface SidebarNavigationProps {
  onLogout: () => void;
}

const moduleGroups = [
  {
    label: 'Core Modules',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
      { path: '/customers', label: 'Customers', icon: <Users className="h-5 w-5" /> },
      { path: '/applications', label: 'Applications', icon: <FilePlus className="h-5 w-5" /> },
      { path: '/mortgages', label: 'Mortgages', icon: <Briefcase className="h-5 w-5" /> },
      { path: '/properties', label: 'Properties', icon: <Building className="h-5 w-5" /> },
      { path: '/developer-management', label: 'Partners & Developers', icon: <Handshake className="h-5 w-5" /> },
    ]
  },
  {
    label: 'Finance Operations',
    items: [
      { path: '/finance', label: 'Finance Dashboard', icon: <BarChart3 className="h-5 w-5" /> },
      { path: '/finance/operations', label: 'Operations', icon: <CreditCard className="h-5 w-5" /> },
      { path: '/finance/disbursements', label: 'Disbursements', icon: <CreditCard className="h-5 w-5" /> },
      { path: '/finance/repayments', label: 'Repayments', icon: <Calendar className="h-5 w-5" /> },
      { path: '/finance/subsidies', label: 'Subsidies', icon: <Receipt className="h-5 w-5" /> },
      { path: '/finance/exceptions', label: 'Exceptions', icon: <AlertTriangle className="h-5 w-5" /> },
      { path: '/finance/risk', label: 'Risk Assessment', icon: <Shield className="h-5 w-5" /> },
      { path: '/finance/compliance', label: 'Shariah Compliance', icon: <Gavel className="h-5 w-5" /> },
      { path: '/finance/delinquency', label: 'Delinquency', icon: <AlertTriangle className="h-5 w-5" /> },
    ]
  },
  {
    label: 'Other Modules',
    items: [
      { path: '/process-flows', label: 'Process Flows', icon: <GitBranch className="h-5 w-5" /> },
      { path: '/monitoring', label: 'Monitoring & Reporting', icon: <Monitor className="h-5 w-5" /> },
      { path: '/documents', label: 'Document Center', icon: <FileText className="h-5 w-5" /> },
      { path: '/messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
      { path: '/integrations', label: 'Integrations', icon: <Database className="h-5 w-5" /> },
      { path: '/reports', label: 'Reports', icon: <FileText className="h-5 w-5" /> },
      { path: '/analytics', label: 'Analytics', icon: <TrendingUp className="h-5 w-5" /> },
    ]
  },
];

const adminItems = [
  { path: '/security', label: 'Security', icon: <Lock className="h-5 w-5" /> },
  { path: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
];

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ onLogout }) => {
  const location = useLocation();

  return (
    <nav className="space-y-7 flex-1">
      {moduleGroups.map((group, idx) => (
        <div key={idx} className="space-y-2 px-1">
          <p className="sidebar-label">{group.label}</p>
          <div className="space-y-1">
            {group.items.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-2 rounded-lg font-medium group text-sm transition-all hover:scale-[1.04] hover:shadow-md hover:bg-blue-50/50",
                    isActive
                      ? "active-gradient shadow active:scale-[1.01]"
                      : "text-sidebar-foreground/90 hover:text-blue-700"
                  )}
                >
                  <span className={cn("w-6 h-6 flex items-center justify-center", isActive && "text-white")}>
                    {item.icon}
                  </span>
                  <span className={cn("tracking-tight", isActive && "text-white font-semibold")}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      <div className="space-y-2 px-1">
        <p className="sidebar-label">Administration</p>
        <div className="space-y-1">
          {adminItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 px-4 py-2 rounded-lg font-medium group text-sm transition-all hover:scale-[1.04] hover:shadow-md hover:bg-blue-50/40",
                  isActive
                    ? "active-gradient shadow active:scale-[1.01]"
                    : "text-sidebar-foreground/90 hover:text-blue-700"
                )}
              >
                <span className={cn("w-6 h-6 flex items-center justify-center", isActive && "text-white")}>
                  {item.icon}
                </span>
                <span className={cn("tracking-tight", isActive && "text-white font-semibold")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-auto pt-6 pb-3 px-4 border-t border-blue-100/40">
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-sm text-sidebar-foreground/90 hover:bg-red-50 hover:text-red-700 group transition-all font-medium"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
        <div className="mt-3 px-1 py-2 text-xs text-sidebar-foreground/60 flex flex-col items-center">
          <p className="tracking-wide">NIMMS v1.0.0</p>
          <p>© 2024 FMBN</p>
        </div>
      </div>
    </nav>
  );
};

export default SidebarNavigation;
