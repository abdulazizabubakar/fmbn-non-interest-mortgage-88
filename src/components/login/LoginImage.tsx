
import React from 'react';
import AmanahLogo from '@/components/icons/AmanahLogo';

const LoginImage = () => {
  return (
    <div className="md:w-1/2 w-full h-60 md:h-auto relative flex-shrink-0">
      <img
        src="https://images.unsplash.com/photo-1556702571-3c4244b6a512?auto=format&fit=crop&w=720&q=80"
        alt="Modern living room - Non-Interest Mortgage"
        className="object-cover w-full h-full md:rounded-l-3xl md:rounded-none rounded-t-3xl"
        loading="lazy"
        style={{ minHeight: '100%' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-fmbn-primary/20 via-white/0 to-fmbn-light/10 pointer-events-none rounded-t-3xl md:rounded-l-3xl md:rounded-none" />
      <div className="hidden md:block absolute inset-0 flex flex-col items-center justify-center">
        <AmanahLogo className="h-20 w-20 mb-3" />
        <h1 className="text-lg font-playfair font-semibold text-white text-center tracking-tight drop-shadow-lg">
          Welcome to the<br />
          <span className="text-xl md:text-2xl font-bold tracking-tight">
            Non-Interest Mortgage<br />
            Management System
          </span>
        </h1>
      </div>
    </div>
  );
};

export default LoginImage;
