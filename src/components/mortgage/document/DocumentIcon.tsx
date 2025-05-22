
import React from 'react';
import { File } from 'lucide-react';
import { DocumentType } from '@/types/mortgage-application';

interface DocumentIconProps {
  type: DocumentType;
}

const DocumentIcon: React.FC<DocumentIconProps> = ({ type }) => {
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

export default DocumentIcon;
