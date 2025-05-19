
import { Message } from '@/types/messages';

export const mockMessages: Message[] = [
  {
    id: '1',
    sender: {
      id: 'system',
      name: 'System Notification',
      email: 'notifications@nimms.gov.ng'
    },
    recipients: ['user1@example.com'],
    subject: 'Important System Update: New Document Verification Process',
    content: 'Dear User, We are implementing a new document verification process starting next week. This change will improve security and reduce processing times for all mortgage applications. Please review the attached guidelines.',
    timestamp: '2024-05-19T09:30:00Z',
    read: false,
    starred: false,
    hasAttachment: true,
    category: 'system'
  },
  {
    id: '2',
    sender: {
      id: 'user2',
      name: 'Ahmed Ibrahim',
      email: 'a.ibrahim@fmbn.gov.ng'
    },
    recipients: ['user1@example.com'],
    subject: 'Mortgage Application #MO-2345 Requires Additional Documentation',
    content: 'I\'ve reviewed the application for Mr. Abdul Rahman and noticed that we\'re missing his employment verification letter. Could you please follow up with him to obtain this document? We need it to proceed with processing his mortgage application.',
    timestamp: '2024-05-18T14:15:00Z',
    read: true,
    starred: true,
    hasAttachment: false,
    category: 'application'
  },
  {
    id: '3',
    sender: {
      id: 'user3',
      name: 'Fatima Mohammed',
      email: 'f.mohammed@fmbn.gov.ng'
    },
    recipients: ['user1@example.com'],
    subject: 'Disbursement Schedule for Next Week',
    content: 'Please find attached the disbursement schedule for next week. We have 24 disbursements pending approval. Let me know if you need any changes before I submit it to Finance.',
    timestamp: '2024-05-18T11:25:00Z',
    read: false,
    starred: false,
    hasAttachment: true,
    category: 'finance'
  },
  {
    id: '4',
    sender: {
      id: 'system',
      name: 'Legal Department',
      email: 'legal@nimms.gov.ng'
    },
    recipients: ['user1@example.com'],
    subject: 'Updated Legal Templates for Non-Interest Mortgages',
    content: 'As part of our ongoing compliance with Shariah principles, we have updated our legal templates for non-interest mortgage products. Please start using these updated templates for all new applications effective immediately.',
    timestamp: '2024-05-17T15:40:00Z',
    read: true,
    starred: false,
    hasAttachment: true,
    category: 'legal'
  },
  {
    id: '5',
    sender: {
      id: 'user5',
      name: 'Usman Bello',
      email: 'u.bello@fmbn.gov.ng'
    },
    recipients: ['user1@example.com'],
    subject: 'Monthly Performance Report - April 2024',
    content: 'Attached is the monthly performance report for April 2024. Our conversion rates have improved by 15% compared to last month. Great work by the team!',
    timestamp: '2024-05-16T09:50:00Z',
    read: true,
    starred: true,
    hasAttachment: true,
    category: 'report'
  },
  {
    id: '6',
    sender: {
      id: 'system',
      name: 'IT Support',
      email: 'support@nimms.gov.ng'
    },
    recipients: ['user1@example.com'],
    subject: 'Your Password Will Expire in 3 Days',
    content: 'This is an automated reminder that your system password will expire in 3 days. Please update your password to avoid any disruption to your account access.',
    timestamp: '2024-05-15T16:30:00Z',
    read: false,
    starred: false,
    hasAttachment: false,
    category: 'system'
  },
  {
    id: '7',
    sender: {
      id: 'user7',
      name: 'Zainab Yusuf',
      email: 'z.yusuf@fmbn.gov.ng'
    },
    recipients: ['user1@example.com'],
    subject: 'Training Session: New Shariah Compliance Module',
    content: 'We will be conducting a training session on the new Shariah Compliance Module next Tuesday at 10:00 AM in the main conference room. Please confirm your attendance by responding to this message.',
    timestamp: '2024-05-14T13:20:00Z',
    read: true,
    starred: false,
    hasAttachment: false,
    category: 'training'
  },
  {
    id: '8',
    sender: {
      id: 'user8',
      name: 'Ibrahim Hassan',
      email: 'i.hassan@fmbn.gov.ng'
    },
    recipients: ['user1@example.com'],
    subject: 'Urgent: Customer Complaint - Application #MO-1892',
    content: 'We received an urgent complaint from Mr. Mohammed Aliyu regarding delays in his mortgage application (#MO-1892). He claims it has been over 30 days without any update. Can you please investigate and provide a status update as soon as possible?',
    timestamp: '2024-05-13T10:15:00Z',
    read: true,
    starred: true,
    hasAttachment: false,
    category: 'customer'
  }
];
