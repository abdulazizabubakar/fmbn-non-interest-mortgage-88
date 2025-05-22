
import { MortgageApplication } from '@/types/mortgage-application';

export const mockMortgageApplications: MortgageApplication[] = [
  {
    id: "app-001",
    applicationNumber: "FMBN-IJR-2025-0001",
    customerId: "cust-001",
    customerName: "Ibrahim Mohammed",
    status: "submitted",
    submissionDate: "2025-04-01T10:30:00Z",
    lastUpdated: "2025-04-01T10:30:00Z",
    customerType: "nhf_contributor",
    nhfContributorId: "NHF-123456",
    nhfContributionStatus: "active",
    identityVerified: true,
    bvnVerified: true,
    ninVerified: true,
    financingType: "ijara",
    documents: [
      {
        id: "doc-001",
        type: "employer_letter",
        title: "Employer Confirmation Letter",
        fileUrl: "/documents/emp-letter-001.pdf",
        uploadDate: "2025-04-01T10:15:00Z",
        status: "pending"
      },
      {
        id: "doc-002",
        type: "payslip",
        title: "March 2025 Payslip",
        fileUrl: "/documents/payslip-001.pdf",
        uploadDate: "2025-04-01T10:18:00Z",
        status: "pending"
      },
      {
        id: "doc-003",
        type: "utility_bill",
        title: "Electricity Bill",
        fileUrl: "/documents/utility-001.pdf",
        uploadDate: "2025-04-01T10:20:00Z",
        status: "pending"
      }
    ],
    approvalStages: [
      {
        id: "stage-001",
        stage: "credit",
        status: "pending",
        assignedDate: "2025-04-01T11:00:00Z"
      }
    ]
  },
  {
    id: "app-002",
    applicationNumber: "FMBN-IJR-2025-0002",
    customerId: "cust-002",
    customerName: "Amina Yusuf",
    status: "in_review",
    submissionDate: "2025-03-25T14:45:00Z",
    lastUpdated: "2025-03-28T09:15:00Z",
    customerType: "government_worker",
    nhfContributorId: "NHF-789012",
    nhfContributionStatus: "active",
    identityVerified: true,
    bvnVerified: true,
    ninVerified: true,
    financingType: "ijara",
    property: {
      id: "prop-001",
      address: "15 Peace Avenue, Abuja",
      type: "apartment",
      value: 25000000,
      area: 120,
      location: "Wuse Zone 5",
      state: "FCT",
      preBooked: true,
      preBookingExpiry: "2025-05-01T00:00:00Z"
    },
    financialDetails: {
      propertyValue: 25000000,
      equityContribution: 5000000,
      equityPercentage: 20,
      financingAmount: 20000000,
      monthlyRent: 83333,
      tenor: 240,
      debtToIncomeRatio: 0.32
    },
    documents: [
      {
        id: "doc-004",
        type: "employer_letter",
        title: "Employer Confirmation Letter",
        fileUrl: "/documents/emp-letter-002.pdf",
        uploadDate: "2025-03-25T14:30:00Z",
        status: "verified",
        verifiedBy: "Ahmed Olatunji",
        verificationDate: "2025-03-26T11:20:00Z"
      },
      {
        id: "doc-005",
        type: "payslip",
        title: "February 2025 Payslip",
        fileUrl: "/documents/payslip-002.pdf",
        uploadDate: "2025-03-25T14:32:00Z",
        status: "verified",
        verifiedBy: "Ahmed Olatunji",
        verificationDate: "2025-03-26T11:22:00Z"
      }
    ],
    eligibilityCheck: {
      status: "eligible",
      incomeEligible: true,
      nhfEligible: true,
      dtiRatioEligible: true,
      employmentEligible: true,
      checkedDate: "2025-03-26T14:00:00Z",
      checkedBy: "System"
    },
    approvalStages: [
      {
        id: "stage-002",
        stage: "credit",
        status: "approved",
        assignedTo: "Fatima Aliyu",
        assignedDate: "2025-03-26T09:00:00Z",
        completedBy: "Fatima Aliyu",
        completedDate: "2025-03-27T15:30:00Z",
        action: "approve",
        notes: "All credit requirements satisfied."
      },
      {
        id: "stage-003",
        stage: "legal",
        status: "in_progress",
        assignedTo: "Chukwudi Okonkwo",
        assignedDate: "2025-03-28T09:15:00Z"
      }
    ],
    currentApprovalStage: "legal",
    createdBy: "online-portal"
  },
  {
    id: "app-003",
    applicationNumber: "FMBN-IJR-2025-0003",
    customerId: "cust-003",
    customerName: "John Adewale",
    status: "offer_sent",
    submissionDate: "2025-03-10T11:20:00Z",
    lastUpdated: "2025-04-05T16:45:00Z",
    customerType: "private_sector",
    identityVerified: true,
    bvnVerified: true,
    ninVerified: true,
    financingType: "ijara",
    property: {
      id: "prop-002",
      address: "7B Crescent Avenue, Lagos",
      type: "duplex",
      value: 45000000,
      area: 250,
      location: "Lekki Phase 1",
      state: "Lagos",
      preBooked: false
    },
    financialDetails: {
      propertyValue: 45000000,
      equityContribution: 9000000,
      equityPercentage: 20,
      financingAmount: 36000000,
      monthlyRent: 150000,
      tenor: 300,
      debtToIncomeRatio: 0.28
    },
    documents: [
      {
        id: "doc-010",
        type: "employer_letter",
        title: "Employer Confirmation Letter",
        fileUrl: "/documents/emp-letter-003.pdf",
        uploadDate: "2025-03-10T11:10:00Z",
        status: "verified",
        verifiedBy: "Blessing Okafor",
        verificationDate: "2025-03-11T14:30:00Z"
      }
    ],
    eligibilityCheck: {
      status: "eligible",
      incomeEligible: true,
      nhfEligible: false,
      dtiRatioEligible: true,
      employmentEligible: true,
      checkedDate: "2025-03-12T10:00:00Z",
      checkedBy: "System"
    },
    approvalStages: [
      {
        id: "stage-010",
        stage: "credit",
        status: "approved",
        assignedTo: "Fatima Aliyu",
        assignedDate: "2025-03-12T11:00:00Z",
        completedBy: "Fatima Aliyu",
        completedDate: "2025-03-15T14:20:00Z",
        action: "approve",
        notes: "Strong income profile. Approved."
      },
      {
        id: "stage-011",
        stage: "legal",
        status: "approved",
        assignedTo: "Chukwudi Okonkwo",
        assignedDate: "2025-03-16T09:00:00Z",
        completedBy: "Chukwudi Okonkwo",
        completedDate: "2025-03-20T16:15:00Z",
        action: "approve",
        notes: "All legal requirements satisfied."
      },
      {
        id: "stage-012",
        stage: "shariah",
        status: "approved",
        assignedTo: "Sheikh Hassan Ibrahim",
        assignedDate: "2025-03-21T10:00:00Z",
        completedBy: "Sheikh Hassan Ibrahim",
        completedDate: "2025-03-25T11:30:00Z",
        action: "approve",
        notes: "Ijarah structure complies with Shariah principles."
      },
      {
        id: "stage-013",
        stage: "management",
        status: "approved",
        assignedTo: "Musa Ibrahim",
        assignedDate: "2025-03-26T09:00:00Z",
        completedBy: "Musa Ibrahim",
        completedDate: "2025-04-02T15:45:00Z",
        action: "approve",
        notes: "Approved by management committee."
      }
    ],
    contract: {
      id: "contract-001",
      generatedDate: "2025-04-05T10:30:00Z",
      generatedBy: "System",
      documentUrl: "/contracts/ijarah-001.pdf",
      signedByApplicant: false,
      signedByFmbn: true,
      fmbnSignDate: "2025-04-05T16:30:00Z",
      status: "sent",
      paymentScheduleUrl: "/contracts/schedule-001.pdf"
    },
    takafulDetails: {
      policyNumber: "TKF-12345",
      provider: "Takaful Insurance Nigeria",
      coverageAmount: 45000000,
      status: "active",
      premium: 225000
    },
    employerUndertaking: {
      employerName: "TechNova Solutions",
      employerType: "private",
      contactPerson: "Sarah Johnson",
      contactEmail: "hr@technova.ng",
      contactPhone: "+2349012345678",
      undertakingDocumentUrl: "/documents/undertaking-001.pdf",
      status: "verified",
      verificationDate: "2025-03-30T14:20:00Z"
    },
    createdBy: "branch-agent"
  },
  {
    id: "app-004",
    applicationNumber: "FMBN-IJR-2025-0004",
    customerId: "cust-004",
    customerName: "Fatima Abdullahi",
    status: "rejected",
    submissionDate: "2025-03-05T09:15:00Z",
    lastUpdated: "2025-03-18T14:30:00Z",
    customerType: "diaspora",
    identityVerified: true,
    bvnVerified: true,
    ninVerified: false,
    financingType: "ijara",
    documents: [
      {
        id: "doc-015",
        type: "payslip",
        title: "Overseas Payslip",
        fileUrl: "/documents/payslip-004.pdf",
        uploadDate: "2025-03-05T09:10:00Z",
        status: "verified"
      }
    ],
    eligibilityCheck: {
      status: "ineligible",
      incomeEligible: true,
      nhfEligible: false,
      dtiRatioEligible: false,
      employmentEligible: true,
      ineligibilityReasons: [
        "Debt-to-income ratio exceeds maximum threshold",
        "No NHF contribution history"
      ],
      checkedDate: "2025-03-10T11:00:00Z",
      checkedBy: "System"
    },
    approvalStages: [
      {
        id: "stage-020",
        stage: "credit",
        status: "rejected",
        assignedTo: "Fatima Aliyu",
        assignedDate: "2025-03-12T11:00:00Z",
        completedBy: "Fatima Aliyu",
        completedDate: "2025-03-18T14:30:00Z",
        action: "reject",
        notes: "DTI ratio too high at 48%. Maximum allowed is 33%."
      }
    ],
    createdBy: "online-portal"
  },
  {
    id: "app-005",
    applicationNumber: "FMBN-IJR-2025-0005",
    customerId: "cust-005",
    customerName: "Emeka Okonkwo",
    status: "draft",
    submissionDate: "2025-04-10T16:20:00Z",
    lastUpdated: "2025-04-10T16:20:00Z",
    customerType: "cooperative",
    identityVerified: false,
    bvnVerified: false,
    ninVerified: false,
    financingType: "ijara",
    documents: [],
    approvalStages: [],
    createdBy: "online-portal"
  }
];
