
import React from 'react';
import { Button } from '@/components/ui/button';

interface LoginDemoButtonsProps {
  onDemoLogin: (role: string) => void;
}

const LoginDemoButtons: React.FC<LoginDemoButtonsProps> = ({ onDemoLogin }) => {
  return (
    <div className="mt-6">
      <p className="text-sm text-center text-muted-foreground mb-2">Quick Login (Demo)</p>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" onClick={() => onDemoLogin('admin')}>
          Login as Admin
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDemoLogin('finance_officer')}>
          Login as Finance
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDemoLogin('zonal_admin')}>
          Login as Zonal
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDemoLogin('lessee')}>
          Login as Lessee
        </Button>
      </div>
    </div>
  );
};

export default LoginDemoButtons;
