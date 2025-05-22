
// Shariah Compliance types
export interface ShariahReview {
  id: string;
  mortgageId: string;
  reviewDate: string;
  reviewedBy: string;
  status: 'compliant' | 'non-compliant' | 'pending_changes';
  notes: string;
  contractDocumentUrl?: string;
}
