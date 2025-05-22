
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
  MessageSquare,
  FilePlus,
  Receipt,
  CreditCard,
  Shield,
  Calendar,
  Gavel,
  AlertTriangle,
  Database,
  TrendingUp,
  Lock
} from 'lucide-react';
import AmanahLogo from '../icons/AmanahLogo';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const moduleGroups = [
    {
      label: 'Core Modules',
      items: [
        { path: '/', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
        { path: '/customers', label: 'Customers', icon: <Users className="h-5 w-5" /> },
        { path: '/applications', label: 'Applications', icon: <FilePlus className="h-5 w-5" /> },
        { path: '/mortgages', label: 'Mortgages', icon: <Briefcase className="h-5 w-5" /> },
        { path: '/properties', label: 'Properties', icon: <Building className="h-5 w-5" /> },
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
        { path: '/documents', label: 'Document Center', icon: <Receipt className="h-5 w-5" /> },
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

  return (
    <aside className="w-full md:w-64 bg-sidebar p-4 flex flex-col justify-between border-r border-border md:h-screen md:sticky md:top-0 overflow-y-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-center p-2">
          <Link to="/" className="flex items-center flex-col">
            <AmanahLogo className="h-16 w-auto" />
          </Link>
        </div>

        <nav className="space-y-6">
          {moduleGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wide px-3 mb-2">
                {group.label}
              </p>
              {group.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path || 
                    (item.path !== '/' && location.pathname.startsWith(item.path))
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          ))}

          <div className="space-y-1">
            <p className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wide px-3 mb-2">
              Administration
            </p>
            {adminItems.map((item) => (
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
          </div>
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
