
import { Customer, CustomerComplaint, CustomerCommunication, CustomerLease, CustomerType, CustomerTag } from '@/types/customer';

// Generate 20 realistic mock customers for our customer management module
export const mockCustomers: Customer[] = [
  {
    id: "cust-001",
    customerNumber: "NHF-20240001",
    name: "Ahmed Ibrahim",
    email: "ahmed.ibrahim@example.com",
    phone: "+2348012345678",
    alternatePhone: "+2348087654321",
    nationalId: "12345678901",
    bvn: "10023456789",
    dateOfBirth: "1985-04-12",
    gender: "male",
    maritalStatus: "married",
    
    address: "10 Ahmadu Bello Way",
    city: "Kaduna",
    state: "Kaduna",
    postalCode: "800001",
    
    employer: "Federal Ministry of Works",
    employerAddress: "Federal Secretariat, Kaduna",
    occupation: "Civil Engineer",
    monthlyIncome: 350000,
    employmentStartDate: "2015-06-01",
    
    customerType: "government_worker",
    status: "active",
    tags: ["good_standing"],
    nhfContributorId: "NHF-123456",
    nhfRegistrationDate: "2015-07-01",
    
    documents: [
      {
        id: "doc-001",
        customerId: "cust-001",
        documentType: "id_card",
        documentUrl: "/documents/id_card_001.pdf",
        verified: true,
        uploadDate: "2023-01-15",
        verificationDate: "2023-01-20",
        verifiedBy: "staff-005"
      },
      {
        id: "doc-002",
        customerId: "cust-001",
        documentType: "employment_letter",
        documentUrl: "/documents/employment_letter_001.pdf",
        verified: true,
        uploadDate: "2023-01-15",
        verificationDate: "2023-01-22",
        verifiedBy: "staff-008"
      }
    ],
    
    verification: {
      ninVerified: true,
      ninVerificationDate: "2023-01-18",
      bvnVerified: true,
      bvnVerificationDate: "2023-01-18",
      employmentVerified: true,
      employmentVerificationDate: "2023-01-25",
      addressVerified: true,
      addressVerificationDate: "2023-01-30"
    },
    
    riskProfile: {
      customerId: "cust-001",
      riskCategory: "low",
      contributionRegularity: "regular",
      defaultHistory: "none",
      lastReviewDate: "2023-06-15",
      reviewedBy: "staff-002",
      recommendations: ["Eligible for ownership transfer after 3 years"]
    },
    
    createdAt: "2023-01-15",
    updatedAt: "2023-06-15",
    createdBy: "staff-001",
    updatedBy: "staff-002",
    notes: "Excellent payment history. Consider for early ownership program."
  },
  
  {
    id: "cust-002",
    customerNumber: "NHF-20240002",
    name: "Fatima Mustapha",
    email: "fatima.m@example.com",
    phone: "+2348023456789",
    nationalId: "23456789012",
    bvn: "20034567890",
    dateOfBirth: "1990-08-23",
    gender: "female",
    maritalStatus: "single",
    
    address: "25 Ibrahim Taiwo Road",
    city: "Kano",
    state: "Kano",
    postalCode: "700001",
    
    employer: "Guaranty Trust Bank",
    employerAddress: "45 Murtala Mohammed Way, Kano",
    occupation: "Banking Officer",
    monthlyIncome: 280000,
    employmentStartDate: "2019-03-15",
    
    customerType: "private_sector",
    status: "active",
    tags: ["in_arrears"],
    nhfContributorId: "NHF-234567",
    nhfRegistrationDate: "2019-05-01",
    
    documents: [
      {
        id: "doc-003",
        customerId: "cust-002",
        documentType: "id_card",
        documentUrl: "/documents/id_card_002.pdf",
        verified: true,
        uploadDate: "2023-03-10",
        verificationDate: "2023-03-15",
        verifiedBy: "staff-005"
      }
    ],
    
    verification: {
      ninVerified: true,
      ninVerificationDate: "2023-03-12",
      bvnVerified: true,
      bvnVerificationDate: "2023-03-12",
      employmentVerified: true,
      employmentVerificationDate: "2023-03-20",
      addressVerified: false,
      addressVerificationDate: undefined
    },
    
    riskProfile: {
      customerId: "cust-002",
      riskCategory: "medium",
      contributionRegularity: "occasional",
      defaultHistory: "minor",
      lastReviewDate: "2023-08-05",
      reviewedBy: "staff-003",
      recommendations: ["Needs payment reminder", "Consider restructuring"]
    },
    
    createdAt: "2023-03-10",
    updatedAt: "2023-08-05",
    createdBy: "staff-001",
    updatedBy: "staff-003"
  },
  
  {
    id: "cust-003",
    customerNumber: "NHF-20240003",
    name: "Chukwudi Okonkwo",
    email: "chukwudi.o@example.com",
    phone: "+2348034567890",
    nationalId: "34567890123",
    bvn: "30045678901",
    dateOfBirth: "1978-11-05",
    gender: "male",
    maritalStatus: "married",
    
    address: "7 Okpara Avenue",
    city: "Enugu",
    state: "Enugu",
    postalCode: "400001",
    
    employer: "Eastern Nigeria Teaching Hospital",
    employerAddress: "University Road, Enugu",
    occupation: "Medical Doctor",
    monthlyIncome: 650000,
    employmentStartDate: "2010-01-10",
    
    customerType: "government_worker",
    status: "active",
    tags: ["good_standing", "eligible_for_ownership"],
    nhfContributorId: "NHF-345678",
    nhfRegistrationDate: "2010-02-15",
    
    documents: [
      {
        id: "doc-005",
        customerId: "cust-003",
        documentType: "id_card",
        documentUrl: "/documents/id_card_003.pdf",
        verified: true,
        uploadDate: "2022-08-05",
        verificationDate: "2022-08-10",
        verifiedBy: "staff-006"
      },
      {
        id: "doc-006",
        customerId: "cust-003",
        documentType: "payslip",
        documentUrl: "/documents/payslip_003.pdf",
        verified: true,
        uploadDate: "2022-08-05",
        verificationDate: "2022-08-12",
        verifiedBy: "staff-007"
      }
    ],
    
    verification: {
      ninVerified: true,
      ninVerificationDate: "2022-08-07",
      bvnVerified: true,
      bvnVerificationDate: "2022-08-07",
      employmentVerified: true,
      employmentVerificationDate: "2022-08-15",
      addressVerified: true,
      addressVerificationDate: "2022-08-20"
    },
    
    riskProfile: {
      customerId: "cust-003",
      riskCategory: "low",
      contributionRegularity: "regular",
      defaultHistory: "none",
      lastReviewDate: "2023-07-10",
      reviewedBy: "staff-002",
      recommendations: ["Prime candidate for ownership transfer"]
    },
    
    createdAt: "2022-08-05",
    updatedAt: "2023-07-10",
    createdBy: "staff-004",
    updatedBy: "staff-002"
  },

  {
    id: "cust-004",
    customerNumber: "NHF-20240004",
    name: "Amina Yusuf",
    email: "amina.y@example.com",
    phone: "+2348045678901",
    nationalId: "45678901234",
    bvn: "40056789012",
    dateOfBirth: "1992-03-17",
    gender: "female",
    maritalStatus: "married",
    
    address: "15 Ahmadu Bello Way",
    city: "Sokoto",
    state: "Sokoto",
    postalCode: "840001",
    
    employer: "Sokoto State University",
    employerAddress: "Birnin Kebbi Road, Sokoto",
    occupation: "Lecturer",
    monthlyIncome: 320000,
    employmentStartDate: "2018-09-01",
    
    customerType: "government_worker",
    status: "active",
    tags: ["good_standing"],
    nhfContributorId: "NHF-456789",
    nhfRegistrationDate: "2018-10-01",
    
    documents: [
      {
        id: "doc-007",
        customerId: "cust-004",
        documentType: "id_card",
        documentUrl: "/documents/id_card_004.pdf",
        verified: true,
        uploadDate: "2023-05-12",
        verificationDate: "2023-05-15",
        verifiedBy: "staff-005"
      }
    ],
    
    verification: {
      ninVerified: true,
      ninVerificationDate: "2023-05-13",
      bvnVerified: true,
      bvnVerificationDate: "2023-05-13",
      employmentVerified: true,
      employmentVerificationDate: "2023-05-20",
      addressVerified: true,
      addressVerificationDate: "2023-05-25"
    },
    
    createdAt: "2023-05-12",
    updatedAt: "2023-05-25",
    createdBy: "staff-001",
    updatedBy: "staff-005"
  },

  {
    id: "cust-005",
    customerNumber: "NHF-20240005",
    name: "Blessing Okafor",
    email: "blessing.o@example.com",
    phone: "+2348056789012",
    nationalId: "56789012345",
    bvn: "50067890123",
    dateOfBirth: "1988-12-10",
    gender: "female",
    maritalStatus: "divorced",
    
    address: "23 Awolowo Road",
    city: "Ibadan",
    state: "Oyo",
    postalCode: "200001",
    
    employer: "First Bank Nigeria",
    employerAddress: "Challenge Roundabout, Ibadan",
    occupation: "Branch Manager",
    monthlyIncome: 750000,
    employmentStartDate: "2012-06-15",
    
    customerType: "private_sector",
    status: "active",
    tags: ["good_standing"],
    nhfContributorId: "NHF-567890",
    nhfRegistrationDate: "2012-07-01",
    
    documents: [
      {
        id: "doc-009",
        customerId: "cust-005",
        documentType: "id_card",
        documentUrl: "/documents/id_card_005.pdf",
        verified: true,
        uploadDate: "2022-10-08",
        verificationDate: "2022-10-12",
        verifiedBy: "staff-006"
      }
    ],
    
    verification: {
      ninVerified: true,
      ninVerificationDate: "2022-10-10",
      bvnVerified: true,
      bvnVerificationDate: "2022-10-10",
      employmentVerified: true,
      employmentVerificationDate: "2022-10-18",
      addressVerified: true,
      addressVerificationDate: "2022-10-22"
    },
    
    riskProfile: {
      customerId: "cust-005",
      riskCategory: "low",
      contributionRegularity: "regular",
      defaultHistory: "none",
      lastReviewDate: "2023-09-05",
      reviewedBy: "staff-003",
      recommendations: []
    },
    
    createdAt: "2022-10-08",
    updatedAt: "2023-09-05",
    createdBy: "staff-004",
    updatedBy: "staff-003"
  },
  
  // More customers
  {
    id: "cust-006",
    customerNumber: "NHF-20240006",
    name: "Mohammed Abubakar",
    email: "mohammed.a@example.com",
    phone: "+2348067890123",
    nationalId: "67890123456",
    bvn: "60078901234",
    dateOfBirth: "1975-05-20",
    gender: "male",
    maritalStatus: "married",
    
    address: "5 Kashim Ibrahim Road",
    city: "Maiduguri",
    state: "Borno",
    postalCode: "600001",
    
    employer: "Borno State Civil Service",
    employerAddress: "State Secretariat, Maiduguri",
    occupation: "Administrative Officer",
    monthlyIncome: 280000,
    employmentStartDate: "2005-03-10",
    
    customerType: "government_worker",
    status: "defaulting",
    tags: ["in_arrears", "high_risk"],
    nhfContributorId: "NHF-678901",
    nhfRegistrationDate: "2005-04-01",
    
    documents: [
      {
        id: "doc-011",
        customerId: "cust-006",
        documentType: "id_card",
        documentUrl: "/documents/id_card_006.pdf",
        verified: true,
        uploadDate: "2022-12-03",
        verificationDate: "2022-12-08",
        verifiedBy: "staff-005"
      }
    ],
    
    verification: {
      ninVerified: true,
      ninVerificationDate: "2022-12-05",
      bvnVerified: true,
      bvnVerificationDate: "2022-12-05",
      employmentVerified: true,
      employmentVerificationDate: "2022-12-15",
      addressVerified: false,
      addressVerificationDate: undefined
    },
    
    riskProfile: {
      customerId: "cust-006",
      riskCategory: "high",
      contributionRegularity: "irregular",
      defaultHistory: "significant",
      lastReviewDate: "2023-10-10",
      reviewedBy: "staff-002",
      recommendations: ["Initiate restructuring", "Schedule counseling"]
    },
    
    createdAt: "2022-12-03",
    updatedAt: "2023-10-10",
    createdBy: "staff-001",
    updatedBy: "staff-002",
    notes: "Customer facing economic hardship due to regional insecurity."
  },

  {
    id: "cust-007",
    customerNumber: "NHF-20240007",
    name: "Grace Adebayo",
    email: "grace.a@example.com",
    phone: "+2348078901234",
    nationalId: "78901234567",
    bvn: "70089012345",
    dateOfBirth: "1983-09-15",
    gender: "female",
    maritalStatus: "single",
    
    address: "28 Broad Street",
    city: "Lagos",
    state: "Lagos",
    postalCode: "100001",
    
    employer: "MTN Nigeria",
    employerAddress: "Falomo, Ikoyi, Lagos",
    occupation: "Marketing Manager",
    monthlyIncome: 950000,
    employmentStartDate: "2014-02-01",
    
    customerType: "private_sector",
    status: "active",
    tags: ["good_standing"],
    nhfContributorId: "NHF-789012",
    nhfRegistrationDate: "2014-03-01",
    
    documents: [
      {
        id: "doc-013",
        customerId: "cust-007",
        documentType: "id_card",
        documentUrl: "/documents/id_card_007.pdf",
        verified: true,
        uploadDate: "2023-02-20",
        verificationDate: "2023-02-25",
        verifiedBy: "staff-006"
      }
    ],
    
    verification: {
      ninVerified: true,
      ninVerificationDate: "2023-02-22",
      bvnVerified: true,
      bvnVerificationDate: "2023-02-22",
      employmentVerified: true,
      employmentVerificationDate: "2023-03-01",
      addressVerified: true,
      addressVerificationDate: "2023-03-05"
    },
    
    riskProfile: {
      customerId: "cust-007",
      riskCategory: "low",
      contributionRegularity: "regular",
      defaultHistory: "none",
      lastReviewDate: "2023-08-15",
      reviewedBy: "staff-003",
      recommendations: []
    },
    
    createdAt: "2023-02-20",
    updatedAt: "2023-08-15",
    createdBy: "staff-004",
    updatedBy: "staff-003"
  },

  {
    id: "cust-008",
    customerNumber: "NHF-20240008",
    name: "Taiwo Adeleke",
    email: "taiwo.a@example.com",
    phone: "+2348089012345",
    nationalId: "89012345678",
    bvn: "80090123456",
    dateOfBirth: "1995-01-25",
    gender: "male",
    maritalStatus: "single",
    
    address: "12 Adesanya Street",
    city: "Abeokuta",
    state: "Ogun",
    postalCode: "110001",
    
    employer: "Dangote Cement",
    employerAddress: "Ibese, Ogun State",
    occupation: "Production Supervisor",
    monthlyIncome: 420000,
    employmentStartDate: "2020-05-15",
    
    customerType: "private_sector",
    status: "pending_verification",
    tags: ["needs_review"],
    nhfContributorId: "NHF-890123",
    nhfRegistrationDate: "2020-06-01",
    
    documents: [
      {
        id: "doc-015",
        customerId: "cust-008",
        documentType: "id_card",
        documentUrl: "/documents/id_card_008.pdf",
        verified: false,
        uploadDate: "2023-11-05",
        verificationDate: undefined,
        verifiedBy: undefined
      }
    ],
    
    verification: {
      ninVerified: true,
      ninVerificationDate: "2023-11-08",
      bvnVerified: true,
      bvnVerificationDate: "2023-11-08",
      employmentVerified: false,
      employmentVerificationDate: undefined,
      addressVerified: false,
      addressVerificationDate: undefined
    },
    
    createdAt: "2023-11-05",
    updatedAt: "2023-11-08",
    createdBy: "staff-001",
    updatedBy: "staff-005"
  },
  {
    id: "cust-009",
    customerNumber: "NHF-20240009",
    name: "Hauwa Musa",
    email: "hauwa.m@example.com",
    phone: "+2348090123456",
    nationalId: "90123456789",
    bvn: "90001234567",
    dateOfBirth: "1987-07-30",
    gender: "female",
    maritalStatus: "married",
    
    address: "45 Mohammed Way",
    city: "Katsina",
    state: "Katsina",
    postalCode: "820001",
    
    employer: "Federal Polytechnic Katsina",
    employerAddress: "Dutsinma Road, Katsina",
    occupation: "Lecturer",
    monthlyIncome: 310000,
    employmentStartDate: "2016-09-01",
    
    customerType: "government_worker",
    status: "active",
    tags: ["good_standing"],
    nhfContributorId: "NHF-901234",
    nhfRegistrationDate: "2016-10-01",
    
    documents: [
      {
        id: "doc-017",
        customerId: "cust-009",
        documentType: "id_card",
        documentUrl: "/documents/id_card_009.pdf",
        verified: true,
        uploadDate: "2023-04-10",
        verificationDate: "2023-04-15",
        verifiedBy: "staff-006"
      }
    ],
    
    verification: {
      ninVerified: true,
      ninVerificationDate: "2023-04-12",
      bvnVerified: true,
      bvnVerificationDate: "2023-04-12",
      employmentVerified: true,
      employmentVerificationDate: "2023-04-20",
      addressVerified: true,
      addressVerificationDate: "2023-04-25"
    },
    
    riskProfile: {
      customerId: "cust-009",
      riskCategory: "low",
      contributionRegularity: "regular",
      defaultHistory: "none",
      lastReviewDate: "2023-07-05",
      reviewedBy: "staff-002",
      recommendations: []
    },
    
    createdAt: "2023-04-10",
    updatedAt: "2023-07-05",
    createdBy: "staff-004",
    updatedBy: "staff-002"
  },
  
  {
    id: "cust-010",
    customerNumber: "NHF-20240010",
    name: "Obinna Nwosu",
    email: "obinna.n@example.com",
    phone: "+2348001234567",
    nationalId: "01234567890",
    bvn: "00012345678",
    dateOfBirth: "1980-03-12",
    gender: "male",
    maritalStatus: "married",
    
    address: "7 Zik Avenue",
    city: "Owerri",
    state: "Imo",
    postalCode: "460001",
    
    employer: "Consolidated Breweries",
    employerAddress: "Port Harcourt Road, Owerri",
    occupation: "Supply Chain Manager",
    monthlyIncome: 580000,
    employmentStartDate: "2013-11-15",
    
    customerType: "private_sector",
    status: "active",
    tags: ["good_standing"],
    nhfContributorId: "NHF-012345",
    nhfRegistrationDate: "2013-12-01",
    
    documents: [
      {
        id: "doc-019",
        customerId: "cust-010",
        documentType: "id_card",
        documentUrl: "/documents/id_card_010.pdf",
        verified: true,
        uploadDate: "2022-09-08",
        verificationDate: "2022-09-12",
        verifiedBy: "staff-005"
      }
    ],
    
    verification: {
      ninVerified: true,
      ninVerificationDate: "2022-09-10",
      bvnVerified: true,
      bvnVerificationDate: "2022-09-10",
      employmentVerified: true,
      employmentVerificationDate: "2022-09-18",
      addressVerified: true,
      addressVerificationDate: "2022-09-22"
    },
    
    riskProfile: {
      customerId: "cust-010",
      riskCategory: "low",
      contributionRegularity: "regular",
      defaultHistory: "none",
      lastReviewDate: "2023-06-20",
      reviewedBy: "staff-003",
      recommendations: []
    },
    
    createdAt: "2022-09-08",
    updatedAt: "2023-06-20",
    createdBy: "staff-001",
    updatedBy: "staff-003"
  }
];

