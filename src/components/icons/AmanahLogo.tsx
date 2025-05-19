
import React from 'react';

interface AmanahLogoProps {
  className?: string;
}

const AmanahLogo: React.FC<AmanahLogoProps> = ({ className = "h-10 w-auto" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="60" height="60" rx="8" fill="#00685e" />
      <path
        d="M15 20C15 17.2386 17.2386 15 20 15H40C42.7614 15 45 17.2386 45 20V40C45 42.7614 42.7614 45 40 45H20C17.2386 45 15 42.7614 15 40V20Z"
        fill="#f4a100"
      />
      <path
        d="M25 30L30 25L35 30M30 25V40"
        stroke="#00685e"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="70"
        y="35"
        fontFamily="Arial"
        fontSize="18"
        fontWeight="700"
        fill="#00685e"
      >
        AMANAH
      </text>
      <text
        x="70"
        y="50"
        fontFamily="Arial"
        fontSize="10"
        fill="#00685e"
      >
        MORTGAGE HUB
      </text>
    </svg>
  );
};

export default AmanahLogo;
