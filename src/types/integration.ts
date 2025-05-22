
// Integration Types
export interface ExternalVerification {
  id: string;
  customerId: string;
  type: 'bvn' | 'nin' | 'credit_bureau';
  provider: string;
  requestDate: string;
  responseDate?: string;
  status: 'pending' | 'verified' | 'failed';
  referenceId: string;
  responseData: any;
}
