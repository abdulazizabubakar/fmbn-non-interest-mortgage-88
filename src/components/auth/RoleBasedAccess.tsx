
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ModuleAccess, PermissionAction, UserRole } from '@/types/user';

interface RoleBasedProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  requiredModule?: ModuleAccess;
  requiredAction?: PermissionAction;
  fallback?: React.ReactNode;
}

export const RoleBasedAccess: React.FC<RoleBasedProps> = ({ 
  children, 
  requiredRoles, 
  requiredModule, 
  requiredAction, 
  fallback = null 
}) => {
  const { isAuthenticated, hasRole, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  // Check roles if specified
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => hasRole(role));
    if (!hasRequiredRole) {
      return <>{fallback}</>;
    }
  }

  // Check module and action permissions if specified
  if (requiredModule && requiredAction) {
    if (!hasPermission(requiredModule, requiredAction)) {
      return <>{fallback}</>;
    }
  } else if (requiredModule) {
    if (!hasPermission(requiredModule, 'read')) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
};
