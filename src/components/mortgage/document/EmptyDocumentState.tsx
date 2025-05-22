
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocumentType } from '@/types/mortgage-application';
import { toast } from 'sonner';

interface EmptyDocumentStateProps {
  docType: DocumentType;
  docTypeName: string;
  isMissing: boolean;
  onUpload: () => void;
}

const EmptyDocumentState: React.FC<EmptyDocumentStateProps> = ({ 
  docType, 
  docTypeName, 
  isMissing, 
  onUpload 
}) => {
  // Request a document handler
  const handleRequestDocument = (docType: DocumentType) => {
    toast.success(`Request sent for ${docTypeName}`);
  };

  return (
    <div className="text-center py-12 border rounded-md bg-muted/10">
      <div className="bg-muted inline-flex rounded-full p-3">
        <FileText className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-medium">No {docTypeName} Found</h3>
      <p className="text-muted-foreground mt-1 max-w-md mx-auto">
        {isMissing 
          ? `${docTypeName} is required but hasn't been uploaded yet.`
          : `No ${docTypeName} documents have been uploaded for this application.`
        }
      </p>
      <div className="mt-4">
        <Button onClick={onUpload} size="sm">Upload Document</Button>
        {isMissing && (
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-2"
            onClick={() => handleRequestDocument(docType)}
          >
            Request from Customer
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyDocumentState;
