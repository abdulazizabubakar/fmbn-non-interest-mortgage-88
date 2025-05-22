
// Repayment types
export interface RepaymentSchedule {
  id: string;
  mortgageId: string;
  totalAmount: number;
  installmentAmount: number;
  frequency: 'monthly' | 'quarterly' | 'bi-annually';
  nextPaymentDate: string;
  finalPaymentDate: string;
  remainingInstallments: number;
}

export interface Payment {
  id: string;
  mortgageId: string;
  scheduleId: string;
  amount: number;
  date: string;
  method: 'bank_transfer' | 'direct_debit' | 'wallet' | 'cash';
  reference: string;
  status: 'pending' | 'completed' | 'failed';
}
