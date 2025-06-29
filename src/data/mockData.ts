import { Mortgage, StatCard } from '@/types';
import { Property } from '@/types/property';
import { Customer } from '@/types/customer';
import { Notification } from '@/types/notification';
import { User, UserRole } from '@/types/user';
import { BarChart3, CreditCard, Home, Users, PieChart, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@fmbn.gov.ng',
    roles: ['admin' as UserRole],
    scope: 'global',
    status: 'active',
    avatarUrl: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@fmbn.gov.ng',
    roles: ['manager' as UserRole],
    scope: 'global',
    status: 'active',
    avatarUrl: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Credit Officer',
    email: 'officer@fmbn.gov.ng',
    roles: ['officer' as UserRole],
    scope: 'global',
    status: 'active',
    avatarUrl: '/placeholder.svg',
  },
  {
    id: '4',
    name: 'Ibrahim Ahmed',
    email: 'ibrahim@example.com',
    roles: ['customer' as UserRole],
    scope: 'self',
    status: 'active',
    avatarUrl: '/placeholder.svg',
  },
];

// Mock mortgages
export const mockMortgages: Mortgage[] = [
  {
    id: 'MRB-001',
    customerId: '4',
    customerName: 'Ibrahim Ahmed',
    propertyId: 'P001',
    propertyAddress: '25 Ahmadu Bello Way, Abuja',
    financingType: 'murabaha',
    amount: 25000000,
    tenor: 180,
    status: 'active',
    approvalDate: '2024-03-15',
    disbursementDate: '2024-04-01',
    maturityDate: '2039-04-01',
    createdAt: '2024-02-10',
    updatedAt: '2024-04-01',
  },
  {
    id: 'IJR-002',
    customerId: '5',
    customerName: 'Fatima Usman',
    propertyId: 'P002',
    propertyAddress: '7 Ibrahim Babangida Boulevard, Kano',
    financingType: 'ijara',
    amount: 18500000,
    tenor: 120,
    status: 'approved',
    approvalDate: '2024-05-10',
    disbursementDate: undefined,
    maturityDate: undefined,
    createdAt: '2024-04-15',
    updatedAt: '2024-05-10',
  },
  {
    id: 'MSH-003',
    customerId: '6',
    customerName: 'Mohammed Bello',
    propertyId: 'P003',
    propertyAddress: '12 Awolowo Road, Lagos',
    financingType: 'musharaka',
    amount: 32000000,
    tenor: 240,
    status: 'under-assessment',
    approvalDate: undefined,
    disbursementDate: undefined,
    maturityDate: undefined,
    createdAt: '2024-05-02',
    updatedAt: '2024-05-05',
  },
  {
    id: 'MRB-004',
    customerId: '7',
    customerName: 'Amina Yusuf',
    propertyId: 'P004',
    propertyAddress: '45 Yakubu Gowon Street, Port Harcourt',
    financingType: 'murabaha',
    amount: 15000000,
    tenor: 120,
    status: 'pending-review',
    approvalDate: undefined,
    disbursementDate: undefined,
    maturityDate: undefined,
    createdAt: '2024-05-12',
    updatedAt: '2024-05-12',
  },
  {
    id: 'IST-005',
    customerId: '8',
    customerName: 'Yusuf Ibrahim',
    propertyId: 'P005',
    propertyAddress: '9 Shehu Shagari Way, Sokoto',
    financingType: 'istisna',
    amount: 28000000,
    tenor: 180,
    status: 'draft',
    approvalDate: undefined,
    disbursementDate: undefined,
    maturityDate: undefined,
    createdAt: '2024-05-15',
    updatedAt: '2024-05-15',
  },
];