export const mockCustomerLeases: CustomerLease[] = [
  {
    id: "lease-001",
    customerId: "cust-001",
    leaseNumber: "FMBN-L-2023-001",
    propertyId: "prop-001",
    unitId: "unit-005",
    status: "active",
    startDate: "2023-02-01",
    maturityDate: "2033-02-01",
    monthlyPayment: 85000,
    totalValue: 10200000,
    paidToDate: 1190000,
    remainingBalance: 9010000,
    lastPaymentDate: "2023-05-10",
    nextPaymentDate: "2023-06-10",
    ownershipPercentage: 11.7,
    takafulPolicyId: "TAK-2023-001",
    contractDocumentUrl: "/documents/contracts/lease_contract_001.pdf"
  },
  {
    id: "lease-002",
    customerId: "cust-002",
    leaseNumber: "FMBN-L-2023-002",
    propertyId: "prop-002",
    unitId: "unit-012",
    status: "defaulting",
    startDate: "2023-04-01",
    maturityDate: "2033-04-01",
    monthlyPayment: 65000,
    totalValue: 7800000,
    paidToDate: 195000,
    remainingBalance: 7605000,
    lastPaymentDate: "2023-05-05",
    nextPaymentDate: "2023-06-05",
    ownershipPercentage: 2.5,
    takafulPolicyId: "TAK-2023-002",
    contractDocumentUrl: "/documents/contracts/lease_contract_002.pdf"
  },
  {
    id: "lease-003",
    customerId: "cust-003",
    leaseNumber: "FMBN-L-2022-010",
    propertyId: "prop-003",
    unitId: "unit-025",
    status: "active",
    startDate: "2022-09-01",
    maturityDate: "2032-09-01",
    monthlyPayment: 120000,
    totalValue: 14400000,
    paidToDate: 1200000,
    remainingBalance: 13200000,
    lastPaymentDate: "2023-05-02",
    nextPaymentDate: "2023-06-02",
    ownershipPercentage: 8.3,
    takafulPolicyId: "TAK-2022-010",
    contractDocumentUrl: "/documents/contracts/lease_contract_003.pdf"
  },
  {
    id: "lease-004",
    customerId: "cust-005",
    leaseNumber: "FMBN-L-2022-015",
    propertyId: "prop-005",
    unitId: "unit-101",
    status: "active",
    startDate: "2022-11-01",
    maturityDate: "2032-11-01",
    monthlyPayment: 150000,
    totalValue: 18000000,
    paidToDate: 900000,
    remainingBalance: 17100000,
    lastPaymentDate: "2023-05-15",
    nextPaymentDate: "2023-06-15",
    ownershipPercentage: 5.0,
    takafulPolicyId: "TAK-2022-015",
    contractDocumentUrl: "/documents/contracts/lease_contract_005.pdf"
  },
  {
    id: "lease-005",
    customerId: "cust-006",
    leaseNumber: "FMBN-L-2023-005",
    propertyId: "prop-004",
    unitId: "unit-056",
    status: "defaulting",
    startDate: "2023-01-01",
    maturityDate: "2033-01-01",
    monthlyPayment: 70000,
    totalValue: 8400000,
    paidToDate: 210000,
    remainingBalance: 8190000,
    lastPaymentDate: "2023-03-05",
    nextPaymentDate: "2023-04-05",
    ownershipPercentage: 2.5,
    takafulPolicyId: "TAK-2023-005",
    contractDocumentUrl: "/documents/contracts/lease_contract_006.pdf"
  }
];

