
import React from 'react';
import { Link } from 'react-router-dom';
import AmanahLogo from '../icons/AmanahLogo';

interface LesseeSidebarHeaderProps {
  logoClassName?: string;
  linkPath?: string;
}

const LesseeSidebarHeader: React.FC<LesseeSidebarHeaderProps> = ({
  logoClassName = "h-16 w-auto",
  linkPath = '/lessee-portal'
}) => {
  return (
    <div className="flex items-center justify-center p-2">
      <Link to={linkPath} className="flex items-center flex-col">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-3 border border-border">
          <AmanahLogo className={logoClassName} />
        </div>
      </Link>
    </div>
  );
};

export default LesseeSidebarHeader;
