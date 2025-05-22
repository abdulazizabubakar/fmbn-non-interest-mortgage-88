
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Briefcase, Home, Calendar, Wallet, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { MortgageApplication, EligibilityStatus } from '@/types/mortgage-application';
import { format } from 'date-fns';

interface ApplicationSummaryProps {
  application: MortgageApplication;
}

const ApplicationSummary: React.FC<ApplicationSummaryProps> = ({ application }) => {
  // Format customer type
  const formatCustomerType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };
  
  // Get eligibility status badge
  const getEligibilityBadge = (status: EligibilityStatus) => {
    switch(status) {
      case 'eligible':
        return {
          variant: 'default' as const,
          icon: <CheckCircle className="h-4 w-4 mr-1" />,
          label: 'Eligible'
        };
      case 'ineligible':
        return {
          variant: 'destructive' as const,
          icon: <AlertCircle className="h-4 w-4 mr-1" />,
          label: 'Ineligible'
        };
      case 'conditional':
        return {
          variant: 'outline' as const,
          icon: <Clock className="h-4 w-4 mr-1" />,
          label: 'Conditional'
        };
      case 'pending':
        return {
          variant: 'outline' as const,
          icon: <Clock className="h-4 w-4 mr-1" />,
          label: 'Pending'
        };
      default:
        return {
          variant: 'outline' as const,
          icon: <Clock className="h-4 w-4 mr-1" />,
          label: 'Unknown'
        };
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-muted-foreground">Customer Name</div>
                  <div className="font-medium">{application.customerName}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Customer Type</div>
                  <div className="font-medium">{formatCustomerType(application.customerType)}</div>
                </div>
                
                {application.nhfContributorId && (
                  <div>
                    <div className="text-sm text-muted-foreground">NHF Contributor ID</div>
                    <div className="font-medium">{application.nhfContributorId}</div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-muted-foreground">Verification Status</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant={application.bvnVerified ? 'default' : 'outline'}>
                      BVN {application.bvnVerified ? 'Verified' : 'Pending'}
                    </Badge>
                    
                    <Badge variant={application.ninVerified ? 'default' : 'outline'}>
                      NIN {application.ninVerified ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                </div>
                
                {application.nhfContributionStatus && (
                  <div>
                    <div className="text-sm text-muted-foreground">NHF Status</div>
                    <Badge variant={application.nhfContributionStatus === 'active' ? 'default' : 'outline'}>
                      {application.nhfContributionStatus.charAt(0).toUpperCase() + application.nhfContributionStatus.slice(1)}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="outline" size="sm">View Full Customer Profile</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Property & Financial Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {application.property ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium">Property Details</h4>
                    <div className="space-y-2 mt-2">
                      <div>
                        <div className="text-sm text-muted-foreground">Address</div>
                        <div className="font-medium">{application.property.address}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Type</div>
                          <div className="font-medium capitalize">{application.property.type}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">Area</div>
                          <div className="font-medium">{application.property.area} sqm</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Location</div>
                          <div className="font-medium">{application.property.location}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">State</div>
                          <div className="font-medium">{application.property.state}</div>
                        </div>
                      </div>
                      
                      {application.property.preBooked && (
                        <div>
                          <div className="text-sm text-muted-foreground">Pre-booking Expires</div>
                          <div className="font-medium">
                            {application.property.preBookingExpiry ? 
                              format(new Date(application.property.preBookingExpiry), 'MMM dd, yyyy') : 
                              'No expiry set'}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {application.financialDetails && (
                    <div>
                      <h4 className="font-medium">Financial Details</h4>
                      <div className="space-y-2 mt-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Property Value</div>
                            <div className="font-medium">
                              ₦{application.financialDetails.propertyValue.toLocaleString()}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground">Financing Amount</div>
                            <div className="font-medium">
                              ₦{application.financialDetails.financingAmount.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Equity Contribution</div>
                            <div className="font-medium">
                              ₦{application.financialDetails.equityContribution.toLocaleString()} 
                              ({application.financialDetails.equityPercentage}%)
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground">Monthly Rent</div>
                            <div className="font-medium">
                              ₦{application.financialDetails.monthlyRent.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Tenor</div>
                            <div className="font-medium">
                              {Math.floor(application.financialDetails.tenor / 12)} years 
                              ({application.financialDetails.tenor} months)
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground">Debt-to-Income Ratio</div>
                            <div className="font-medium">
                              {(application.financialDetails.debtToIncomeRatio * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button variant="outline" size="sm">View Property Details</Button>
                  {application.financialDetails && (
                    <Button variant="outline" size="sm">Recalculate Terms</Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Home className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No Property Selected</h3>
                <p className="text-muted-foreground mt-1 max-w-md mx-auto">
                  This application doesn't have a property selected or financial details set up yet.
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  <Button>Select Property</Button>
                  <Button variant="outline">Calculate Terms</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Eligibility Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            {application.eligibilityCheck ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {(() => {
                    const badge = getEligibilityBadge(application.eligibilityCheck.status);
                    return (
                      <Badge variant={badge.variant} className="flex items-center">
                        {badge.icon}
                        {badge.label}
                      </Badge>
                    );
                  })()}
                  
                  <span className="text-sm text-muted-foreground">
                    Checked on {format(new Date(application.eligibilityCheck.checkedDate), 'MMM dd, yyyy')}
                  </span>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Income Requirement</span>
                    {application.eligibilityCheck.incomeEligible ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">NHF Contribution</span>
                    {application.eligibilityCheck.nhfEligible ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Debt-to-Income Ratio</span>
                    {application.eligibilityCheck.dtiRatioEligible ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Employment Status</span>
                    {application.eligibilityCheck.employmentEligible ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
                
                {application.eligibilityCheck.ineligibilityReasons && 
                 application.eligibilityCheck.ineligibilityReasons.length > 0 && (
                  <>
                    <Separator />
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Ineligibility Reasons</h4>
                      <ul className="space-y-1 text-sm">
                        {application.eligibilityCheck.ineligibilityReasons.map((reason, index) => (
                          <li key={index} className="text-red-600 flex items-start">
                            <AlertCircle className="h-4 w-4 mr-1 mt-0.5 shrink-0" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
                
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">Re-check Eligibility</Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">Eligibility Not Checked</h3>
                <p className="text-muted-foreground mt-1">
                  The eligibility check hasn't been performed for this application.
                </p>
                <Button size="sm" className="mt-4">Check Eligibility</Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Application Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative pl-6 border-l border-muted pb-6">
                <div className="absolute left-[-8px] top-0 bg-green-100 border-2 border-green-500 rounded-full w-4 h-4"></div>
                <div className="text-sm">
                  <p className="font-medium">Application Submitted</p>
                  <p className="text-muted-foreground">
                    {format(new Date(application.submissionDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              
              {application.approvalStages.map((stage, index) => (
                <div key={index} className="relative pl-6 border-l border-muted pb-6 last:pb-0 last:border-0">
                  <div className={`absolute left-[-8px] top-0 ${
                    stage.status === 'approved' ? 'bg-green-100 border-green-500' :
                    stage.status === 'rejected' ? 'bg-red-100 border-red-500' :
                    stage.status === 'in_progress' ? 'bg-blue-100 border-blue-500' :
                    'bg-gray-100 border-gray-300'
                  } border-2 rounded-full w-4 h-4`}></div>
                  
                  <div className="text-sm">
                    <p className="font-medium capitalize">{stage.stage} Review</p>
                    <p className="text-muted-foreground">
                      {stage.completedDate ? (
                        <>Completed {format(new Date(stage.completedDate), 'MMM dd, yyyy')}</>
                      ) : stage.assignedDate ? (
                        <>Started {format(new Date(stage.assignedDate), 'MMM dd, yyyy')}</>
                      ) : (
                        <>Pending</>
                      )}
                    </p>
                    {stage.notes && <p className="text-xs italic mt-1">{stage.notes}</p>}
                  </div>
                </div>
              ))}
              
              {application.status === 'offer_sent' && (
                <div className="relative pl-6 border-l border-muted pb-6">
                  <div className="absolute left-[-8px] top-0 bg-blue-100 border-2 border-blue-500 rounded-full w-4 h-4"></div>
                  <div className="text-sm">
                    <p className="font-medium">Offer Sent to Customer</p>
                    <p className="text-muted-foreground">Awaiting customer response</p>
                  </div>
                </div>
              )}
              
              {application.contract?.status === 'signed' && (
                <div className="relative pl-6 border-l border-muted pb-6">
                  <div className="absolute left-[-8px] top-0 bg-green-100 border-2 border-green-500 rounded-full w-4 h-4"></div>
                  <div className="text-sm">
                    <p className="font-medium">Contract Signed</p>
                    <p className="text-muted-foreground">
                      {application.contract.fmbnSignDate && 
                        format(new Date(application.contract.fmbnSignDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              )}
              
              {application.status === 'lease_activated' && (
                <div className="relative pl-6">
                  <div className="absolute left-[-8px] top-0 bg-green-100 border-2 border-green-500 rounded-full w-4 h-4"></div>
                  <div className="text-sm">
                    <p className="font-medium">Lease Activated</p>
                    <p className="text-muted-foreground">Mortgage now active</p>
                  </div>
                </div>
              )}
              
              {application.status === 'rejected' && (
                <div className="relative pl-6">
                  <div className="absolute left-[-8px] top-0 bg-red-100 border-2 border-red-500 rounded-full w-4 h-4"></div>
                  <div className="text-sm">
                    <p className="font-medium">Application Rejected</p>
                    <p className="text-muted-foreground">
                      {application.lastUpdated && 
                        format(new Date(application.lastUpdated), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationSummary;
