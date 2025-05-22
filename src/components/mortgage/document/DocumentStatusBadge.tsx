
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface DocumentStatusBadgeProps {
  status: string;
}

const DocumentStatusBadge: React.FC<DocumentStatusBadgeProps> = ({ status }) => {
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

export default DocumentStatusBadge;
