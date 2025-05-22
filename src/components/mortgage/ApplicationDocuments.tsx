
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload } from 'lucide-react';
import { MortgageApplication, MortgageDocument, DocumentType } from '@/types/mortgage-application';
import { toast } from 'sonner';
import DocumentCard from './document/DocumentCard';
import MissingDocumentsWarning from './document/MissingDocumentsWarning';
import EmptyDocumentState from './document/EmptyDocumentState';

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
            {selectedDocType === 'all' && (
              <MissingDocumentsWarning 
                missingDocuments={missingDocuments} 
                docTypeNames={docTypeNames} 
              />
            )}
            
            {/* Document grid */}
            {filteredDocs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDocs.map((doc) => (
                  <DocumentCard 
                    key={doc.id} 
                    document={doc} 
                    docTypeName={docTypeNames[doc.type]} 
                  />
                ))}
              </div>
            ) : (
              selectedDocType !== 'all' && (
                <EmptyDocumentState 
                  docType={selectedDocType as DocumentType}
                  docTypeName={docTypeNames[selectedDocType as DocumentType]}
                  isMissing={isMissingDocument(selectedDocType as DocumentType)}
                  onUpload={handleUpload}
                />
              )
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApplicationDocuments;
