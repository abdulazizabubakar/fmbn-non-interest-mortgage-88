
// User types
export type UserRole = 
  | 'super_admin'
  | 'admin'
  | 'application_officer'
  | 'legal_officer'
  | 'finance_officer'
  | 'treasury_officer'
  | 'property_officer'
  | 'developer'
  | 'employer'
  | 'lessee'
  | 'auditor'
  | 'support_staff'
  | 'zonal_admin'
  | 'shariah_reviewer'
  | 'manager'
  | 'officer'
  | 'customer';

export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'approve' | 'export';

export type DataScope = 'global' | 'zonal' | 'self';

export type ModuleAccess = 
  | 'dashboard'
  | 'applications'
  | 'mortgages'
  | 'properties'
  | 'customers'
  | 'payments'
  | 'finance'
  | 'documents'
  | 'reports'
  | 'settings'
  | 'users'
  | 'roles';

export interface Permission {
  id: string;
  name: string;
  code: string;
  module: ModuleAccess;
  action: PermissionAction;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  isSystemRole: boolean;
  permissions: string[]; // permission ids
  users?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  scope: DataScope;
  region?: string;
  status: 'active' | 'inactive' | 'pending';
  avatarUrl?: string;
  employeeId?: string;
  organization?: string;
}

export interface UserWithPermissions extends User {
  permissions: Permission[];
}
