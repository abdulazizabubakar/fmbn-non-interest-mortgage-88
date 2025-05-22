
import { CustomerType, Customer } from './customer';
import { Document } from './documents';
import { FinancingType } from './index';

// Application Status Types
export type MortgageApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'in_review'
  | 'credit_assessment'
  | 'legal_review'
  | 'shariah_review'
  | 'management_approval'
  | 'board_approval'
  | 'approved'
  | 'offer_sent'
  | 'offer_accepted'
  | 'offer_rejected'
  | 'offer_expired'
  | 'contract_generated'
  | 'contract_signed'
  | 'lease_activated'
  | 'rejected'
  | 'cancelled';

export type EligibilityStatus = 'eligible' | 'ineligible' | 'pending' | 'conditional';

export type DocumentType = 
  | 'employer_letter'
  | 'payslip'
  | 'utility_bill'
  | 'id_card'
  | 'nhf_contribution'
  | 'property_documents'
  | 'employer_undertaking'
  | 'takaful_policy'
  | 'contract';

export type ApprovalAction = 'approve' | 'reject' | 'request_info' | 'escalate';

export type EmployerType = 'public' | 'private' | 'self_employed' | 'cooperative';

// Eligibility criteria
export interface EligibilityCriteria {
  minIncome: number;
  maxDebtToIncomeRatio: number;
  requiresNhfContribution: boolean;
  minNhfContributionMonths: number;
  minEmploymentMonths: number;
}

// Application document
export interface MortgageDocument {
  id: string;
  type: DocumentType;
  title: string;
  fileUrl: string;
  uploadDate: string;
  status: 'pending' | 'verified' | 'rejected';
  verifiedBy?: string;
  verificationDate?: string;
  notes?: string;
}

// Approval stage
export interface ApprovalStage {
  id: string;
  stage: 'credit' | 'legal' | 'shariah' | 'management' | 'board';
  status: 'pending' | 'in_progress' | 'approved' | 'rejected' | 'info_requested';
  assignedTo?: string;
  assignedDate?: string;
  completedBy?: string;
  completedDate?: string;
  action?: ApprovalAction;
  notes?: string;
}

// Property details
export interface PropertyDetails {
  id: string;
  address: string;
  type: 'apartment' | 'bungalow' | 'duplex' | 'terrace' | 'mansion';
  value: number;
  area: number;
  location: string;
  state: string;
  preBooked: boolean;
  preBookingExpiry?: string;
}

// Financial details
export interface FinancialDetails {
  propertyValue: number;
  equityContribution: number;
  equityPercentage: number;
  financingAmount: number;
  monthlyRent: number;
  tenor: number; // in months
  debtToIncomeRatio: number;
}

// Takaful details
export interface TakafulDetails {
  policyNumber?: string;
  provider?: string;
  coverageAmount?: number;
  startDate?: string;
  endDate?: string;
  premium?: number;
  status: 'pending' | 'active' | 'expired' | 'cancelled';
}

// Employer details
export interface EmployerUndertaking {
  employerName: string;
  employerType: EmployerType;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  undertakingDocumentUrl?: string;
  status: 'pending' | 'verified' | 'rejected';
  verificationDate?: string;
}

// Eligibility check result
export interface EligibilityCheck {
  status: EligibilityStatus;
  incomeEligible: boolean;
  nhfEligible: boolean;
  dtiRatioEligible: boolean;
  employmentEligible: boolean;
  ineligibilityReasons?: string[];
  score?: number;
  checkedDate: string;
  checkedBy?: string;
}

// Ijarah contract
export interface IjarahContract {
  id: string;
  generatedDate: string;
  generatedBy: string;
  documentUrl?: string;
  signedByApplicant: boolean;
  applicantSignDate?: string;
  signedByFmbn: boolean;
  fmbnSignDate?: string;
  status: 'draft' | 'generated' | 'sent' | 'signed' | 'active' | 'completed';
  paymentScheduleUrl?: string;
}

// The main mortgage application interface
export interface MortgageApplication {
  id: string;
  applicationNumber: string;
  customerId: string;
  customerName: string;
  status: MortgageApplicationStatus;
  submissionDate: string;
  lastUpdated: string;
  
  // Customer related information
  nhfContributorId?: string;
  nhfContributionStatus?: 'active' | 'inactive' | 'exempt';
  customerType: CustomerType;
  
  // Identity verification
  identityVerified: boolean;
  bvnVerified: boolean;
  ninVerified: boolean;
  
  // Core application details
  property?: PropertyDetails;
  financingType: FinancingType;
  financialDetails?: FinancialDetails;
  
  // Documents
  documents: MortgageDocument[];
  
  // Process related
  eligibilityCheck?: EligibilityCheck;
  approvalStages: ApprovalStage[];
  currentApprovalStage?: string;
  
  // Final stages
  employerUndertaking?: EmployerUndertaking;
  takafulDetails?: TakafulDetails;
  contract?: IjarahContract;
  
  // Meta information
  createdBy: string;
  notes?: string[];
  flags?: string[];
}
