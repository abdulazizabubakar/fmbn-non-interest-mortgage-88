
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
    <div className="min-h-screen flex flex-col md:flex-row bg-background/95">
      <Sidebar />
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
