
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children,
  className
}) => {
  const location = useLocation();
  // Check if the current path is the lessee portal
  const isLesseePortal = location.pathname.includes('lessee-portal');
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background/95">
      {!isLesseePortal && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className={cn("flex-1 overflow-auto p-3 md:p-5 lg:p-6 max-w-[1920px] mx-auto w-full", className)}>
          <div className="container mx-auto px-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageContainer;
