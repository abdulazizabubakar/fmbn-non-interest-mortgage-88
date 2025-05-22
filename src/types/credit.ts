
// Credit Assessment types
export interface CreditAssessment {
  id: string;
  mortgageId: string;
  customerId: string;
  creditScore: number;
  incomeToFinancingRatio: number;
  debtBurdenRatio: number;
  riskCategory: 'low' | 'medium' | 'high';
  assessedBy: string;
  assessmentDate: string;
  decision: 'approved' | 'rejected' | 'pending';
  notes: string;
}

export interface Guarantor {
  id: string;
  mortgageId: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
  address: string;
  employmentStatus: string;
  monthlyIncome: number;
  bvn: string;
  status: 'pending' | 'verified' | 'rejected';
}