export const mockCustomerCommunications: CustomerCommunication[] = [
  {
    id: "comm-001",
    customerId: "cust-001",
    type: "email",
    subject: "Welcome to FMBN Non-Interest Housing Program",
    message: "Dear Ahmed Ibrahim, welcome to the Federal Mortgage Bank of Nigeria's Non-Interest Rent-to-Own Housing Program. We are delighted to have you on board...",
    sentBy: "system",
    sentDate: "2023-02-01",
    status: "delivered",
    templateId: "welcome-email"
  },
  {
    id: "comm-002",
    customerId: "cust-001",
    type: "sms",
    subject: "Payment Reminder",
    message: "FMBN: Your monthly payment of NGN 85,000 is due on 10/06/2023. Please ensure timely payment to maintain your good standing.",
    sentBy: "system",
    sentDate: "2023-06-05",
    status: "delivered",
    templateId: "payment-reminder"
  },
  {
    id: "comm-003",
    customerId: "cust-002",
    type: "email",
    subject: "Urgent: Missed Payment Notice",
    message: "Dear Fatima Mustapha, our records indicate that you've missed your payment due on 05/06/2023. Please arrange for payment as soon as possible to avoid penalties...",
    sentBy: "staff-003",
    sentDate: "2023-06-10",
    status: "sent",
    templateId: "missed-payment"
  },
  {
    id: "comm-004",
    customerId: "cust-003",
    type: "email",
    subject: "Ownership Transfer Eligibility",
    message: "Dear Chukwudi Okonkwo, congratulations! Based on your excellent payment history and tenure, you may be eligible for our early ownership transfer program...",
    sentBy: "staff-002",
    sentDate: "2023-07-15",
    status: "read",
    templateId: "ownership-eligibility"
  },
  {
    id: "comm-005",
    customerId: "cust-006",
    type: "letter",
    subject: "Final Notice: Defaulting Payment",
    message: "Dear Mohammed Abubakar, this is to inform you that your account is now in default status due to persistent non-payment...",
    sentBy: "staff-008",
    sentDate: "2023-04-20",
    status: "sent",
    templateId: "default-notice"
  }
];

