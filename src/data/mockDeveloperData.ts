
import { Partner, ProjectMilestone, DisbursementTracking, PerformanceMetrics } from '@/types/developer';

export const mockPartners: Partner[] = [
  {
    id: 'dev-001',
    name: 'Elite Property Developers Ltd',
    type: 'developer',
    status: 'active',
    email: 'contact@eliteproperties.ng',
    phone: '+234-801-234-5678',
    address: '15 Victoria Island, Lagos State',
    registrationNumber: 'RC-12345678',
    taxId: 'TIN-987654321',
    bankAccount: {
      accountNumber: '1234567890',
      bankName: 'First Bank of Nigeria',
      accountName: 'Elite Property Developers Ltd'
    },
    onboardingStatus: 'approved',
    performanceScore: 4.5,
    totalProjects: 25,
    completedProjects: 22,
    joinDate: '2022-01-15',
    lastActivity: '2024-06-28',
    documents: [
      {
        id: 'doc-001',
        type: 'cac_certificate',
        name: 'CAC Certificate',
        url: '/documents/cac-cert.pdf',
        uploadDate: '2022-01-10',
        verified: true
      }
    ],
    certifications: [
      {
        id: 'cert-001',
        name: 'Building Construction License',
        issuingBody: 'Lagos State Building Control Agency',
        issueDate: '2021-06-01',
        expiryDate: '2026-06-01',
        certificateNumber: 'LSBCA-2021-001'
      }
    ]
  },
  {
    id: 'surv-001',
    name: 'Precision Survey Services',
    type: 'surveyor',
    status: 'active',
    email: 'info@precisionsurvey.ng',
    phone: '+234-802-345-6789',
    address: '8 Ikeja GRA, Lagos State',
    registrationNumber: 'RC-87654321',
    taxId: 'TIN-123456789',
    bankAccount: {
      accountNumber: '0987654321',
      bankName: 'GTBank',
      accountName: 'Precision Survey Services'
    },
    onboardingStatus: 'approved',
    performanceScore: 4.8,
    totalProjects: 150,
    completedProjects: 148,
    joinDate: '2021-08-20',
    lastActivity: '2024-06-29',
    documents: [],
    certifications: []
  }
];

export const mockMilestones: ProjectMilestone[] = [
  {
    id: 'mile-001',
    projectId: 'proj-001',
    partnerId: 'dev-001',
    title: 'Foundation Completion',
    description: 'Complete foundation work for Block A',
    targetDate: '2024-07-15',
    actualDate: '2024-07-12',
    status: 'completed',
    completionPercentage: 100,
    paymentAmount: 5000000,
    paymentStatus: 'disbursed',
    verificationNotes: 'Foundation work completed to specification',
    verifiedBy: 'John Engineer',
    verificationDate: '2024-07-13',
    attachments: ['foundation-photos.jpg', 'completion-report.pdf']
  },
  {
    id: 'mile-002',
    projectId: 'proj-001',
    partnerId: 'dev-001',
    title: 'Roofing Phase',
    description: 'Complete roofing for all blocks',
    targetDate: '2024-08-30',
    status: 'in_progress',
    completionPercentage: 65,
    paymentAmount: 3000000,
    paymentStatus: 'pending',
    attachments: []
  }
];

export const mockDisbursements: DisbursementTracking[] = [
  {
    id: 'disb-001',
    milestoneId: 'mile-001',
    partnerId: 'dev-001',
    amount: 5000000,
    requestDate: '2024-07-13',
    approvalDate: '2024-07-14',
    disbursementDate: '2024-07-15',
    status: 'disbursed',
    approvedBy: 'Finance Manager',
    referenceNumber: 'FMB-2024-0001',
    notes: 'Foundation milestone payment'
  }
];

export const mockPerformanceMetrics: PerformanceMetrics[] = [
  {
    partnerId: 'dev-001',
    overallScore: 4.5,
    timelinessScore: 4.2,
    qualityScore: 4.8,
    complianceScore: 4.5,
    totalProjects: 25,
    onTimeDeliveries: 20,
    delayedProjects: 5,
    averageDelay: 3.2,
    customerSatisfaction: 4.6,
    lastUpdated: '2024-06-29'
  }
];
