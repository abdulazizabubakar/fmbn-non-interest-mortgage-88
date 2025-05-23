
import { ReactNode } from 'react';
import { UserRole } from './user';

// Dashboard metric types
export interface DashboardMetric {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'flat';
  icon?: any; // Icon component
  color?: string;
  description?: string;
}

// Chart data types
export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface PieChartSegment {
  name: string;
  value: number;
  color: string;
}

// Dashboard widget types
export interface WidgetProps {
  title: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
}

// Dashboard filter types
export interface DashboardFilter {
  key: string;
  value: string | number | boolean | Date | Array<any>;
}

export interface DashboardFilterSet {
  timeframe?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  region?: string;
  state?: string;
  status?: string;
  dateRange?: { start: Date; end: Date };
  propertyTypes?: string[];
  financeTypes?: string[];
  [key: string]: any;
}

// Dashboard context types
export interface DashboardContextType {
  role: UserRole | null;
  region: string;
  filters: DashboardFilterSet;
  setFilters: (filters: DashboardFilterSet) => void;
}

// Alert and notification types
export interface DashboardAlert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  description: string;
  timestamp: Date;
  actionText?: string;
  actionUrl?: string;
  read?: boolean;
  roles?: UserRole[];
}

// Dashboard action type
export interface DashboardAction {
  title: string;
  description: string;
  icon: any; // Icon component
  action: () => void;
  roles?: UserRole[];
  permissions?: string[];
}

// Export types
export type ExportFormat = 'excel' | 'csv' | 'pdf';

export interface ExportOptions {
  format: ExportFormat;
  includeCharts: boolean;
  filters?: DashboardFilterSet;
  sections?: string[];
}

// Dashboard tab types
export type DashboardTabType = 
  | 'overview'
  | 'applications'
  | 'mortgages' 
  | 'properties'
  | 'payments'
  | 'reports';
