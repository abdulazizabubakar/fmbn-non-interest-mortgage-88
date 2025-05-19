import { Mortgage, Customer, Property, Notification, User, StatCard } from '@/types';
import { BarChart3, CreditCard, Home, Users, PieChart, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@fmbn.gov.ng',
    role: 'admin',
    avatarUrl: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@fmbn.gov.ng',
    role: 'manager',
    avatarUrl: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Credit Officer',
    email: 'officer@fmbn.gov.ng',
    role: 'officer',
    avatarUrl: '/placeholder.svg',
  },
  {
    id: '4',
    name: 'Ibrahim Ahmed',
    email: 'ibrahim@example.com',
    role: 'customer',
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
    name: 'Ibrahim Ahmed',
    email: 'ibrahim@example.com',
    phone: '+2348012345678',
    nationalId: '12345678901',
    bvn: '12345678901',
    address: '25 Ahmadu Bello Way, Abuja',
    employmentStatus: 'Employed',
    monthlyIncome: 500000,
    createdAt: '2024-01-15',
  },
  {
    id: '5',
    name: 'Fatima Usman',
    email: 'fatima@example.com',
    phone: '+2348023456789',
    nationalId: '23456789012',
    bvn: '23456789012',
    address: '7 Ibrahim Babangida Boulevard, Kano',
    employmentStatus: 'Self-employed',
    monthlyIncome: 650000,
    createdAt: '2024-02-20',
  },
  {
    id: '6',
    name: 'Mohammed Bello',
    email: 'mohammed@example.com',
    phone: '+2348034567890',
    nationalId: '34567890123',
    bvn: '34567890123',
    address: '12 Awolowo Road, Lagos',
    employmentStatus: 'Employed',
    monthlyIncome: 750000,
    createdAt: '2024-03-10',
  },
  {
    id: '7',
    name: 'Amina Yusuf',
    email: 'amina@example.com',
    phone: '+2348045678901',
    nationalId: '45678901234',
    bvn: '45678901234',
    address: '45 Yakubu Gowon Street, Port Harcourt',
    employmentStatus: 'Employed',
    monthlyIncome: 450000,
    createdAt: '2024-04-05',
  },
  {
    id: '8',
    name: 'Yusuf Ibrahim',
    email: 'yusuf@example.com',
    phone: '+2348056789012',
    nationalId: '56789012345',
    bvn: '56789012345',
    address: '9 Shehu Shagari Way, Sokoto',
    employmentStatus: 'Self-employed',
    monthlyIncome: 600000,
    createdAt: '2024-04-25',
  },
];

// Mock properties
export const mockProperties: Property[] = [
  {
    id: 'P001',
    address: '25 Ahmadu Bello Way, Abuja',
    type: 'Apartment',
    value: 30000000,
    buildYear: 2015,
    area: 120,
    features: ['3 Bedrooms', '2 Bathrooms', 'Parking', 'Security'],
    images: ['/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'P002',
    address: '7 Ibrahim Babangida Boulevard, Kano',
    type: 'Duplex',
    value: 25000000,
    buildYear: 2018,
    area: 150,
    features: ['4 Bedrooms', '3 Bathrooms', 'Garden', 'Security'],
    images: ['/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'P003',
    address: '12 Awolowo Road, Lagos',
    type: 'Terraced House',
    value: 40000000,
    buildYear: 2020,
    area: 180,
    features: ['5 Bedrooms', '4 Bathrooms', 'Garden', 'Swimming Pool', 'Security'],
    images: ['/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'P004',
    address: '45 Yakubu Gowon Street, Port Harcourt',
    type: 'Bungalow',
    value: 18000000,
    buildYear: 2010,
    area: 100,
    features: ['3 Bedrooms', '2 Bathrooms', 'Garden'],
    images: ['/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'P005',
    address: '9 Shehu Shagari Way, Sokoto',
    type: 'Duplex',
    value: 35000000,
    buildYear: 2022,
    area: 200,
    features: ['5 Bedrooms', '4 Bathrooms', 'Garden', 'Security'],
    images: ['/placeholder.svg', '/placeholder.svg'],
  },
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
