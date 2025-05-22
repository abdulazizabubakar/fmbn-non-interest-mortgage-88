
import { Property } from './index';
import { CustomerType, Customer } from './customer';
import { MortgageDocument } from './mortgage-application';
import { DocumentType } from './documents';
import { FinancingType } from './index';

// Mortgage Account Status Types
export type MortgageAccountStatus = 
  | 'active'
  | 'in_arrears'
  | 'default'
  | 'restructured'
  | 'suspended'
  | 'closed'
  | 'matured'
  | 'foreclosed'
  | 'transferred';

export type ScheduleType = 'fixed' | 'adjustable';
export type PaymentStatus = 'paid' | 'partially_paid' | 'overdue' | 'upcoming' | 'waived';
export type PaymentMethod = 'bank_transfer' | 'direct_debit' | 'cash' | 'online' | 'mobile_wallet';
export type AdjustmentType = 'extension' | 'reduction' | 'prepayment' | 'deferral' | 'waiver';
export type TerminationReason = 'maturity' | 'early_settlement' | 'default' | 'customer_request' | 'force_majeure';

// Schedule Item - For rent/payment schedule
export interface ScheduleItem {
  id: string;
  mortgageId: string;
  dueDate: string;
  amount: number;
  principal: number;
  rent: number; // For Islamic financing
  maintenanceComponent?: number; // For Ijarah, if applicable
  cumulativePrincipal: number;
  remainingBalance: number;
  status: PaymentStatus;
  paymentDate?: string;
  paymentAmount?: number;
  paymentMethod?: PaymentMethod;
  reference?: string;
  notes?: string;
}

// Payment Record
export interface PaymentRecord {
  id: string;
  mortgageId: string;
  scheduleItemId: string;
  date: string;
  amount: number;
  method: PaymentMethod;
  reference: string;
  principalAmount: number;
  rentAmount: number;
  penalties?: number;
  overpayment?: number;
  status: 'processed' | 'pending' | 'failed' | 'reversed';
  processedBy?: string;
  processedAt?: string;
  notes?: string;
}

// Mortgage Term Adjustment
export interface TermAdjustment {
  id: string;
  mortgageId: string;
  type: AdjustmentType;
  requestDate: string;
  effectiveDate: string;
  approvedBy?: string;
  approvedDate?: string;
  originalTenor: number;
  newTenor?: number;
  originalAmount: number;
  newAmount?: number;
  reason: string;
  documentUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

// Default Record
export interface DefaultRecord {
  id: string;
  mortgageId: string;
  startDate: string;
  resolvedDate?: string;
  missedPayments: number;
  totalArrears: number;
  noticesSent: number;
  lastNoticeDate?: string;
  status: 'new' | 'in_progress' | 'legal_referral' | 'resolved' | 'foreclosure';
  assignedTo?: string;
  resolutionPlan?: string;
  notes?: string;
}

// Restructuring Record
export interface RestructuringRecord {
  id: string;
  mortgageId: string;
  requestDate: string;
  effectiveDate?: string;
  originalTenor: number;
  newTenor: number;
  originalMonthlyPayment: number;
  newMonthlyPayment: number;
  reason: string;
  approvalChain: {
    level: string;
    approver: string;
    status: 'pending' | 'approved' | 'rejected';
    date?: string;
    notes?: string;
  }[];
  documentUrl?: string;
  status: 'pending' | 'in_progress' | 'approved' | 'implemented' | 'rejected';
  notes?: string;
}

// Ownership Transfer Record
export interface OwnershipTransferRecord {
  id: string;
  mortgageId: string;
  initiationDate: string;
  completionDate?: string;
  transferType: 'maturity' | 'early_settlement' | 'third_party';
  documentRequests: {
    documentType: string;
    requested: boolean;
    received: boolean;
    receivedDate?: string;
  }[];
  legalApproval: {
    approver?: string;
    status: 'pending' | 'approved' | 'rejected';
    date?: string;
    notes?: string;
  };
  financialClearance: {
    approver?: string;
    status: 'pending' | 'approved' | 'rejected';
    date?: string;
    notes?: string;
  };
  transferFees?: number;
  certificateIssued: boolean;
  certificateUrl?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  notes?: string;
}

// Account Termination Record
export interface TerminationRecord {
  id: string;
  mortgageId: string;
  requestDate: string;
  effectiveDate?: string;
  reason: TerminationReason;
  requestedBy: string;
  approvedBy?: string;
  approvalDate?: string;
  refundAmount?: number;
  inspectionDate?: string;
  inspectionPassed?: boolean;
  finalClearanceDate?: string;
  documentUrl?: string;
  status: 'requested' | 'inspecting' | 'calculating' | 'approved' | 'completed' | 'rejected';
  notes?: string;
}

// Takaful/Insurance Record
export interface TakafulRecord {
  id: string;
  mortgageId: string;
  provider: string;
  policyNumber: string;
  coverageAmount: number;
  premium: number;
  startDate: string;
  endDate: string;
  type: 'property' | 'life' | 'comprehensive';
  status: 'active' | 'expired' | 'cancelled' | 'claimed';
  renewalDate: string;
  documentUrl?: string;
  claims: {
    id: string;
    date: string;
    amount: number;
    reason: string;
    status: 'filed' | 'processing' | 'approved' | 'paid' | 'rejected';
  }[];
  notes?: string;
}

// Audit Trail
export interface MortgageAuditEntry {
  id: string;
  mortgageId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, any>;
  ipAddress?: string;
}

// The main mortgage account interface
export interface MortgageAccount {
  id: string;
  mortgageNumber: string;
  applicationId?: string;
  customerId: string;
  customerName: string;
  propertyId: string;
  propertyAddress: string;
  
  // Core account details
  financingType: FinancingType;
  status: MortgageAccountStatus;
  creationDate: string;
  activationDate?: string; 
  maturityDate: string;
  lastUpdated: string;
  
  // Financial details
  principalAmount: number;
  equityContribution: number;
  equityPercentage: number;
  monthlyPayment: number;
  totalPayable: number;
  profitRate?: number; // For conventional mortgages
  rentRate?: number; // For Islamic mortgages
  tenor: number; // in months
  graceMonths: number;
  
  // Schedule information
  scheduleType: ScheduleType;
  paymentDay: number; // Day of month when payment is due
  totalScheduleItems: number;
  completedPayments: number;
  nextPaymentDate?: string;
  nextPaymentAmount?: number;
  
  // Balance tracking
  outstandingPrincipal: number;
  outstandingProfit?: number; // For conventional
  outstandingRent?: number; // For Islamic
  currentBalance: number;
  overdueDays: number;
  overduePrincipal: number;
  overdueProfitRent: number;
  penalties: number;
  
  // Associated records
  paymentSchedule?: ScheduleItem[];
  payments?: PaymentRecord[];
  adjustments?: TermAdjustment[];
  defaults?: DefaultRecord[];
  restructuring?: RestructuringRecord[];
  ownershipTransfers?: OwnershipTransferRecord[];
  terminations?: TerminationRecord[];
  takafulPolicies?: TakafulRecord[];
  documents?: MortgageDocument[];
  
  // Ownership progression
  ownershipPercentage: number; // For diminishing musharaka
  transferEligible: boolean;
  
  // Notes and meta
  assignedOfficer?: string;
  notes?: string[];
  flags?: string[];
  tags?: string[];
  auditTrail?: MortgageAuditEntry[];
}
