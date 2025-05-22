// Re-export all types from their specific files
export type { UserRole, User } from './user';
export type { MortgageStatus, FinancingType, Mortgage } from './mortgage';
export type { IconData, StatCard, ChartData } from './analytics';
export type { Property } from './property';
export type { Notification } from './notification';
export type { CustomerType, KycDocument } from './kyc';
export type { CreditAssessment, Guarantor } from './credit';
export type { DisbursementType, Disbursement, Milestone } from './disbursement';
export type { RepaymentSchedule, Payment } from './repayment';
export type { ShariahReview } from './shariah';
export type { DelinquencyCase } from './delinquency';
export type { ExternalVerification } from './integration';
export type { Report } from './reporting';
export type { AuditLog } from './audit';

// Re-export the Customer type
export * from './customer';

// Re-export from the existing document types
export * from './documents';

// Other exports
export * from './messages';
export * from './notifications';
