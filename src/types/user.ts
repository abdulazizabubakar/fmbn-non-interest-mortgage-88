
// User types
export type UserRole = 'admin' | 'manager' | 'officer' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}
