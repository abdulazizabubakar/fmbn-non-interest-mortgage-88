
// Disbursement types
export type DisbursementType = 'full' | 'milestone';

export interface Disbursement {
  id: string;
  mortgageId: string;
  amount: number;
  type: DisbursementType;
  recipient: 'vendor' | 'developer' | 'property_owner';
  recipientName: string;
  recipientAccount: string;
  recipientBank: string;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  notes: string;
}

export interface Milestone {
  id: string;
  mortgageId: string;
  description: string;
  amount: number;
  completionPercentage: number;
  status: 'pending' | 'in-progress' | 'verified' | 'completed';
  verificationDate?: string;
  verifiedBy?: string;
  disbursementId?: string;
}
