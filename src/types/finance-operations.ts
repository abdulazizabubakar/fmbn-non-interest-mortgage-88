
// Financial Operations Types
import { Milestone } from "@/types/disbursement";

// Core Transactional Types
export type PaymentStatus = 
  | 'paid' 
  | 'partially_paid' 
  | 'pending' 
  | 'overdue' 
  | 'cancelled' 
  | 'refunded';

export type PaymentMethod = 
  | 'bank_transfer' 
  | 'direct_debit' 
  | 'wallet' 
  | 'cash' 
  | 'payroll_deduction' 
  | 'online_payment' 
  | 'mobile_payment';

export type TransactionType = 
  | 'collection' 
  | 'disbursement' 
  | 'refund' 
  | 'adjustment' 
  | 'transfer' 
  | 'reversal';

// Payment Management
export interface PaymentRecord {
  id: string;
  mortgageId: string;
  scheduleId: string;
  amount: number;
  paymentDate: string;
  dueDate: string;
  method: PaymentMethod;
  status: PaymentStatus;
  reference: string;
  breakdown: {
    principal?: number;
    rent?: number;
    maintenance?: number;
    takaful?: number;
    equity?: number;
    penalty?: number;
  };
  postedBy: string;
  postedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  notes?: string;
}

export interface PaymentSchedule {
  id: string;
  mortgageId: string;
  scheduleItems: ScheduleItem[];
  startDate: string;
  endDate: string;
  frequency: 'monthly' | 'quarterly' | 'bi-annually';
  totalAmount: number;
  remainingAmount: number;
  status: 'active' | 'completed' | 'restructured' | 'terminated';
  createdAt: string;
  updatedAt?: string;
}

export interface ScheduleItem {
  id: string;
  scheduleId: string;
  dueDate: string;
  amount: number;
  breakdown: {
    principal: number;
    rent: number;
    maintenance?: number;
    takaful?: number;
  };
  status: PaymentStatus;
  paymentId?: string;
  paymentDate?: string;
  reminder: {
    firstSent?: string;
    secondSent?: string;
    finalSent?: string;
  };
}

// Disbursement Management
export type DisbursementStatus = 
  | 'draft' 
  | 'pending_review' 
  | 'approved' 
  | 'rejected' 
  | 'processing' 
  | 'completed' 
  | 'failed';

export type RecipientType = 
  | 'developer' 
  | 'contractor' 
  | 'vendor' 
  | 'legal_partner' 
  | 'customer' 
  | 'bank' 
  | 'government_agency' 
  | 'takaful_provider';

export interface DisbursementRecord {
  id: string;
  mortgageId?: string;
  requestId: string;
  amount: number;
  recipientType: RecipientType;
  recipientId: string;
  recipientName: string;
  accountDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  purpose: string;
  status: DisbursementStatus;
  approvalChain: ApprovalStep[];
  documents: DisbursementDocument[];
  disbursementDate?: string;
  reference?: string;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt?: string;
  notes?: string;
}

export interface DisbursementDocument {
  id: string;
  disbursementId: string;
  documentType: 'invoice' | 'contract' | 'approval_memo' | 'receipt' | 'other';
  title: string;
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;
}

// Approval & Workflow
export type ApprovalRole = 
  | 'initiator' 
  | 'reviewer' 
  | 'finance_officer' 
  | 'finance_manager' 
  | 'finance_director' 
  | 'compliance_officer' 
  | 'treasury';

export type ApprovalStatus = 
  | 'pending' 
  | 'approved' 
  | 'rejected' 
  | 'cancelled' 
  | 'on_hold';

export interface ApprovalStep {
  id: string;
  entityId: string;
  entityType: string;
  role: ApprovalRole;
  assignedTo?: string;
  assignedName?: string;
  status: ApprovalStatus;
  comment?: string;
  timestamp?: string;
  ipAddress?: string;
}

// Refund Management
export type RefundStatus = 
  | 'requested' 
  | 'under_review' 
  | 'approved' 
  | 'processing' 
  | 'completed' 
  | 'rejected' 
  | 'cancelled';

export type RefundReason = 
  | 'voluntary_exit' 
  | 'overpayment' 
  | 'application_denied' 
  | 'product_cancellation' 
  | 'contract_termination' 
  | 'other';

export interface RefundRequest {
  id: string;
  mortgageId?: string;
  customerId: string;
  customerName: string;
  amount: number;
  reason: RefundReason;
  reasonDetails?: string;
  requestDate: string;
  status: RefundStatus;
  approvalChain: ApprovalStep[];
  documents: RefundDocument[];
  disbursementId?: string; // Links to the disbursement record when paid
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface RefundDocument {
  id: string;
  refundId: string;
  documentType: 'request_form' | 'identity_proof' | 'payment_receipt' | 'approval_memo' | 'other';
  title: string;
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;
}

// Financial Reconciliation
export interface ReconciliationRecord {
  id: string;
  periodStart: string;
  periodEnd: string;
  sourceSystem: string; // e.g., "TSA", "Remita", "Internal"
  reconciliationType: 'payment' | 'disbursement' | 'refund' | 'all';
  totalTransactions: number;
  matchedTransactions: number;
  unmatchedTransactions: number;
  status: 'in_progress' | 'completed' | 'needs_review';
  exceptions: ReconciliationException[];
  performedBy: string;
  performedAt: string;
  completedBy?: string;
  completedAt?: string;
}

export interface ReconciliationException {
  id: string;
  reconciliationId: string;
  transactionId: string;
  transactionType: TransactionType;
  systemAmount: number;
  externalAmount?: number;
  discrepancyAmount?: number;
  status: 'open' | 'resolved' | 'written_off';
  resolution?: string;
  resolvedBy?: string;
  resolvedAt?: string;
}

// Financial Reporting
export interface FinancialReport {
  id: string;
  reportType: 
    | 'collection_summary' 
    | 'disbursement_ledger' 
    | 'delinquency_aging' 
    | 'refund_summary' 
    | 'treasury_position' 
    | 'revenue_recognition' 
    | 'developer_payment' 
    | 'custom';
  title: string;
  description?: string;
  periodStart: string;
  periodEnd: string;
  parameters?: Record<string, any>;
  generatedBy: string;
  generatedAt: string;
  fileUrl?: string;
  isScheduled: boolean;
  scheduleFrequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  lastRun?: string;
  nextRun?: string;
}

// Treasury Management
export interface TreasuryPosition {
  id: string;
  asOfDate: string;
  accounts: {
    accountId: string;
    accountName: string;
    accountType: string;
    balance: number;
  }[];
  totalAssets: number;
  totalLiabilities: number;
  netPosition: number;
  pendingInflows: number;
  pendingOutflows: number;
  reconciliationStatus: 'reconciled' | 'unreconciled' | 'partially_reconciled';
  updatedBy: string;
  updatedAt: string;
}

// Financial Metrics and Analytics
export interface FinancialMetrics {
  id: string;
  asOfDate: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  collectionRate: number;
  delinquencyRate: number;
  totalCollections: number;
  totalDisbursements: number;
  totalRefunds: number;
  averageProcessingTime: number;
  topPerformingZones: {
    zoneId: string;
    zoneName: string;
    collectionRate: number;
    totalAmount: number;
  }[];
  highRiskAccounts: number;
}

// Audit & Compliance
export interface FinancialAuditRecord {
  id: string;
  entityId: string;
  entityType: string;
  action: string;
  previousState?: any;
  newState?: any;
  performedBy: string;
  performedAt: string;
  ipAddress: string;
  userAgent: string;
}
