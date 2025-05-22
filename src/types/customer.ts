
// Customer Types
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

export type CustomerTag = 
  | 'high_risk' 
  | 'eligible_for_ownership' 
  | 'in_arrears' 
  | 'defaulting'
  | 'good_standing'
  | 'needs_review';

export type RiskCategory = 'low' | 'medium' | 'high' | 'critical';

export interface CustomerDocument {
  id: string;
  customerId: string;
  documentType: string;
  documentUrl: string;
  verified: boolean;
  uploadDate: string;
  verificationDate?: string;
  verifiedBy?: string;
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

export interface RiskProfile {
  customerId: string;
  riskCategory: RiskCategory;
  contributionRegularity: 'regular' | 'occasional' | 'irregular';
  defaultHistory: 'none' | 'minor' | 'significant';
  lastReviewDate: string;
  reviewedBy: string;
  recommendations: string[];
}

export interface CustomerComplaintDocument {
  id: string;
  title: string;
  type: string;
  description?: string;
  category?: string;
  fileUrl: string;
  fileSize: number;
  uploadDate: string;
  owner?: string;
  expiryDate?: string | null;
  status?: string;
  tags?: string[];
  filePath?: string;
}

export interface CustomerComplaint {
  id: string;
  customerId: string;
  category: 'payment' | 'property' | 'service' | 'contract' | 'other';
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'escalated' | 'resolved' | 'closed';
  assignedTo?: string;
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
  documents?: CustomerComplaintDocument[];
}

export interface CustomerCommunication {
  id: string;
  customerId: string;
  type: 'email' | 'sms' | 'in_app' | 'letter';
  subject: string;
  message: string;
  sentBy: string;
  sentDate: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  templateId?: string;
}

export interface CustomerLease {
  id: string;
  customerId: string;
  leaseNumber: string;
  propertyId: string;
  unitId: string;
  status: 'active' | 'defaulting' | 'terminated' | 'completed';
  startDate: string;
  maturityDate: string;
  monthlyPayment: number;
  totalValue: number;
  paidToDate: number;
  remainingBalance: number;
  lastPaymentDate: string;
  nextPaymentDate: string;
  ownershipPercentage: number;
  takafulPolicyId: string;
  contractDocumentUrl: string;
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
  
  address: string;
  city: string;
  state: string;
  postalCode: string;
  
  employer: string;
  employerAddress: string;
  occupation: string;
  monthlyIncome: number;
  employmentStartDate: string;
  employmentStatus?: string;
  
  customerType: CustomerType;
  status: CustomerStatus;
  tags: CustomerTag[];
  nhfContributorId?: string;
  nhfRegistrationDate?: string;
  
  documents: CustomerDocument[];
  verification: CustomerVerification;
  
  riskProfile?: RiskProfile;
  
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  notes?: string;
}
