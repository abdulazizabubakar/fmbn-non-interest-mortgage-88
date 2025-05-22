
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock, FileClock } from 'lucide-react';
import { MortgageApplicationStatus } from '@/types/mortgage-application';

interface StatusBadgeProps {
  status: MortgageApplicationStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusInfo = getStatusBadge(status);
  
  return (
    <Badge variant={statusInfo.variant} className="flex items-center">
      {statusInfo.icon}
      {statusInfo.label}
    </Badge>
  );
};

// Get status badge styling and icon
export const getStatusBadge = (status: MortgageApplicationStatus) => {
  switch(status) {
    case 'draft':
      return {
        variant: 'secondary' as const,
        icon: <FileClock className="h-3.5 w-3.5 mr-1" />,
        label: 'Draft'
      };
    case 'submitted':
      return {
        variant: 'outline' as const,
        icon: <Clock className="h-3.5 w-3.5 mr-1" />,
        label: 'Submitted'
      };
    case 'in_review':
    case 'credit_assessment':
    case 'legal_review':
    case 'shariah_review':
    case 'management_approval':
    case 'board_approval':
      return {
        variant: 'outline' as const,
        icon: <Clock className="h-3.5 w-3.5 mr-1" />,
        label: status === 'in_review' ? 'In Review' : String(status).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      };
    case 'approved':
      return {
        variant: 'default' as const,
        icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
        label: 'Approved'
      };
    case 'offer_sent':
      return {
        variant: 'default' as const,
        icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
        label: 'Offer Sent'
      };
    case 'offer_accepted':
      return {
        variant: 'default' as const,
        icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
        label: 'Offer Accepted'
      };
    case 'contract_generated':
    case 'contract_signed':
      return {
        variant: 'default' as const,
        icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
        label: status === 'contract_generated' ? 'Contract Generated' : 'Contract Signed'
      };
    case 'lease_activated':
      return {
        variant: 'default' as const,
        icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
        label: 'Lease Active'
      };
    case 'rejected':
    case 'cancelled':
    case 'offer_rejected':
    case 'offer_expired':
      return {
        variant: 'destructive' as const,
        icon: <AlertCircle className="h-3.5 w-3.5 mr-1" />,
        label: status === 'rejected' ? 'Rejected' : 
               status === 'cancelled' ? 'Cancelled' :
               status === 'offer_rejected' ? 'Offer Rejected' : 'Offer Expired'
      };
    default:
      return {
        variant: 'outline' as const,
        icon: null,
        label: String(status).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      };
  }
};

export default StatusBadge;
