
// Delinquency Management types
export interface DelinquencyCase {
  id: string;
  mortgageId: string;
  customerId: string;
  openDate: string;
  status: 'new' | 'under_resolution' | 'restructured' | 'resolved' | 'defaulted';
  missedPayments: number;
  totalOverdueAmount: number;
  assignedTo?: string;
  resolutionPlan?: string;
  closeDate?: string;
}
