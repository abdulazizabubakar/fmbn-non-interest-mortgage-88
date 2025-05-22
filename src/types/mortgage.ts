
// Mortgage types
export type MortgageStatus = 
  | 'draft'
  | 'pending-review'
  | 'under-assessment'
  | 'approved'
  | 'active'
  | 'completed'
  | 'rejected'
  | 'cancelled';

export type FinancingType = 'murabaha' | 'ijara' | 'musharaka' | 'istisna';

export interface Mortgage {
  id: string;
  customerId: string;
  customerName: string;
  propertyId: string;
  propertyAddress: string;
  financingType: FinancingType;
  amount: number;
  tenor: number; // in months
  status: MortgageStatus;
  approvalDate?: string;
  disbursementDate?: string;
  maturityDate?: string;
  createdAt: string;
  updatedAt: string;
}
