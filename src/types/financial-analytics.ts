
export interface CashflowProjection {
  id: string;
  period: string;
  expectedInflow: number;
  actualInflow: number;
  expectedOutflow: number;
  actualOutflow: number;
  netCashflow: number;
  variance: number;
  variancePercentage: number;
}

export interface RentalProfitEstimation {
  propertyId: string;
  propertyType: string;
  location: string;
  estimatedRent: number;
  marketRent: number;
  occupancyRate: number;
  maintenanceCost: number;
  netRentalYield: number;
  roi: number;
  paybackPeriod: number;
}

export interface DisbursementRepaymentSummary {
  period: string;
  totalDisbursed: number;
  totalRepaid: number;
  outstandingBalance: number;
  collectionRate: number;
  defaultRate: number;
  profitEarned: number;
  expectedProfit: number;
}

export interface RiskBuffer {
  category: string;
  requiredBuffer: number;
  currentBuffer: number;
  bufferRatio: number;
  recommendation: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface FinancialScenario {
  id: string;
  name: string;
  description: string;
  assumptions: Record<string, any>;
  projections: CashflowProjection[];
  impactScore: number;
  probability: number;
}
