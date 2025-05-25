
export interface ProcessNode {
  id: string;
  type: 'start' | 'process' | 'decision' | 'end' | 'task' | 'gateway';
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed' | 'failed' | 'skipped';
  assignedTo?: string;
  estimatedDuration?: number; // in hours
  actualDuration?: number;
  startDate?: Date;
  endDate?: Date;
  metrics?: {
    completionRate: number;
    averageTime: number;
    delayCount: number;
  };
}

export interface ProcessEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  condition?: string;
  type?: 'default' | 'conditional' | 'parallel';
}

export interface ProcessFlow {
  id: string;
  name: string;
  description: string;
  category: 'mortgage' | 'finance' | 'property' | 'document' | 'customer';
  nodes: ProcessNode[];
  edges: ProcessEdge[];
  status: 'active' | 'draft' | 'archived';
  version: string;
  createdAt: Date;
  updatedAt: Date;
  owner?: string;
}

export interface ProcessMetrics {
  totalProcesses: number;
  activeProcesses: number;
  completedToday: number;
  delayedProcesses: number;
  averageCompletionTime: number;
  performanceScore: number;
}

export interface ProcessInstance {
  id: string;
  processFlowId: string;
  status: 'running' | 'completed' | 'failed' | 'paused';
  currentNodeId: string;
  startedAt: Date;
  completedAt?: Date;
  entityId?: string; // e.g., mortgage application ID
  entityType?: string;
  progress: number; // 0-100
}
