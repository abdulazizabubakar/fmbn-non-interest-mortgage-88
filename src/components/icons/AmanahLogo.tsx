
import React from 'react';

interface AmanahLogoProps {
  className?: string;
}

const AmanahLogo: React.FC<AmanahLogoProps> = ({ className = "h-10 w-auto" }) => {
  return (
    <div className="flex flex-col items-center">
      <img 
        src="/lovable-uploads/ed0f32a5-d7e9-4716-9a24-9b5064eb201a.png" 
        alt="Federal Mortgage Bank Logo" 
        className={className} 
      />
      <span className="text-xs text-sidebar-foreground mt-1 text-center">
        Non-Interest Mortgage Management System
      </span>
    </div>
  );
};

export default AmanahLogo;
