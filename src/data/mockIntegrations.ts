
import { Database, Users, FileText, Building, CreditCard, Shield, Clock, Mail, Webhook } from 'lucide-react';

export const mockConnectedServices = [
  {
    id: 'service-1',
    name: 'National ID Verification',
    description: 'Integrated with NIMC for identity verification services',
    type: 'Identity Verification',
    lastSync: '2024-05-18 14:32:45',
    status: 'healthy',
    active: true,
    icon: Users,
    apiEndpoint: 'https://api.nimc.gov.ng/verify'
  },
  {
    id: 'service-2',
    name: 'Land Registry System',
    description: 'Connected to national land registry for property validation',
    type: 'Property Verification',
    lastSync: '2024-05-17 09:15:20',
    status: 'healthy',
    active: true,
    icon: Building,
    apiEndpoint: 'https://api.landregistry.gov.ng'
  },
  {
    id: 'service-3',
    name: 'Remita Payment Gateway',
    description: 'Integration for payment processing and disbursements',
    type: 'Payment Processing',
    lastSync: '2024-05-19 08:45:12',
    status: 'healthy',
    active: true,
    icon: CreditCard,
    apiEndpoint: 'https://api.remita.net/payment'
  },
  {
    id: 'service-4',
    name: 'Credit Bureau API',
    description: 'Credit history validation for non-interest financial behavior',
    type: 'Credit Check',
    lastSync: '2024-05-16 16:22:05',
    status: 'degraded',
    active: true,
    icon: Shield,
    apiEndpoint: 'https://api.creditbureau.com/check'
  },
  {
    id: 'service-5',
    name: 'NHF Integration',
    description: 'Integration with National Housing Fund database',
    type: 'Government Database',
    lastSync: '2024-05-15 11:10:33',
    status: 'healthy',
    active: false,
    icon: Database,
    apiEndpoint: 'https://api.nhf.gov.ng'
  },
  {
    id: 'service-6',
    name: 'SMS Notification Service',
    description: 'Bulk SMS provider for customer notifications',
    type: 'Communication',
    lastSync: '2024-05-18 15:40:22',
    status: 'healthy',
    active: true,
    icon: Mail,
    apiEndpoint: 'https://api.sms-provider.com/send'
  }
];

export const mockWebhooks = [
  {
    id: 'wh_1',
    name: 'Document Processing Updates',
    url: 'https://example.com/webhooks/document-updates',
    events: ['document.created', 'document.updated', 'document.deleted'],
    method: 'POST',
    active: true,
    createdAt: '2024-05-10T14:32:45Z'
  },
  {
    id: 'wh_2',
    name: 'Payment Notifications',
    url: 'https://payment-processor.example.com/callbacks/nimms',
    events: ['payment.successful', 'payment.failed'],
    method: 'POST',
    active: true,
    createdAt: '2024-05-12T09:15:20Z'
  },
  {
    id: 'wh_3',
    name: 'Application Status Changes',
    url: 'https://crm-system.example.com/webhooks/application-updates',
    events: ['application.submitted', 'application.approved', 'application.rejected'],
    method: 'POST',
    active: false,
    createdAt: '2024-05-08T11:22:33Z'
  }
];

export const mockApiData = {
  usageData: [
    { date: 'May 13', successful: 1200, failed: 23 },
    { date: 'May 14', successful: 1600, failed: 27 },
    { date: 'May 15', successful: 1900, failed: 30 },
    { date: 'May 16', successful: 1700, failed: 45 },
    { date: 'May 17', successful: 2100, failed: 20 },
    { date: 'May 18', successful: 1800, failed: 35 },
    { date: 'May 19', successful: 1700, failed: 25 }
  ],
  topEndpoints: [
    { name: '/api/v1/documents', calls: 450 },
    { name: '/api/v1/identity/verify', calls: 380 },
    { name: '/api/v1/applications', calls: 320 },
    { name: '/api/v1/payments', calls: 280 },
    { name: '/api/v1/properties', calls: 250 }
  ],
  recentErrors: [
    {
      endpoint: '/api/v1/documents/verify',
      code: '429 Too Many Requests',
      message: 'Rate limit exceeded for document verification API',
      timestamp: '2024-05-19 08:45:12'
    },
    {
      endpoint: '/api/v1/credit/check',
      code: '504 Gateway Timeout',
      message: 'Credit bureau API not responding within timeout period',
      timestamp: '2024-05-18 16:32:40'
    },
    {
      endpoint: '/api/v1/payments/disburse',
      code: '400 Bad Request',
      message: 'Invalid account details provided for disbursement',
      timestamp: '2024-05-18 12:15:22'
    },
    {
      endpoint: '/api/v1/applications/create',
      code: '422 Unprocessable Entity',
      message: 'Required field "guarantorInformation" is missing',
      timestamp: '2024-05-17 14:22:10'
    }
  ]
};
