
import React, { useState } from 'react';
import { CommandPalette } from '@/components/ui/command-palette';
import EnhancedDashboardLayout from './enhanced/EnhancedDashboardLayout';

interface DashboardModuleProps {
  userRole: string | null;
  userRegion?: string;
}

const DashboardModule: React.FC<DashboardModuleProps> = ({ 
  userRole,
  userRegion = 'Global'
}) => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  
  return (
    <div className="animate-fade-in font-inter min-h-screen bg-gradient-to-br from-fmbn-light via-background to-fmbn-light/50">
      <EnhancedDashboardLayout 
        userRole={userRole || 'viewer'} 
        userRegion={userRegion} 
        onCommandPaletteToggle={() => setCommandPaletteOpen(true)}
      />

      <CommandPalette 
        open={commandPaletteOpen} 
        onOpenChange={setCommandPaletteOpen} 
      />
    </div>
  );
};

export default DashboardModule;
