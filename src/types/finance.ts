
// Finance Operation Types

// Disbursement Types
export type DisbursementStatus = 'pending' | 'in-review' | 'approved' | 'rejected' | 'completed' | 'cancelled';
export type DisbursementInstrument = 'direct-to-vendor' | 'cooperative' | 'contractor' | 'escrow';

export interface DisbursementRequest {
  id: string;
  mortgageId: string;
  milestoneId?: string;
  amount: number;
  status: DisbursementStatus;
  instrument: DisbursementInstrument;
  recipientName: string;
  recipientAccount: string;
  recipientBank: string;
  requestedBy: string;
  requestedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  executedAt?: string;
  notes: string;
}

// Repayment Types
export type RepaymentChannel = 'bank-transfer' | 'wallet' | 'direct-debit' | 'cash';
export type RepaymentStatus = 'scheduled' | 'pending' | 'completed' | 'failed' | 'partial';

export interface RepaymentScheduleItem {
  id: string;
  mortgageId: string;
  dueDate: string;
  amount: number;
  principal: number;
  profit: number;
  status: RepaymentStatus;
  paidAmount?: number;
  paidDate?: string;
  paidVia?: RepaymentChannel;
  latePaymentFee?: number;
  remainingBalance: number;
}

// Subsidy Types
export type SubsidyType = 'government' | 'employer' | 'charity' | 'other';
export type SubsidyApplication = 'principal' | 'profit' | 'both';

export interface Subsidy {
  id: string;
  mortgageId: string;
  type: SubsidyType;
  provider: string;
  amount: number;
  applicationTo: SubsidyApplication;
  startDate: string;
  endDate?: string;
  frequency?: 'one-time' | 'monthly' | 'quarterly' | 'annually';
  status: 'active' | 'pending' | 'expired';
  notes: string;
}

// Approval Workflow Types
export type ApprovalRole = 'maker' | 'checker' | 'authorizer';
export type ApprovalAction = 'created' | 'reviewed' | 'approved' | 'rejected' | 'cancelled';

export interface ApprovalStep {
  id: string;
  entityId: string;
  entityType: 'disbursement' | 'mortgage' | 'subsidy';
  action: ApprovalAction;
  role: ApprovalRole;
  userId: string;
  userName: string;
  timestamp: string;
  notes: string;
  ipAddress: string;
  deviceInfo: string;
}

// Financial Exception Types
export type ExceptionType = 
  | 'rejected-payment' 
  | 'duplicate-transaction' 
  | 'partial-payment' 
  | 'reconciliation-mismatch'
  | 'other';

export type ExceptionStatus = 'open' | 'in-progress' | 'resolved' | 'escalated';

export interface FinancialException {
  id: string;
  type: ExceptionType;
  relatedEntityId: string;
  relatedEntityType: 'payment' | 'disbursement' | 'subsidy';
  amount: number;
  description: string;
  status: ExceptionStatus;
  raisedBy: string;
  raisedAt: string;
  assignedTo?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  resolution?: string;
}
