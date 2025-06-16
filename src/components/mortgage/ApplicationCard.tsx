
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { MortgageApplication } from '@/types/mortgage-application';
import StatusBadge from './StatusBadge';

interface ApplicationCardProps {
  application: MortgageApplication;
  onViewDetails: (id: string) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, onViewDetails }) => {
  // Format customer type
  const formatCustomerType = (type: string) => {
    return String(type).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <Card className="overflow-hidden hover:shadow transition-shadow">
      <CardContent className="p-0">
        <div className="p-4 border-l-4 border-nimms-primary flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between md:justify-start md:space-x-4">
              <h3 className="font-semibold">{application.applicationNumber}</h3>
              <StatusBadge status={application.status} />
            </div>
            
            <p className="text-sm mt-1 font-medium">{application.customerName}</p>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
              <div>
                <span className="text-muted-foreground">Type:</span>{' '}
                <span className="font-medium">{formatCustomerType(application.customerType)}</span>
              </div>
              
              <div>
                <span className="text-muted-foreground">Submitted:</span>{' '}
                <span className="font-medium">{formatDate(application.submissionDate)}</span>
              </div>
              
              {application.financialDetails && (
                <>
                  <div>
                    <span className="text-muted-foreground">Amount:</span>{' '}
                    <span className="font-medium">
                      ₦{application.financialDetails.financingAmount.toLocaleString()}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground">Term:</span>{' '}
                    <span className="font-medium">
                      {Math.floor(application.financialDetails.tenor / 12)} years
                    </span>
                  </div>
                </>
              )}
              
              {application.currentApprovalStage && (
                <div>
                  <span className="text-muted-foreground">Current Stage:</span>{' '}
                  <span className="font-medium capitalize">
                    {application.currentApprovalStage.replace('_', ' ')}
                  </span>
                </div>
              )}
            </div>
            
            {/* Documents and verification status indicators */}
            <div className="flex flex-wrap gap-2 mt-3">
              {application.identityVerified && (
                <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">ID Verified</Badge>
              )}
              
              {application.nhfContributionStatus === 'active' && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">NHF Active</Badge>
              )}
              
              {application.documents.length > 0 && (
                <Badge variant="outline" className="bg-gray-50 text-gray-700 text-xs">
                  {application.documents.length} Documents
                </Badge>
              )}
              
              {application.eligibilityCheck?.status === 'eligible' && (
                <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">Eligible</Badge>
              )}
              
              {application.eligibilityCheck?.status === 'ineligible' && (
                <Badge variant="outline" className="bg-red-50 text-red-700 text-xs">Ineligible</Badge>
              )}
            </div>
          </div>
          
          <div className="flex-shrink-0 self-start md:self-center">
            <Button variant="ghost" size="sm" onClick={() => onViewDetails(application.id)}>
              <span>View Details</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
