
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { MortgageApplication } from '@/types/mortgage-application';
import ApplicationActionButtons from './ApplicationActionButtons';
import { getStatusBadge } from './StatusBadge';

interface ApplicationStatusHeaderProps {
  application: MortgageApplication;
}

const ApplicationStatusHeader: React.FC<ApplicationStatusHeaderProps> = ({ application }) => {
  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-muted/50 rounded-md p-4 border">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
        <div>
          <div className="text-sm text-muted-foreground">Application Status</div>
          {(() => {
            const statusInfo = getStatusBadge(application.status);
            return (
              <Badge variant={statusInfo.variant} className="mt-1">{statusInfo.label}</Badge>
            );
          })()}
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground">Customer</div>
          <div className="font-medium">{application.customerName}</div>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground">Submission Date</div>
          <div className="font-medium">{formatDate(application.submissionDate)}</div>
        </div>

        {application.financialDetails && (
          <div>
            <div className="text-sm text-muted-foreground">Financing Amount</div>
            <div className="font-medium">₦{application.financialDetails.financingAmount.toLocaleString()}</div>
          </div>
        )}
      </div>
      
      <div className="flex gap-2 self-start">
        <ApplicationActionButtons status={application.status} />
      </div>
    </div>
  );
};

export default ApplicationStatusHeader;
