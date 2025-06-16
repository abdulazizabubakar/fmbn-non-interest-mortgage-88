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
}) => <div className="pt-6 pb-4 flex items-center justify-center">
    <Link to={linkPath} className="flex items-center flex-col hover:scale-105 transition-transform duration-300">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-4 flex items-center justify-center border border-border px-[16px] py-[16px] my-0 mx-[33px]">
        <AmanahLogo className={logoClassName} />
      </div>
    </Link>
  </div>;
export default SidebarHeader;