
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Permission, UserRole, ModuleAccess, PermissionAction } from '@/types/user';

// Mock user for development - in a real app, this would come from authentication
const mockCurrentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@fmbn.gov.ng',
  roles: ['admin'],
  scope: 'global',
  status: 'active',
};

// Sample permissions mapping - in a real app, this would come from the backend
const rolePermissionsMap: Record<UserRole, { modules: ModuleAccess[], actions: PermissionAction[] }> = {
  super_admin: {
    modules: ['dashboard', 'applications', 'mortgages', 'properties', 'customers', 'payments', 'finance', 'documents', 'reports', 'settings', 'users', 'roles'],
    actions: ['create', 'read', 'update', 'delete', 'approve', 'export']
  },
  admin: {
    modules: ['dashboard', 'applications', 'mortgages', 'properties', 'customers', 'payments', 'finance', 'documents', 'reports', 'settings', 'users'],
    actions: ['create', 'read', 'update', 'approve', 'export']
  },
  application_officer: {
    modules: ['dashboard', 'applications', 'customers', 'documents'],
    actions: ['create', 'read', 'update']
  },
  legal_officer: {
    modules: ['dashboard', 'applications', 'mortgages', 'documents'],
    actions: ['read', 'update', 'approve']
  },
  finance_officer: {
    modules: ['dashboard', 'mortgages', 'payments', 'finance'],
    actions: ['read', 'update', 'approve', 'export']
  },
  treasury_officer: {
    modules: ['dashboard', 'payments', 'finance'],
    actions: ['read', 'update', 'approve', 'export']
  },
  property_officer: {
    modules: ['dashboard', 'properties', 'documents'],
    actions: ['create', 'read', 'update', 'export']
  },
  developer: {
    modules: ['dashboard', 'properties'],
    actions: ['create', 'read', 'update']
  },
  employer: {
    modules: ['dashboard', 'applications'],
    actions: ['read']
  },
  lessee: {
    modules: ['dashboard', 'applications', 'mortgages', 'payments'],
    actions: ['create', 'read']
  },
  auditor: {
    modules: ['dashboard', 'applications', 'mortgages', 'properties', 'customers', 'payments', 'finance', 'reports'],
    actions: ['read', 'export']
  },
  support_staff: {
    modules: ['dashboard', 'applications', 'customers'],
    actions: ['read', 'update']
  },
  zonal_admin: {
    modules: ['dashboard', 'applications', 'mortgages', 'properties', 'customers', 'payments', 'reports'],
    actions: ['create', 'read', 'update', 'approve', 'export']
  },
  shariah_reviewer: {
    modules: ['dashboard', 'applications', 'mortgages', 'finance'],
    actions: ['read', 'approve']
  },
  manager: {
    modules: ['dashboard', 'applications', 'mortgages', 'customers'],
    actions: ['read', 'approve', 'export']
  },
  officer: {
    modules: ['dashboard', 'applications', 'customers'],
    actions: ['create', 'read', 'update']
  },
  customer: {
    modules: ['dashboard', 'applications', 'mortgages', 'payments'],
    actions: ['create', 'read']
  }
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (module: ModuleAccess, action: PermissionAction) => boolean;
  hasRole: (role: UserRole) => boolean;
  hasAccessToModule: (module: ModuleAccess) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockCurrentUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!mockCurrentUser);

  const login = async (email: string, password: string): Promise<User> => {
    // This would normally call an API to authenticate
    // For demo purposes, we'll just set the user directly
    setUser(mockCurrentUser);
    setIsAuthenticated(true);
    return mockCurrentUser;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const hasPermission = (module: ModuleAccess, action: PermissionAction): boolean => {
    if (!user) return false;
    
    // Check if any of the user's roles has the required permission
    return user.roles.some(role => {
      const rolePermissions = rolePermissionsMap[role];
      if (!rolePermissions) return false;
      
      return rolePermissions.modules.includes(module) && 
             rolePermissions.actions.includes(action);
    });
  };

  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    return user.roles.includes(role);
  };

  const hasAccessToModule = (module: ModuleAccess): boolean => {
    if (!user) return false;
    
    return user.roles.some(role => {
      const rolePermissions = rolePermissionsMap[role];
      if (!rolePermissions) return false;
      
      return rolePermissions.modules.includes(module);
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated,
      hasPermission,
      hasRole,
      hasAccessToModule
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