export const mockCustomerComplaints: CustomerComplaint[] = [
  {
    id: "comp-001",
    customerId: "cust-002",
    category: "payment",
    subject: "Issue with payment posting",
    description: "I made my payment on 2023-05-03 via bank transfer but it's not reflected in my account yet. Transaction reference: GTB-23450921.",
    priority: "medium",
    status: "in_progress",
    createdAt: "2023-05-08",
    assignedTo: "staff-003",
    documents: [
      {
        id: "doc-comp-001",
        title: "Bank Transfer Receipt",
        description: "Screenshot of bank transfer confirmation",
        type: "image",
        category: "financial",
        owner: "cust-002",
        uploadDate: "2023-05-08",
        expiryDate: null,
        status: "verified",
        tags: ["payment", "evidence"],
        fileSize: 250000,
        filePath: "/documents/complaints/bank_transfer_receipt.jpg"
      }
    ]
  },
  {
    id: "comp-002",
    customerId: "cust-006",
    category: "property",
    subject: "Water leakage in bathroom",
    description: "There's a serious water leakage in my bathroom ceiling that's causing damage to the walls and floor. Need urgent repairs.",
    priority: "high",
    status: "open",
    createdAt: "2023-05-15",
    documents: [
      {
        id: "doc-comp-002",
        title: "Leakage Photos",
        description: "Photos showing water damage",
        type: "image",
        category: "property",
        owner: "cust-006",
        uploadDate: "2023-05-15",
        expiryDate: null,
        status: "pending",
        tags: ["maintenance", "property issue"],
        fileSize: 1500000,
        filePath: "/documents/complaints/water_leakage_photos.jpg"
      }
    ]
  },
  {
    id: "comp-003",
    customerId: "cust-003",
    category: "service",
    subject: "Delay in ownership transfer process",
    description: "I submitted my request for early ownership transfer evaluation a month ago but haven't received any update.",
    priority: "medium",
    status: "resolved",
    createdAt: "2023-07-20",
    assignedTo: "staff-002",
    resolvedAt: "2023-07-25",
    resolvedBy: "staff-002",
    documents: []
  }
];
