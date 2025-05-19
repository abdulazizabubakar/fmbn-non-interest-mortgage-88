
// User types
export type UserRole = 'admin' | 'manager' | 'officer' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

// Mortgage types
export type MortgageStatus = 
  | 'draft'
  | 'pending-review'
  | 'under-assessment'
  | 'approved'
  | 'active'
  | 'completed'
  | 'rejected'
  | 'cancelled';

export type FinancingType = 'murabaha' | 'ijara' | 'musharaka' | 'istisna';

export interface Mortgage {
  id: string;
  customerId: string;
  customerName: string;
  propertyId: string;
  propertyAddress: string;
  financingType: FinancingType;
  amount: number;
  tenor: number; // in months
  status: MortgageStatus;
  approvalDate?: string;
  disbursementDate?: string;
  maturityDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Analytics and reporting types
export interface IconData {
  icon: any; // Using any for simplicity, ideally would be a more specific Lucide icon type
  className: string;
}

export interface StatCard {
  title: string;
  value: string | number;
  change?: number;
  icon: IconData;
}

export interface ChartData {
  name: string;
  value: number;
}

// Customer types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationalId: string;
  bvn: string;
  address: string;
  employmentStatus: string;
  monthlyIncome: number;
  createdAt: string;
}

// Property types
export interface Property {
  id: string;
  address: string;
  type: string;
  value: number;
  buildYear: number;
  area: number;
  features: string[];
  images: string[];
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}
