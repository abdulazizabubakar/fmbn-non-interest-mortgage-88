
import React from 'react';
import { Link } from 'react-router-dom';
import AmanahLogo from '../icons/AmanahLogo';

interface SidebarHeaderProps {
  linkPath?: string;
  logoClassName?: string;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  linkPath = '/dashboard',
  logoClassName = "h-28 w-auto"
}) => (
  <div className="pt-6 pb-4 flex items-center justify-center">
    <Link to={linkPath} className="flex items-center flex-col hover:scale-105 transition-transform duration-300">
      <div className="bg-fmbn-light rounded-2xl shadow-md border border-fmbn-primary/10 px-6 py-3 flex items-center justify-center">
        <AmanahLogo className={logoClassName} />
      </div>
    </Link>
  </div>
);

export default SidebarHeader;
