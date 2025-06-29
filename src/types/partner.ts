
export type PartnerType = 'developer' | 'surveyor' | 'valuer' | 'contractor' | 'vendor';
export type PartnerStatus = 'pending' | 'active' | 'suspended' | 'inactive';
export type MilestoneStatus = 'pending' | 'in-progress' | 'completed' | 'delayed' | 'cancelled';
export type PerformanceRating = 'excellent' | 'good' | 'satisfactory' | 'poor';

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  status: PartnerStatus;
  registrationDate: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  performanceScore: number;
  performanceRating: PerformanceRating;
  activeProjects: number;
  completedProjects: number;
  documents: PartnerDocument[];
  certifications: Certification[];
}

export interface PartnerDocument {
  id: string;
  type: string;
  fileName: string;
  uploadDate: string;
  status: 'pending' | 'verified' | 'rejected';
  verifiedBy?: string;
  verificationDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuingBody: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending-renewal';
}

export interface ProjectMilestone {
  id: string;
  projectId: string;
  partnerId: string;
  title: string;
  description: string;
  expectedDate: string;
  actualDate?: string;
  status: MilestoneStatus;
  paymentAmount: number;
  paymentStatus: 'pending' | 'approved' | 'disbursed';
  evidencePhotos: string[];
  notes: string;
}

export interface PartnerPerformance {
  partnerId: string;
  period: string;
  deliveryScore: number;
  qualityScore: number;
  complianceScore: number;
  overallScore: number;
  rating: PerformanceRating;
  projects: {
    total: number;
    onTime: number;
    delayed: number;
    cancelled: number;
  };
}
