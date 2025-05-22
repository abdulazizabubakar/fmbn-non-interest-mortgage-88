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

// Property types - now imported from property.ts
export { Property } from './property';

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

// KYC and Onboarding types
export type CustomerType = 'individual' | 'cooperative' | 'institution';

export interface KycDocument {
  id: string;
  customerId: string;
  type: 'id' | 'payslip' | 'utility_bill' | 'bvn' | 'employment_letter' | 'business_registration';
  status: 'pending' | 'verified' | 'rejected';
  documentUrl: string;
  uploadDate: string;
  verificationDate?: string;
  verifiedBy?: string;
}

// Credit Assessment types
export interface CreditAssessment {
  id: string;
  mortgageId: string;
  customerId: string;
  creditScore: number;
  incomeToFinancingRatio: number;
  debtBurdenRatio: number;
  riskCategory: 'low' | 'medium' | 'high';
  assessedBy: string;
  assessmentDate: string;
  decision: 'approved' | 'rejected' | 'pending';
  notes: string;
}

// Guarantor types
export interface Guarantor {
  id: string;
  mortgageId: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
  address: string;
  employmentStatus: string;
  monthlyIncome: number;
  bvn: string;
  status: 'pending' | 'verified' | 'rejected';
}

// Disbursement types
export type DisbursementType = 'full' | 'milestone';

export interface Disbursement {
  id: string;
  mortgageId: string;
  amount: number;
  type: DisbursementType;
  recipient: 'vendor' | 'developer' | 'property_owner';
  recipientName: string;
  recipientAccount: string;
  recipientBank: string;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  notes: string;
}

export interface Milestone {
  id: string;
  mortgageId: string;
  description: string;
  amount: number;
  completionPercentage: number;
  status: 'pending' | 'in-progress' | 'verified' | 'completed';
  verificationDate?: string;
  verifiedBy?: string;
  disbursementId?: string;
}

// Repayment types
export interface RepaymentSchedule {
  id: string;
  mortgageId: string;
  totalAmount: number;
  installmentAmount: number;
  frequency: 'monthly' | 'quarterly' | 'bi-annually';
  nextPaymentDate: string;
  finalPaymentDate: string;
  remainingInstallments: number;
}

export interface Payment {
  id: string;
  mortgageId: string;
  scheduleId: string;
  amount: number;
  date: string;
  method: 'bank_transfer' | 'direct_debit' | 'wallet' | 'cash';
  reference: string;
  status: 'pending' | 'completed' | 'failed';
}

// Shariah Compliance types
export interface ShariahReview {
  id: string;
  mortgageId: string;
  reviewDate: string;
  reviewedBy: string;
  status: 'compliant' | 'non-compliant' | 'pending_changes';
  notes: string;
  contractDocumentUrl?: string;
}

// Delinquency Management types
export interface DelinquencyCase {
  id: string;
  mortgageId: string;
  customerId: string;
  openDate: string;
  status: 'new' | 'under_resolution' | 'restructured' | 'resolved' | 'defaulted';
  missedPayments: number;
  totalOverdueAmount: number;
  assignedTo?: string;
  resolutionPlan?: string;
  closeDate?: string;
}

// Integration Types
export interface ExternalVerification {
  id: string;
  customerId: string;
  type: 'bvn' | 'nin' | 'credit_bureau';
  provider: string;
  requestDate: string;
  responseDate?: string;
  status: 'pending' | 'verified' | 'failed';
  referenceId: string;
  responseData: any;
}

// Reporting Types
export interface Report {
  id: string;
  title: string;
  type: 'portfolio' | 'performance' | 'compliance' | 'operational' | 'financial';
  createdBy: string;
  createdAt: string;
  parameters: any;
  fileUrl?: string;
  scheduledReport: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly';
}

// Audit Types
export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
  ipAddress: string;
  changes?: any;
}
