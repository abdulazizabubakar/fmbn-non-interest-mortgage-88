
// Reporting Types
export interface Report {
  id: string;
  title: string;
  type: 'portfolio' | 'performance' | 'compliance' | 'operational' | 'financial';
  createdBy: string;
  createdAt: string;
  parameters: any;
  fileUrl?: string;
  scheduledReport: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly';
}
