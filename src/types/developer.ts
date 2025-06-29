
export type PartnerType = 'developer' | 'surveyor' | 'valuer' | 'contractor';
export type PartnerStatus = 'active' | 'suspended' | 'pending' | 'blacklisted';
export type OnboardingStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  status: PartnerStatus;
  email: string;
  phone: string;
  address: string;
  registrationNumber: string;
  taxId: string;
  bankAccount: {
    accountNumber: string;
    bankName: string;
    accountName: string;
  };
  onboardingStatus: OnboardingStatus;
  performanceScore: number;
  totalProjects: number;
  completedProjects: number;
  joinDate: string;
  lastActivity: string;
  documents: PartnerDocument[];
  certifications: Certification[];
}

export interface PartnerDocument {
  id: string;
  type: 'cac_certificate' | 'tax_clearance' | 'professional_license' | 'insurance' | 'other';
  name: string;
  url: string;
  uploadDate: string;
  expiryDate?: string;
  verified: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuingBody: string;
  issueDate: string;
  expiryDate?: string;
  certificateNumber: string;
}

export type MilestoneStatus = 'pending' | 'in_progress' | 'completed' | 'verified' | 'disputed';

export interface ProjectMilestone {
  id: string;
  projectId: string;
  partnerId: string;
  title: string;
  description: string;
  targetDate: string;
  actualDate?: string;
  status: MilestoneStatus;
  completionPercentage: number;
  paymentAmount: number;
  paymentStatus: 'pending' | 'approved' | 'disbursed';
  verificationNotes?: string;
  verifiedBy?: string;
  verificationDate?: string;
  attachments: string[];
}

export interface DisbursementTracking {
  id: string;
  milestoneId: string;
  partnerId: string;
  amount: number;
  requestDate: string;
  approvalDate?: string;
  disbursementDate?: string;
  status: 'requested' | 'approved' | 'disbursed' | 'rejected';
  approvedBy?: string;
  referenceNumber?: string;
  notes?: string;
}

export interface PerformanceMetrics {
  partnerId: string;
  overallScore: number;
  timelinessScore: number;
  qualityScore: number;
  complianceScore: number;
  totalProjects: number;
  onTimeDeliveries: number;
  delayedProjects: number;
  averageDelay: number; // in days
  customerSatisfaction: number;
  lastUpdated: string;
}
