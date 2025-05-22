
// KYC and Onboarding types
export type CustomerType = 'individual' | 'cooperative' | 'institution';

export interface KycDocument {
  id: string;
  customerId: string;
  type: 'id' | 'payslip' | 'utility_bill' | 'bvn' | 'employment_letter' | 'business_registration';
  status: 'pending' | 'verified' | 'rejected';
  documentUrl: string;
  uploadDate: string;
  verificationDate?: string;
  verifiedBy?: string;
}
