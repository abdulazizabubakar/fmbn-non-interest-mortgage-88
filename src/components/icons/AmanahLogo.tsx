import React from 'react';
interface AmanahLogoProps {
  className?: string;
}
const AmanahLogo: React.FC<AmanahLogoProps> = ({
  className = "h-24 w-auto"
}) => {
  return <div className="flex flex-col items-center">
      <img src="/lovable-uploads/ba5feea9-583d-46f2-9fb9-320b3a1ddfe9.png" alt="Federal Mortgage Bank Logo" className="" />
      <span className="mt-1 text-center text-emerald-950 font-bold text-xs">
        Non-Interest Mortgage Management System
      </span>
    </div>;
};
export default AmanahLogo;