// Mock customers
export const mockCustomers: Customer[] = [
  {
    id: '4',
    customerNumber: 'CUST-0004',
    name: 'Ibrahim Ahmed',
    email: 'ibrahim@example.com',
    phone: '+2348012345678',
    nationalId: '12345678901',
    bvn: '12345678901',
    dateOfBirth: '1985-05-15',
    gender: 'male',
    maritalStatus: 'married',
    address: '25 Ahmadu Bello Way, Abuja',
    city: 'Abuja',
    state: 'FCT',
    postalCode: '900001',
    employer: 'Federal Ministry',
    employerAddress: '10 Ministry Road',
    occupation: 'Civil Servant',
    monthlyIncome: 500000,
    employmentStartDate: '2019-01-01',
    employmentStatus: 'permanent',
    customerType: 'government_worker',
    status: 'active',
    tags: ['good_standing'],
    documents: [],
    verification: {
      ninVerified: true,
      bvnVerified: true,
      employmentVerified: true,
      addressVerified: true
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    createdBy: 'system',
    updatedBy: 'system'
  },
  {
    id: '5',
    customerNumber: 'CUST-0005',
    name: 'Fatima Usman',
    email: 'fatima@example.com',
    phone: '+2348023456789',
    nationalId: '23456789012',
    bvn: '23456789012',
    dateOfBirth: '1990-03-22',
    gender: 'female',
    maritalStatus: 'single',
    address: '7 Ibrahim Babangida Boulevard, Kano',
    city: 'Kano',
    state: 'Kano',
    postalCode: '700001',
    employer: 'Self-employed',
    employerAddress: 'Same as residential',
    occupation: 'Business Owner',
    monthlyIncome: 650000,
    employmentStartDate: '2018-05-20',
    employmentStatus: 'self-employed',
    customerType: 'private_sector',
    status: 'active',
    tags: ['good_standing'],
    documents: [],
    verification: {
      ninVerified: true,
      bvnVerified: true,
      employmentVerified: true,
      addressVerified: true
    },
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20',
    createdBy: 'system',
    updatedBy: 'system'
  },
  {
    id: '6',
    customerNumber: 'CUST-0006',
    name: 'Mohammed Bello',
    email: 'mohammed@example.com',
    phone: '+2348034567890',
    nationalId: '34567890123',
    bvn: '34567890123',
    dateOfBirth: '1978-11-30',
    gender: 'male',
    maritalStatus: 'married',
    address: '12 Awolowo Road, Lagos',
    city: 'Lagos',
    state: 'Lagos',
    postalCode: '101001',
    employer: 'Lagos State University',
    employerAddress: 'LASU Main Campus',
    occupation: 'Professor',
    monthlyIncome: 750000,
    employmentStartDate: '2010-09-01',
    employmentStatus: 'permanent',
    customerType: 'government_worker',
    status: 'active',
    tags: ['good_standing'],
    documents: [],
    verification: {
      ninVerified: true,
      bvnVerified: true,
      employmentVerified: true,
      addressVerified: true
    },
    createdAt: '2024-03-10',
    updatedAt: '2024-03-10',
    createdBy: 'system',
    updatedBy: 'system'
  },
  {
    id: '7',
    customerNumber: 'CUST-0007',
    name: 'Amina Yusuf',
    email: 'amina@example.com',
    phone: '+2348045678901',
    nationalId: '45678901234',
    bvn: '45678901234',
    dateOfBirth: '1992-07-18',
    gender: 'female',
    maritalStatus: 'married',
    address: '45 Yakubu Gowon Street, Port Harcourt',
    city: 'Port Harcourt',
    state: 'Rivers',
    postalCode: '500001',
    employer: 'Shell Nigeria',
    employerAddress: 'Shell Industrial Area',
    occupation: 'Petroleum Engineer',
    monthlyIncome: 450000,
    employmentStartDate: '2020-03-15',
    employmentStatus: 'contract',
    customerType: 'private_sector',
    status: 'active',
    tags: ['good_standing'],
    documents: [],
    verification: {
      ninVerified: true,
      bvnVerified: true,
      employmentVerified: true,
      addressVerified: true
    },
    createdAt: '2024-04-05',
    updatedAt: '2024-04-05',
    createdBy: 'system',
    updatedBy: 'system'
  },
  {
    id: '8',
    customerNumber: 'CUST-0008',
    name: 'Yusuf Ibrahim',
    email: 'yusuf@example.com',
    phone: '+2348056789012',
    nationalId: '56789012345',
    bvn: '56789012345',
    dateOfBirth: '1985-02-10',
    gender: 'male',
    maritalStatus: 'single',
    address: '9 Shehu Shagari Way, Sokoto',
    city: 'Sokoto',
    state: 'Sokoto',
    postalCode: '840001',
    employer: 'Private Business',
    employerAddress: 'Central Market, Sokoto',
    occupation: 'Trader',
    monthlyIncome: 600000,
    employmentStartDate: '2015-11-10',
    employmentStatus: 'self-employed',
    customerType: 'private_sector',
    status: 'active',
    tags: ['good_standing'],
    documents: [],
    verification: {
      ninVerified: true,
      bvnVerified: true,
      employmentVerified: true,
      addressVerified: true
    },
    createdAt: '2024-04-25',
    updatedAt: '2024-04-25',
    createdBy: 'system',
    updatedBy: 'system'
  },
];

// Mock properties
export const mockProperties: Property[] = [
  {
    id: 'PROP-001',
    name: 'Sunset Villa Estate',
    type: 'apartment' as const,
    address: '15 Adeola Odeku Street, Victoria Island, Lagos',
    state: 'Lagos',
    lga: 'Lagos Island',
    coordinates: {
      latitude: 6.4281,
      longitude: 3.4219
    },
    value: 45000000,
    buildYear: 2020,
    area: 2500,
    features: ['Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Generator'],
    images: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=500&h=300&fit=crop'
    ]
  },
  {
    id: 'PROP-002',
    name: 'Green Valley Heights',
    type: 'duplex' as const,
    address: '8 Gwarinpa Estate, Abuja',
    state: 'FCT',
    lga: 'Abuja Municipal',
    coordinates: {
      latitude: 9.1092,
      longitude: 7.4165
    },
    value: 65000000,
    buildYear: 2019,
    area: 3200,
    features: ['Garden', 'Balcony', 'Study Room', 'Servant Quarters', 'Solar Panel'],
    images: [
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop'
    ]
  },
  {
    id: 'PROP-003',
    name: 'Harmony Towers',
    type: 'apartment' as const,
    address: '22 Nassarawa GRA, Kano',
    state: 'Kano',
    lga: 'Kano Municipal',
    coordinates: {
      latitude: 12.0022,
      longitude: 8.5919
    },
    value: 32000000,
    buildYear: 2021,
    area: 1800,
    features: ['Elevator', 'CCTV', 'Water Treatment', 'Playground'],
    images: [
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=300&fit=crop'
    ]
  },
  {
    id: 'PROP-004',
    name: 'Royal Gardens',
    type: 'bungalow' as const,
    address: '5 GRA Phase 2, Port Harcourt, Rivers',
    state: 'Rivers',
    lga: 'Port Harcourt',
    coordinates: {
      latitude: 4.8156,
      longitude: 7.0498
    },
    value: 38000000,
    buildYear: 2018,
    area: 2200,
    features: ['Large Compound', 'Boys Quarters', 'Borehole', 'Fence'],
    images: [
      'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=500&h=300&fit=crop'
    ]
  },
  {
    id: 'PROP-005',
    name: 'Paradise Heights',
    type: 'apartment' as const,
    address: '12 Kubwa Express, Abuja',
    state: 'FCT',
    lga: 'Bwari',
    coordinates: {
      latitude: 9.0765,
      longitude: 7.3986
    },
    value: 28000000,
    buildYear: 2022,
    area: 1600,
    features: ['Modern Kitchen', 'Air Conditioning', 'Tiles', 'Water Heater'],
    images: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=500&h=300&fit=crop'
    ]
  },
  {
    id: 'PROP-006',
    name: 'Golden Estate',
    type: 'duplex' as const,
    address: '18 Kaduna North, Kaduna',
    state: 'Kaduna',
    lga: 'Kaduna North',
    coordinates: {
      latitude: 10.5105,
      longitude: 7.4165
    },
    value: 42000000,
    buildYear: 2020,
    area: 2800,
    features: ['Spacious Rooms', 'Car Port', 'Family Lounge', 'Store Room'],
    images: [
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop'
    ]
  }
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Mortgage Application',
    message: 'A new mortgage application (MRB-004) has been submitted by Amina Yusuf.',
    type: 'info',
    read: false,
    createdAt: '2024-05-12T10:30:00',
  },
  {
    id: '2',
    title: 'Mortgage Approved',
    message: 'Mortgage application (IJR-002) for Fatima Usman has been approved.',
    type: 'success',
    read: false,
    createdAt: '2024-05-10T14:45:00',
  },
  {
    id: '3',
    title: 'Document Verification Required',
    message: 'Additional documents are required for mortgage application (MSH-003).',
    type: 'warning',
    read: true,
    createdAt: '2024-05-05T09:15:00',
  },
  {
    id: '4',
    title: 'Payment Overdue',
    message: 'Payment for mortgage (MRB-001) is overdue by 5 days.',
    type: 'error',
    read: true,
    createdAt: '2024-05-01T11:20:00',
  },
];

