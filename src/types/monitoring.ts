
// Monitoring Types
export interface KPIMetric {
  id: string;
  title: string;
  value: number | string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  category: 'applications' | 'repayments' | 'ownership' | 'general';
  icon?: string;
}

export interface GeographicalData {
  state: string;
  lga?: string;
  applications: number;
  approvals: number;
  disbursements: number;
  delinquency: number;
  performance?: 'High' | 'Medium' | 'Low';
}

export interface ComplianceMetric {
  title: string;
  value: number;
  status: 'excellent' | 'good' | 'review' | 'poor';
  trend: string;
  icon?: string;
}

export interface RegulatoryReport {
  id: string;
  title: string;
  regulator: 'CBN' | 'NDIC' | 'Internal';
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Yearly';
  dueDate: string;
  status: 'completed' | 'pending' | 'overdue' | 'draft' | 'in-progress';
  lastGenerated?: string;
  nextDue: string;
}

export interface PredictionModel {
  name: string;
  id: string;
  accuracy: number;
  status: 'active' | 'training' | 'inactive';
  lastTrained: string;
  predictions: number;
}

export interface BenchmarkMetric {
  metric: string;
  current: number;
  industry: number;
  historical: number;
  target: number;
  unit: string;
  trend: 'improving' | 'declining' | 'stable';
}
