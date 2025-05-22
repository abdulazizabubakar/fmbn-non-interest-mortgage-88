
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocumentType } from '@/types/mortgage-application';

interface MissingDocumentsWarningProps {
  missingDocuments: DocumentType[];
  docTypeNames: Record<DocumentType, string>;
}

const MissingDocumentsWarning: React.FC<MissingDocumentsWarningProps> = ({ 
  missingDocuments, 
  docTypeNames 
}) => {
  if (missingDocuments.length === 0) return null;
  
  return (
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
  );
};

export default MissingDocumentsWarning;
