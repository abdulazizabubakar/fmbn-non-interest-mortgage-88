import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Lock,
  GitBranch
} from 'lucide-react';
import AmanahLogo from '../icons/AmanahLogo';
import { useAuth } from '@/hooks/useAuth';
import SidebarHeader from './SidebarHeader';
import SidebarNavigation from './SidebarNavigation';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const moduleGroups = [
    {
      label: 'Core Modules',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
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
        { path: '/process-flows', label: 'Process Flows', icon: <GitBranch className="h-5 w-5" /> },
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-full md:w-64 sidebar-glass flex flex-col justify-between border-none md:h-screen md:sticky md:top-0 overflow-y-auto shadow-lg">
      <SidebarHeader />
      <div className="flex-1 flex flex-col">
        <SidebarNavigation onLogout={handleLogout} />
      </div>
    </aside>
  );
};

export default Sidebar;
