
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { MortgageDocument } from '@/types/mortgage-application';
import DocumentIcon from './DocumentIcon';
import DocumentStatusBadge from './DocumentStatusBadge';
import { toast } from 'sonner';

interface DocumentCardProps {
  document: MortgageDocument;
  docTypeName: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, docTypeName }) => {
  // Mark document as verified handler
  const handleVerifyDocument = (docId: string) => {
    toast.success('Document marked as verified');
  };
  
  // Reject document handler
  const handleRejectDocument = (docId: string) => {
    toast.error('Document marked as rejected');
  };

  return (
    <Card key={document.id} className="overflow-hidden border-muted">
      <div className="flex p-4 gap-4">
        <div className="flex-shrink-0">
          <DocumentIcon type={document.type} />
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{document.title}</h3>
            <DocumentStatusBadge status={document.status} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Uploaded on {format(new Date(document.uploadDate), 'MMM dd, yyyy')}
          </p>
          <div className="mt-2 text-sm">
            <span className="text-muted-foreground">Type:</span>{' '}
            <span className="font-medium">{docTypeName}</span>
          </div>
          {document.notes && (
            <p className="text-sm text-muted-foreground italic mt-1">
              Note: {document.notes}
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
      {document.status === 'pending' && (
        <div className="flex border-t">
          <Button 
            variant="ghost" 
            className="flex-1 rounded-none py-2 h-10 text-green-600 hover:text-green-700 hover:bg-green-50"
            onClick={() => handleVerifyDocument(document.id)}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Verify
          </Button>
          <div className="border-l h-10"></div>
          <Button 
            variant="ghost" 
            className="flex-1 rounded-none py-2 h-10 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => handleRejectDocument(document.id)}
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Reject
          </Button>
        </div>
      )}
    </Card>
  );
};

export default DocumentCard;