// Create icon factories instead of using JSX directly
const createHomeIcon = () => ({ icon: Home, className: "h-6 w-6 text-nimms-primary" });
const createUsersIcon = () => ({ icon: Users, className: "h-6 w-6 text-nimms-secondary" });
const createCreditCardIcon = () => ({ icon: CreditCard, className: "h-6 w-6 text-nimms-accent" });
const createPieChartIcon = () => ({ icon: PieChart, className: "h-6 w-6 text-nimms-primary" });

// Mock dashboard stat cards
export const mockStatCards: StatCard[] = [
  {
    title: 'Total Mortgages',
    value: 5,
    change: 20,
    icon: createHomeIcon(),
  },
  {
    title: 'Active Customers',
    value: 5,
    change: 15,
    icon: createUsersIcon(),
  },
  {
    title: 'Total Financing',
    value: '₦118.5M',
    change: 25,
    icon: createCreditCardIcon(),
  },
  {
    title: 'Disbursement Rate',
    value: '40%',
    change: -5,
    icon: createPieChartIcon(),
  },
];

// Mock chart data for dashboard
export const mockFinancingTypeData = [
  { name: 'Murabaha', value: 40 },
  { name: 'Ijara', value: 25 },
  { name: 'Musharaka', value: 20 },
  { name: 'Istisna', value: 15 },
];

