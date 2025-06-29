
export interface KPIMetric {
  id: string;
  name: string;
  category: 'applications' | 'repayments' | 'ownership' | 'compliance' | 'risk';
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  lastUpdated: string;
}

export interface GeographicPerformance {
  region: string;
  state: string;
  lga?: string;
  metrics: {
    totalApplications: number;
    approvedApplications: number;
    disbursedAmount: number;
    collectionRate: number;
    defaultRate: number;
    averageProcessingTime: number;
  };
  performance: {
    score: number;
    rank: number;
    trend: 'improving' | 'declining' | 'stable';
  };
}

export interface ShariahComplianceMetric {
  id: string;
  category: string;
  metric: string;
  complianceScore: number;
  status: 'compliant' | 'non-compliant' | 'under-review';
  lastAuditDate: string;
  nextAuditDate: string;
  findings: string[];
  recommendations: string[];
}

export interface RegulatoryReport {
  id: string;
  type: 'CBN' | 'NDIC' | 'FRCN' | 'Internal';
  title: string;
  period: string;
  generatedDate: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  fileUrl?: string;
  submissionDeadline: string;
  sections: ReportSection[];
}

export interface ReportSection {
  id: string;
  title: string;
  data: any;
  charts: any[];
  tables: any[];
  completionStatus: boolean;
}
