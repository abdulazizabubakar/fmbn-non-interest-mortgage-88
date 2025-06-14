
import React from 'react';

interface AmanahLogoProps {
  className?: string;
}

const AmanahLogo: React.FC<AmanahLogoProps> = ({ className = "h-10 w-auto" }) => {
  return (
    <div className="flex flex-col items-center">
      <img 
        src="/lovable-uploads/a7428731-0a9d-4d5a-b641-7aaa381eb971.png" 
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
