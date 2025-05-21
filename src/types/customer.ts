
import { Document } from './documents';

export type CustomerType = 
  | 'new_applicant' 
  | 'nhf_contributor' 
  | 'diaspora' 
  | 'government_worker'
  | 'private_sector'
  | 'cooperative';

export type CustomerStatus = 
  | 'active'
  | 'pending_verification'
  | 'suspended'
  | 'blacklisted'
  | 'completed';

export type RiskCategory =
  | 'low'
  | 'medium'
  | 'high'
  | 'critical';

export type CustomerTag =
  | 'high_risk'
  | 'eligible_for_ownership'
  | 'in_arrears'
  | 'defaulting'
  | 'good_standing'
  | 'needs_review';

export interface CustomerDocument {
  id: string;
  customerId: string;
  documentType: 'id_card' | 'employment_letter' | 'payslip' | 'utility_bill' | 'photograph' | 'other';
  documentUrl: string;
  verified: boolean;
  uploadDate: string;
  verificationDate?: string;
  verifiedBy?: string;
  expiryDate?: string;
}

export interface CustomerVerification {
  ninVerified: boolean;
  ninVerificationDate?: string;
  bvnVerified: boolean;
  bvnVerificationDate?: string;
  employmentVerified: boolean;
  employmentVerificationDate?: string;
  addressVerified: boolean;
  addressVerificationDate?: string;
}

export interface CustomerCommunication {
  id: string;
  customerId: string;
  type: 'email' | 'sms' | 'in_app' | 'letter' | 'call';
  subject: string;
  message: string;
  sentBy: string;
  sentDate: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  templateId?: string;
}

export interface CustomerComplaint {
  id: string;
  customerId: string;
  category: 'payment' | 'property' | 'service' | 'contract' | 'other';
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'escalated' | 'resolved' | 'closed';
  createdAt: string;
  assignedTo?: string;
  resolvedAt?: string;
  resolvedBy?: string;
  documents: Document[];
}

export interface CustomerRiskProfile {
  customerId: string;
  riskCategory: RiskCategory;
  contributionRegularity: 'regular' | 'occasional' | 'irregular';
  defaultHistory: 'none' | 'minor' | 'significant' | 'severe';
  lastReviewDate: string;
  reviewedBy: string;
  recommendations?: string[];
}

export interface Customer {
  id: string;
  customerNumber: string;
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  nationalId: string;
  bvn: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  
  // Address Information
  address: string;
  city: string;
  state: string;
  postalCode?: string;
  
  // Employment Information
  employer: string;
  employerAddress?: string;
  occupation: string;
  monthlyIncome: number;
  employmentStartDate: string;
  
  // Classification
  customerType: CustomerType;
  status: CustomerStatus;
  tags: CustomerTag[];
  nhfContributorId?: string;
  nhfRegistrationDate?: string;
  
  // Related Data
  documents: CustomerDocument[];
  verification: CustomerVerification;
  riskProfile?: CustomerRiskProfile;
  
  // Meta Information
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
  notes?: string;
}

export interface CustomerLease {
  id: string;
  customerId: string;
  leaseNumber: string;
  propertyId: string;
  unitId: string;
  status: 'active' | 'defaulting' | 'completed' | 'terminated';
  startDate: string;
  maturityDate: string;
  monthlyPayment: number;
  totalValue: number;
  paidToDate: number;
  remainingBalance: number;
  lastPaymentDate?: string;
  nextPaymentDate: string;
  ownershipPercentage: number;
  takafulPolicyId?: string;
  contractDocumentUrl?: string;
}

export interface CustomerAnalyticsData {
  totalCustomers: number;
  activeCustomers: number;
  defaultingCustomers: number;
  completedCustomers: number;
  customersByType: {
    type: CustomerType;
    count: number;
  }[];
  customersByState: {
    state: string;
    count: number;
  }[];
  customersByRiskCategory: {
    category: RiskCategory;
    count: number;
  }[];
  customersByMonthlyIncome: {
    range: string;
    count: number;
  }[];
}
