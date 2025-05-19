
export type DocumentType = 'pdf' | 'document' | 'spreadsheet' | 'image';
export type DocumentCategory = 'all' | 'legal' | 'financial' | 'kyc' | 'property' | 'shariah' | 'application';
export type DocumentStatus = 'pending' | 'verified' | 'rejected' | 'expired' | 'archived';

export interface Document {
  id: string;
  title: string;
  description: string;
  type: DocumentType;
  category: DocumentCategory;
  owner: string;
  uploadDate: string;
  expiryDate: string | null;
  status: DocumentStatus;
  tags: string[];
  fileSize: number;
  filePath: string;
}
