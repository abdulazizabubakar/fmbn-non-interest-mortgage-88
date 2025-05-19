
import { Notification } from '@/types/notifications';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Document Verification Required',
    message: 'Your uploaded ID card needs to be verified. Please check Document Center for details.',
    type: 'alert',
    timestamp: '2024-05-19T08:30:00Z',
    read: false,
    category: 'document',
    link: '/documents'
  },
  {
    id: '2',
    title: 'Mortgage Application Approved',
    message: 'Congratulations! Your mortgage application has been approved. Next steps will be sent shortly.',
    type: 'success',
    timestamp: '2024-05-18T14:45:00Z',
    read: false,
    category: 'application',
    link: '/applications'
  },
  {
    id: '3',
    title: 'Repayment Due in 5 Days',
    message: 'Your next mortgage payment of ₦45,000 is due on May 24, 2024. Please ensure sufficient funds.',
    type: 'reminder',
    timestamp: '2024-05-18T09:15:00Z',
    read: true,
    category: 'finance',
    link: '/finance/repayments'
  },
  {
    id: '4',
    title: 'System Maintenance',
    message: 'NIMMS will be undergoing scheduled maintenance on May 22 from 2:00 AM to 5:00 AM WAT.',
    type: 'info',
    timestamp: '2024-05-17T16:20:00Z',
    read: true,
    category: 'system',
    link: null
  },
  {
    id: '5',
    title: 'Property Valuation Complete',
    message: 'Your property valuation report has been uploaded to your account and is ready for review.',
    type: 'info',
    timestamp: '2024-05-17T11:30:00Z',
    read: false,
    category: 'property',
    link: '/properties'
  },
  {
    id: '6',
    title: 'Document Expiring Soon',
    message: 'Your Certificate of Occupancy will expire in 30 days. Please renew it to avoid compliance issues.',
    type: 'alert',
    timestamp: '2024-05-16T13:45:00Z',
    read: true,
    category: 'document',
    link: '/documents'
  },
  {
    id: '7',
    title: 'Disbursement Complete',
    message: 'Your mortgage disbursement of ₦25,000,000 has been completed. Funds will be available within 24 hours.',
    type: 'success',
    timestamp: '2024-05-15T10:20:00Z',
    read: true,
    category: 'finance',
    link: '/finance/disbursements'
  },
  {
    id: '8',
    title: 'Shariah Compliance Review',
    message: 'Your application is undergoing Shariah compliance review. Estimated completion: 2 business days.',
    type: 'info',
    timestamp: '2024-05-14T15:10:00Z',
    read: true,
    category: 'application',
    link: '/applications'
  }
];
