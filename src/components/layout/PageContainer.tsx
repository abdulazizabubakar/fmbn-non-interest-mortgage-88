
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children,
  className
}) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className={cn("flex-1 overflow-auto p-4 md:p-6 lg:p-8", className)}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageContainer;
