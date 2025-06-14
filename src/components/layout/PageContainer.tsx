import React from 'react';
import {
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
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

  if (isLesseePortal) {
    // Lessee portal remains unchanged
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-background/95">
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
  }

  // Main portal: use SidebarProvider for collapsible sidebar
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col md:flex-row bg-background/95 w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          {/* Place the sidebar trigger button in the topbar area for visibility */}
          <div className="p-2 md:hidden flex items-center">
            <SidebarTrigger />
            <span className="ml-2 text-sm text-muted-foreground">Menu</span>
          </div>
          <main className={cn("flex-1 overflow-auto p-3 md:p-5 lg:p-6 max-w-[1920px] mx-auto w-full", className)}>
            <div className="container mx-auto px-0">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PageContainer;
