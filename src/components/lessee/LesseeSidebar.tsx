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
import LesseeSidebarHeader from './LesseeSidebarHeader';
import LesseeNavigation from './LesseeNavigation';

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
      <LesseeSidebarHeader />
      <div className="flex-1 flex flex-col">
        <LesseeNavigation />
      </div>
    </aside>
  );
};

export default LesseeSidebar;
