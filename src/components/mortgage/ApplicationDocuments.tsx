
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Upload,
  Download,
  Search,
  File,
  FilePlus
} from 'lucide-react';
import { format } from 'date-fns';
import { MortgageApplication, MortgageDocument, DocumentType } from '@/types/mortgage-application';
import { toast } from 'sonner';

interface ApplicationDocumentsProps {
  application: MortgageApplication;
}

const ApplicationDocuments: React.FC<ApplicationDocumentsProps> = ({ application }) => {
  const [selectedDocType, setSelectedDocType] = useState<DocumentType | 'all'>('all');
  
  // Document type display names
  const docTypeNames: Record<DocumentType, string> = {
    employer_letter: 'Employer Letter',
    payslip: 'Payslip',
    utility_bill: 'Utility Bill',
    id_card: 'ID Card',
    nhf_contribution: 'NHF Contribution',
    property_documents: 'Property Documents',
    employer_undertaking: 'Employer Undertaking',
    takaful_policy: 'Takaful Policy',
    contract: 'Ijarah Contract'
  };
  
  // Filter documents by type
  const filteredDocs = selectedDocType === 'all' 
    ? application.documents 
    : application.documents.filter(doc => doc.type === selectedDocType);
  
  // Get document icon based on type
  const getDocumentIcon = (type: DocumentType) => {
    switch(type) {
      case 'contract':
        return <File className="h-10 w-10 text-blue-600" />;
      case 'employer_letter':
        return <File className="h-10 w-10 text-amber-600" />;
      case 'payslip':
        return <File className="h-10 w-10 text-green-600" />;
      case 'utility_bill':
        return <File className="h-10 w-10 text-purple-600" />;
      case 'id_card':
        return <File className="h-10 w-10 text-red-600" />;
      default:
        return <File className="h-10 w-10 text-gray-600" />;
    }
  };
  
  // Get badge for document status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'verified':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Verified
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        );
      case 'pending':
      default:
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
    }
  };
  
  // Required documents based on application type
  const requiredDocuments: DocumentType[] = [
    'employer_letter',
    'payslip',
    'utility_bill',
    'id_card'
  ];

  if (application.customerType === 'nhf_contributor') {
    requiredDocuments.push('nhf_contribution');
  }
  
  if (application.status === 'approved' || application.status === 'offer_sent') {
    requiredDocuments.push('employer_undertaking');
    requiredDocuments.push('takaful_policy');
  }
  
  if (application.status === 'contract_generated' || application.status === 'contract_signed' || application.status === 'lease_activated') {
    requiredDocuments.push('contract');
  }
  
  // Check if a required document type is missing
  const isMissingDocument = (type: DocumentType): boolean => {
    return requiredDocuments.includes(type) && 
           !application.documents.some(doc => doc.type === type);
  };
  
  // Get all required document types that are missing
  const missingDocuments = requiredDocuments.filter(type => 
    !application.documents.some(doc => doc.type === type)
  );

  // Mark document as verified handler
  const handleVerifyDocument = (docId: string) => {
    toast.success('Document marked as verified');
  };
  
  // Reject document handler
  const handleRejectDocument = (docId: string) => {
    toast.error('Document marked as rejected');
  };
  
  // Request a document handler
  const handleRequestDocument = (docType: DocumentType) => {
    toast.success(`Request sent for ${docTypeNames[docType]}`);
  };
  
  // Upload document handler
  const handleUpload = () => {
    toast.success('Document uploaded successfully');
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Application Documents</CardTitle>
          <CardDescription>
            Manage and verify required documentation
          </CardDescription>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button onClick={handleUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={selectedDocType} onValueChange={(val) => setSelectedDocType(val as DocumentType | 'all')}>
          <TabsList className="mb-4 flex flex-wrap">
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="employer_letter">Employer Letter</TabsTrigger>
            <TabsTrigger value="payslip">Payslips</TabsTrigger>
            <TabsTrigger value="utility_bill">Utility Bills</TabsTrigger>
            <TabsTrigger value="id_card">ID Cards</TabsTrigger>
            {application.customerType === 'nhf_contributor' && (
              <TabsTrigger value="nhf_contribution">NHF Contribution</TabsTrigger>
            )}
            {application.status === 'approved' || application.status === 'offer_sent' && (
              <>
                <TabsTrigger value="employer_undertaking">Employer Undertaking</TabsTrigger>
                <TabsTrigger value="takaful_policy">Takaful Policy</TabsTrigger>
              </>
            )}
            {(application.status === 'contract_generated' || application.status === 'contract_signed' || application.status === 'lease_activated') && (
              <TabsTrigger value="contract">Contract</TabsTrigger>
            )}
          </TabsList>
          
          <div className="space-y-4">
            {/* Missing documents warning */}
            {missingDocuments.length > 0 && selectedDocType === 'all' && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">Missing documents</h3>
                    <div className="mt-2 text-sm text-amber-700">
                      <ul className="list-disc space-y-1 pl-5">
                        {missingDocuments.map((type) => (
                          <li key={type}>{docTypeNames[type]}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" variant="outline" className="text-amber-700 border-amber-300 hover:bg-amber-100">
                        Request Missing Documents
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Document grid */}
            {filteredDocs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDocs.map((doc) => (
                  <Card key={doc.id} className="overflow-hidden border-muted">
                    <div className="flex p-4 gap-4">
                      <div className="flex-shrink-0">
                        {getDocumentIcon(doc.type)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{doc.title}</h3>
                          {getStatusBadge(doc.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Uploaded on {format(new Date(doc.uploadDate), 'MMM dd, yyyy')}
                        </p>
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Type:</span>{' '}
                          <span className="font-medium">{docTypeNames[doc.type]}</span>
                        </div>
                        {doc.notes && (
                          <p className="text-sm text-muted-foreground italic mt-1">
                            Note: {doc.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex border-t">
                      <Button variant="ghost" className="flex-1 rounded-none py-2 h-10">
                        <Search className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <div className="border-l h-10"></div>
                      <Button variant="ghost" className="flex-1 rounded-none py-2 h-10">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    {doc.status === 'pending' && (
                      <div className="flex border-t">
                        <Button 
                          variant="ghost" 
                          className="flex-1 rounded-none py-2 h-10 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleVerifyDocument(doc.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Verify
                        </Button>
                        <div className="border-l h-10"></div>
                        <Button 
                          variant="ghost" 
                          className="flex-1 rounded-none py-2 h-10 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRejectDocument(doc.id)}
                        >
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              selectedDocType !== 'all' && (
                <div className="text-center py-12 border rounded-md bg-muted/10">
                  <div className="bg-muted inline-flex rounded-full p-3">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No {docTypeNames[selectedDocType as DocumentType]} Found</h3>
                  <p className="text-muted-foreground mt-1 max-w-md mx-auto">
                    {isMissingDocument(selectedDocType as DocumentType) 
                      ? `${docTypeNames[selectedDocType as DocumentType]} is required but hasn't been uploaded yet.`
                      : `No ${docTypeNames[selectedDocType as DocumentType]} documents have been uploaded for this application.`
                    }
                  </p>
                  <div className="mt-4">
                    <Button onClick={handleUpload} size="sm">Upload Document</Button>
                    {isMissingDocument(selectedDocType as DocumentType) && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-2"
                        onClick={() => handleRequestDocument(selectedDocType as DocumentType)}
                      >
                        Request from Customer
                      </Button>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApplicationDocuments;
