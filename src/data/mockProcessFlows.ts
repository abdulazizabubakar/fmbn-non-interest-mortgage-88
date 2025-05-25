
import { ProcessFlow, ProcessNode, ProcessEdge, ProcessMetrics, ProcessInstance } from '@/types/process-flow';

export const mockProcessFlows: ProcessFlow[] = [
  {
    id: 'mortgage-application',
    name: 'Mortgage Application Process',
    description: 'Complete mortgage application workflow from submission to disbursement',
    category: 'mortgage',
    status: 'active',
    version: '1.2',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-11-20'),
    owner: 'System Administrator',
    nodes: [
      {
        id: 'start',
        type: 'start',
        title: 'Application Submitted',
        status: 'completed',
        metrics: { completionRate: 100, averageTime: 0.5, delayCount: 0 }
      },
      {
        id: 'initial-review',
        type: 'task',
        title: 'Initial Review',
        description: 'Basic eligibility and completeness check',
        status: 'completed',
        assignedTo: 'Application Officer',
        estimatedDuration: 2,
        actualDuration: 1.5,
        metrics: { completionRate: 95, averageTime: 1.8, delayCount: 3 }
      },
      {
        id: 'document-verification',
        type: 'process',
        title: 'Document Verification',
        description: 'Verify all required documents',
        status: 'in-progress',
        assignedTo: 'Document Officer',
        estimatedDuration: 4,
        metrics: { completionRate: 88, averageTime: 4.2, delayCount: 8 }
      },
      {
        id: 'credit-assessment',
        type: 'process',
        title: 'Credit Assessment',
        description: 'Evaluate creditworthiness and risk',
        status: 'pending',
        assignedTo: 'Credit Officer',
        estimatedDuration: 6,
        metrics: { completionRate: 92, averageTime: 5.8, delayCount: 5 }
      },
      {
        id: 'property-valuation',
        type: 'process',
        title: 'Property Valuation',
        description: 'Professional property assessment',
        status: 'pending',
        assignedTo: 'Property Officer',
        estimatedDuration: 8,
        metrics: { completionRate: 85, averageTime: 9.2, delayCount: 12 }
      },
      {
        id: 'approval-decision',
        type: 'decision',
        title: 'Approval Decision',
        description: 'Final approval or rejection decision',
        status: 'pending',
        assignedTo: 'Zonal Admin',
        estimatedDuration: 2,
        metrics: { completionRate: 90, averageTime: 2.5, delayCount: 4 }
      },
      {
        id: 'disbursement',
        type: 'process',
        title: 'Fund Disbursement',
        description: 'Release approved funds',
        status: 'pending',
        assignedTo: 'Finance Officer',
        estimatedDuration: 3,
        metrics: { completionRate: 98, averageTime: 2.8, delayCount: 1 }
      },
      {
        id: 'end',
        type: 'end',
        title: 'Process Complete',
        status: 'pending',
        metrics: { completionRate: 82, averageTime: 0, delayCount: 0 }
      }
    ],
    edges: [
      { id: 'e1', source: 'start', target: 'initial-review' },
      { id: 'e2', source: 'initial-review', target: 'document-verification' },
      { id: 'e3', source: 'document-verification', target: 'credit-assessment' },
      { id: 'e4', source: 'document-verification', target: 'property-valuation' },
      { id: 'e5', source: 'credit-assessment', target: 'approval-decision' },
      { id: 'e6', source: 'property-valuation', target: 'approval-decision' },
      { id: 'e7', source: 'approval-decision', target: 'disbursement', condition: 'Approved' },
      { id: 'e8', source: 'disbursement', target: 'end' }
    ]
  },
  {
    id: 'finance-operations',
    name: 'Finance Operations Workflow',
    description: 'Daily finance operations and payment processing',
    category: 'finance',
    status: 'active',
    version: '1.0',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-11-18'),
    nodes: [
      {
        id: 'payment-received',
        type: 'start',
        title: 'Payment Received',
        status: 'completed',
        metrics: { completionRate: 100, averageTime: 0, delayCount: 0 }
      },
      {
        id: 'payment-validation',
        type: 'task',
        title: 'Payment Validation',
        description: 'Validate payment details and amount',
        status: 'in-progress',
        assignedTo: 'Finance Officer',
        estimatedDuration: 1,
        metrics: { completionRate: 96, averageTime: 0.8, delayCount: 2 }
      },
      {
        id: 'account-allocation',
        type: 'process',
        title: 'Account Allocation',
        description: 'Allocate payment to correct account',
        status: 'pending',
        assignedTo: 'Treasury Officer',
        estimatedDuration: 0.5,
        metrics: { completionRate: 94, averageTime: 0.6, delayCount: 4 }
      },
      {
        id: 'reconciliation',
        type: 'process',
        title: 'Account Reconciliation',
        description: 'Reconcile with bank statements',
        status: 'pending',
        assignedTo: 'Finance Officer',
        estimatedDuration: 2,
        metrics: { completionRate: 91, averageTime: 2.3, delayCount: 6 }
      },
      {
        id: 'completion',
        type: 'end',
        title: 'Payment Processed',
        status: 'pending',
        metrics: { completionRate: 89, averageTime: 0, delayCount: 0 }
      }
    ],
    edges: [
      { id: 'f1', source: 'payment-received', target: 'payment-validation' },
      { id: 'f2', source: 'payment-validation', target: 'account-allocation' },
      { id: 'f3', source: 'account-allocation', target: 'reconciliation' },
      { id: 'f4', source: 'reconciliation', target: 'completion' }
    ]
  }
];

export const mockProcessMetrics: ProcessMetrics = {
  totalProcesses: 245,
  activeProcesses: 89,
  completedToday: 32,
  delayedProcesses: 12,
  averageCompletionTime: 5.2,
  performanceScore: 87
};

export const mockProcessInstances: ProcessInstance[] = [
  {
    id: 'inst-001',
    processFlowId: 'mortgage-application',
    status: 'running',
    currentNodeId: 'document-verification',
    startedAt: new Date('2024-11-20T09:00:00'),
    entityId: 'APP-2024-001',
    entityType: 'mortgage-application',
    progress: 35
  },
  {
    id: 'inst-002',
    processFlowId: 'mortgage-application',
    status: 'running',
    currentNodeId: 'credit-assessment',
    startedAt: new Date('2024-11-19T14:30:00'),
    entityId: 'APP-2024-002',
    entityType: 'mortgage-application',
    progress: 60
  },
  {
    id: 'inst-003',
    processFlowId: 'finance-operations',
    status: 'running',
    currentNodeId: 'payment-validation',
    startedAt: new Date('2024-11-25T10:15:00'),
    entityId: 'PAY-2024-156',
    entityType: 'payment',
    progress: 25
  }
];
