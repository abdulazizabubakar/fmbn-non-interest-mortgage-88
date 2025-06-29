
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, ModuleAccess, PermissionAction } from '@/types/user';

interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  region?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
  hasAccessToModule: (module: string) => boolean;
  hasPermission: (module: ModuleAccess, action: PermissionAction) => boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem('authToken');
    if (token) {
      // For demo purposes, set a mock user
      setUser({
        id: '1',
        name: 'Admin User',
        email: 'admin@nimms.gov.ng',
        roles: ['admin'],
        region: 'All Regions'
      });
      setIsAuthenticated(true);
    }
  }, []);

  const hasRole = (role: UserRole): boolean => {
    return user?.roles.includes(role) || false;
  };

  const hasAccessToModule = (module: string): boolean => {
    // For demo purposes, allow access to all modules
    return isAuthenticated;
  };

  const hasPermission = (module: ModuleAccess, action: PermissionAction): boolean => {
    // For demo purposes, allow all permissions for authenticated users
    // This would normally check user's actual permissions
    return isAuthenticated;
  };

  const login = async (email: string, password: string): Promise<User> => {
    // Mock login implementation
    const mockUser: User = {
      id: '1',
      name: 'Admin User',
      email: email || 'admin@nimms.gov.ng',
      roles: ['admin'],
      region: 'All Regions'
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'mock-token');
    
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    hasRole,
    hasAccessToModule,
    hasPermission,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