export const mockMortgageStatusData = [
  { name: 'Draft', value: 1 },
  { name: 'Pending Review', value: 1 },
  { name: 'Under Assessment', value: 1 },
  { name: 'Approved', value: 1 },
  { name: 'Active', value: 1 },
];

export const mockMonthlyDisbursementData = [
  { name: 'Jan', value: 0 },
  { name: 'Feb', value: 0 },
  { name: 'Mar', value: 15 },
  { name: 'Apr', value: 25 },
  { name: 'May', value: 18.5 },
  { name: 'Jun', value: 0 },
];

// Activity logs
export const mockActivityLogs = [
  { id: '1', user: 'Admin User', action: 'Approved mortgage application', target: 'IJR-002', timestamp: '2024-05-10T14:45:00' },
  { id: '2', user: 'Credit Officer', action: 'Requested additional documents', target: 'MSH-003', timestamp: '2024-05-05T09:15:00' },
  { id: '3', user: 'Ibrahim Ahmed', action: 'Submitted mortgage application', target: 'MRB-001', timestamp: '2024-02-10T11:30:00' },
  { id: '4', user: 'Manager User', action: 'Reviewed property valuation', target: 'P003', timestamp: '2024-05-03T10:20:00' },
  { id: '5', user: 'Admin User', action: 'Disbursed funds', target: 'MRB-001', timestamp: '2024-04-01T09:45:00' },
];
