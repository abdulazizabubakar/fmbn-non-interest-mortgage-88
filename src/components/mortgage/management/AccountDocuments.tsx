
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Upload, 
  Search, 
  FileText, 
  File, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Trash2
} from 'lucide-react';
import { MortgageAccount } from '@/types/mortgage-account';
import { MortgageDocument } from '@/types/mortgage-application';
import { DocumentType } from '@/types/mortgage-application';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface AccountDocumentsProps {
  account: MortgageAccount;
}

// Sample documents for the mortgage account
const sampleDocuments: MortgageDocument[] = [
  {
    id: "doc-mortgage-001",
    type: "contract" as DocumentType,
    title: "Ijarah Contract Agreement",
    fileUrl: "/documents/contract-001.pdf",
    uploadDate: "2024-01-15T10:30:00Z",
    status: "verified",
    verifiedBy: "Ahmed Olatunji",
    verificationDate: "2024-01-17T14:20:00Z"
  },
  {
    id: "doc-mortgage-002",
    type: "employer_letter" as DocumentType,
    title: "Employer Confirmation",
    fileUrl: "/documents/employer-001.pdf",
    uploadDate: "2023-12-10T09:15:00Z",
    status: "verified",
    verifiedBy: "Fatima Aliyu",
    verificationDate: "2023-12-12T11:30:00Z"
  },
  {
    id: "doc-mortgage-003",
    type: "payslip" as DocumentType,
    title: "Recent Payslips (3 months)",
    fileUrl: "/documents/payslips-001.pdf",
    uploadDate: "2023-12-10T09:20:00Z",
    status: "verified",
    verifiedBy: "Fatima Aliyu",
    verificationDate: "2023-12-12T11:35:00Z"
  },
  {
    id: "doc-mortgage-004",
    type: "property_documents" as DocumentType,
    title: "Property Valuation Report",
    fileUrl: "/documents/valuation-001.pdf",
    uploadDate: "2023-12-20T13:45:00Z",
    status: "verified",
    verifiedBy: "Chukwudi Okonkwo",
    verificationDate: "2023-12-22T10:05:00Z"
  },
  {
    id: "doc-mortgage-005",
    type: "takaful_policy" as DocumentType,
    title: "Takaful Insurance Policy",
    fileUrl: "/documents/takaful-001.pdf",
    uploadDate: "2024-01-05T11:20:00Z",
    status: "verified",
    verifiedBy: "Sheikh Hassan Ibrahim",
    verificationDate: "2024-01-08T09:15:00Z"
  },
  {
    id: "doc-mortgage-006",
    type: "utility_bill" as DocumentType,
    title: "Utility Bill - Proof of Address",
    fileUrl: "/documents/utility-001.pdf",
    uploadDate: "2023-12-10T09:25:00Z",
    status: "verified",
    verifiedBy: "Fatima Aliyu",
    verificationDate: "2023-12-12T11:40:00Z"
  }
];

// Document type mapping for display
const docTypeNames: Record<DocumentType, string> = {
  contract: "Contract Agreement",
  employer_letter: "Employer Letter",
  payslip: "Payslips",
  utility_bill: "Utility Bill",
  id_card: "ID Card",
  nhf_contribution: "NHF Contribution",
  property_documents: "Property Documents",
  employer_undertaking: "Employer Undertaking",
  takaful_policy: "Takaful Policy"
};

const AccountDocuments: React.FC<AccountDocumentsProps> = ({ account }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents] = useState<MortgageDocument[]>(sampleDocuments);
  
  // Get document icon based on type
  const getDocumentIcon = (type: DocumentType) => {
    switch(type) {
      case 'contract':
        return <FileText className="h-10 w-10 text-blue-600" />;
      case 'employer_letter':
      case 'payslip':
        return <FileText className="h-10 w-10 text-amber-600" />;
      case 'utility_bill':
      case 'id_card':
        return <FileText className="h-10 w-10 text-purple-600" />;
      case 'property_documents':
        return <FileText className="h-10 w-10 text-green-600" />;
      case 'employer_undertaking':
        return <FileText className="h-10 w-10 text-blue-600" />;
      case 'takaful_policy':
        return <FileText className="h-10 w-10 text-red-600" />;
      case 'nhf_contribution':
        return <FileText className="h-10 w-10 text-cyan-600" />;
      default:
        return <File className="h-10 w-10 text-gray-600" />;
    }
  };
  
  // Get status badge for document
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'verified':
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            <span>Verified</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center text-amber-600">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>Pending</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center text-red-600">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            <span>Rejected</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-600">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{status}</span>
          </div>
        );
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };
  
  // Filter documents based on search term
  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    docTypeNames[doc.type].toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle document view
  const handleViewDocument = (document: MortgageDocument) => {
    toast.info(`Opening ${document.title}`);
  };
  
  // Handle document delete
  const handleDeleteDocument = (document: MortgageDocument, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`${document.title} deleted`);
  };
  
  // Handle document upload
  const handleUploadDocument = () => {
    toast.info('Document upload dialog would appear here');
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Account Documents</CardTitle>
          <Button onClick={handleUploadDocument}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No documents found</h3>
              <p className="mt-1">There are no documents matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map(doc => (
                <div 
                  key={doc.id} 
                  className="border rounded-md p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleViewDocument(doc)}
                >
                  <div className="flex items-start space-x-4">
                    {getDocumentIcon(doc.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{doc.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{docTypeNames[doc.type]}</p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {formatDate(doc.uploadDate)}
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>
                      {doc.verificationDate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Verified on {formatDate(doc.verificationDate)} by {doc.verifiedBy}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={(e) => handleDeleteDocument(doc, e)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountDocuments;
