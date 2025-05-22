
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, AlertCircle, CheckCircle, Clock, FileClock } from 'lucide-react';
import { MortgageApplication, MortgageApplicationStatus } from '@/types/mortgage-application';
import { useNavigate } from 'react-router-dom';

interface ApplicationsListProps {
  applications: MortgageApplication[];
}

const ApplicationsList: React.FC<ApplicationsListProps> = ({ applications }) => {
  const navigate = useNavigate();
  
  // Get status badge styling and icon
  const getStatusBadge = (status: MortgageApplicationStatus) => {
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

  // Format customer type
  const formatCustomerType = (type: string) => {
    return String(type).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };
  
  // Handle view application details
  const handleViewApplication = (id: string) => {
    navigate(`/mortgage-applications/${id}`);
  };
  
  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <FileClock className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No applications found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => {
        const statusBadge = getStatusBadge(application.status);
        
        return (
          <Card key={application.id} className="overflow-hidden hover:shadow transition-shadow">
            <CardContent className="p-0">
              <div className="p-4 border-l-4 border-nimms-primary flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between md:justify-start md:space-x-4">
                    <h3 className="font-semibold">{application.applicationNumber}</h3>
                    <Badge variant={statusBadge.variant} className="flex items-center">
                      {statusBadge.icon}
                      {statusBadge.label}
                    </Badge>
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
                  <Button variant="ghost" size="sm" onClick={() => handleViewApplication(application.id)}>
                    <span>View Details</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ApplicationsList;
