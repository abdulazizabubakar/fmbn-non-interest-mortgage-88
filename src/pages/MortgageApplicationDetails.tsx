
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Clock, AlertCircle, User, Briefcase, Home, FileText, Calendar, Wallet } from 'lucide-react';
import { mockMortgageApplications } from '@/data/mockMortgageApplications';
import { format } from 'date-fns';
import ApplicationSummary from '@/components/mortgage/ApplicationSummary';
import ApplicationDocuments from '@/components/mortgage/ApplicationDocuments';
import ApplicationApprovals from '@/components/mortgage/ApplicationApprovals';
import { MortgageApplicationStatus } from '@/types/mortgage-application';
import { toast } from 'sonner';

const MortgageApplicationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the application data
  const application = useMemo(() => {
    return mockMortgageApplications.find(app => app.id === id);
  }, [id]);
  
  if (!application) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-semibold">Application Not Found</h2>
            <p className="mt-2 text-muted-foreground">
              The mortgage application you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/mortgage-applications')} className="mt-6">
              Back to Applications
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }

  // Get status badge styling and icon
  const getStatusBadge = (status: MortgageApplicationStatus) => {
    switch(status) {
      case 'draft':
        return { variant: 'secondary' as const, label: 'Draft' };
      case 'submitted':
        return { variant: 'outline' as const, label: 'Submitted' };
      case 'in_review':
        return { variant: 'outline' as const, label: 'In Review' };
      case 'credit_assessment':
      case 'legal_review':
      case 'shariah_review':
      case 'management_approval':
      case 'board_approval':
        return { 
          variant: 'outline' as const, 
          label: status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        };
      case 'approved':
        return { variant: 'default' as const, label: 'Approved' };
      case 'offer_sent':
        return { variant: 'default' as const, label: 'Offer Sent' };
      case 'offer_accepted':
        return { variant: 'default' as const, label: 'Offer Accepted' };
      case 'contract_generated':
        return { variant: 'default' as const, label: 'Contract Generated' };
      case 'contract_signed':
        return { variant: 'default' as const, label: 'Contract Signed' };
      case 'lease_activated':
        return { variant: 'default' as const, label: 'Lease Active' };
      case 'rejected':
      case 'cancelled':
      case 'offer_rejected':
      case 'offer_expired':
        return { variant: 'destructive' as const, label: status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) };
      default:
        return { variant: 'outline' as const, label: status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) };
    }
  };
  
  const statusBadge = getStatusBadge(application.status);
  
  // Action buttons based on application status
  const renderActionButtons = () => {
    switch(application.status) {
      case 'draft':
        return (
          <div className="flex flex-wrap gap-2">
            <Button>Complete Application</Button>
            <Button variant="outline">Save Draft</Button>
          </div>
        );
      case 'submitted':
        return (
          <div className="flex flex-wrap gap-2">
            <Button>Start Review</Button>
            <Button variant="outline">Request Documents</Button>
          </div>
        );
      case 'in_review':
      case 'credit_assessment':
      case 'legal_review':
      case 'shariah_review':
      case 'management_approval':
      case 'board_approval':
        return (
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => toast.success('Application approved to next stage')}>
              Approve to Next Stage
            </Button>
            <Button variant="outline">Request Additional Info</Button>
            <Button variant="outline" className="text-red-600 hover:bg-red-50">Reject</Button>
          </div>
        );
      case 'approved':
        return (
          <div className="flex flex-wrap gap-2">
            <Button>Generate Contract</Button>
            <Button variant="outline">Modify Terms</Button>
          </div>
        );
      case 'offer_sent':
        return (
          <div className="flex flex-wrap gap-2">
            <Button>Mark as Accepted</Button>
            <Button variant="outline">Send Reminder</Button>
            <Button variant="outline" className="text-red-600 hover:bg-red-50">Mark as Rejected</Button>
          </div>
        );
      case 'contract_generated':
        return (
          <div className="flex flex-wrap gap-2">
            <Button>Record Signatures</Button>
            <Button variant="outline">Send to Customer</Button>
          </div>
        );
      case 'contract_signed':
        return (
          <div className="flex flex-wrap gap-2">
            <Button>Activate Lease</Button>
            <Button variant="outline">Schedule Disbursement</Button>
          </div>
        );
      case 'lease_activated':
        return (
          <div className="flex flex-wrap gap-2">
            <Button>View Repayment Schedule</Button>
            <Button variant="outline">Generate Statement</Button>
          </div>
        );
      case 'rejected':
      case 'cancelled':
      case 'offer_rejected':
      case 'offer_expired':
        return (
          <div className="flex flex-wrap gap-2">
            <Button>Create New Application</Button>
            <Button variant="outline">View Rejection Reasons</Button>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/mortgage-applications')}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {application.applicationNumber}
          </h1>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-muted/50 rounded-md p-4 border">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <div>
              <div className="text-sm text-muted-foreground">Application Status</div>
              <Badge variant={statusBadge.variant} className="mt-1">{statusBadge.label}</Badge>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Customer</div>
              <div className="font-medium">{application.customerName}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Submission Date</div>
              <div className="font-medium">{format(new Date(application.submissionDate), 'MMM dd, yyyy')}</div>
            </div>

            {application.financialDetails && (
              <div>
                <div className="text-sm text-muted-foreground">Financing Amount</div>
                <div className="font-medium">₦{application.financialDetails.financingAmount.toLocaleString()}</div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 self-start">
            {renderActionButtons()}
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="approvals">Approval Workflow</TabsTrigger>
            <TabsTrigger value="contract">Contract & Terms</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <ApplicationSummary application={application} />
          </TabsContent>
          
          <TabsContent value="documents">
            <ApplicationDocuments application={application} />
          </TabsContent>
          
          <TabsContent value="approvals">
            <ApplicationApprovals application={application} />
          </TabsContent>
          
          <TabsContent value="contract">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Ijarah Contract</CardTitle>
                    <CardDescription>Lease agreement details and payment schedule</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {application.contract ? (
                      <>
                        <div className="flex items-center justify-between p-4 border rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-8 w-8 mr-4 text-blue-600" />
                            <div>
                              <h4 className="font-medium">Ijarah Muntahia Bitamleek Contract</h4>
                              <p className="text-sm text-muted-foreground">
                                Generated on {format(new Date(application.contract.generatedDate), 'MMM dd, yyyy')}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-md">
                          <div className="flex items-center">
                            <Calendar className="h-8 w-8 mr-4 text-green-600" />
                            <div>
                              <h4 className="font-medium">Payment Schedule</h4>
                              <p className="text-sm text-muted-foreground">
                                Monthly rental payment details
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          <div className="space-y-3">
                            <h4 className="font-medium">Contract Status</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant={application.contract.status === 'active' ? 'default' : 'outline'}>
                                {application.contract.status.replace(/\b\w/g, c => c.toUpperCase())}
                              </Badge>
                            </div>
                            
                            <h4 className="font-medium mt-4">Signatures</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Customer Signature:</span>
                                <span className={application.contract.signedByApplicant ? "text-green-600" : "text-amber-600"}>
                                  {application.contract.signedByApplicant ? (
                                    <span className="flex items-center">
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Signed
                                    </span>
                                  ) : (
                                    <span className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1" />
                                      Pending
                                    </span>
                                  )}
                                </span>
                              </div>
                              
                              <div className="flex items-center justify-between text-sm">
                                <span>FMBN Signature:</span>
                                <span className={application.contract.signedByFmbn ? "text-green-600" : "text-amber-600"}>
                                  {application.contract.signedByFmbn ? (
                                    <span className="flex items-center">
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Signed
                                    </span>
                                  ) : (
                                    <span className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1" />
                                      Pending
                                    </span>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium">Actions</h4>
                            <div className="space-y-2 mt-3">
                              <Button size="sm" className="w-full" variant="outline">Send to Customer</Button>
                              <Button size="sm" className="w-full" variant="outline">Download Copy</Button>
                              {!application.contract.signedByApplicant && (
                                <Button size="sm" className="w-full" variant="outline">Send Reminder</Button>
                              )}
                              {application.contract.status === 'signed' && (
                                <Button size="sm" className="w-full">Activate Contract</Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <div className="bg-muted inline-flex rounded-full p-3">
                          <FileText className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium">No Contract Generated</h3>
                        <p className="text-muted-foreground mt-1">
                          A contract will be generated once the application is fully approved.
                        </p>
                        
                        {application.status === 'approved' && (
                          <Button className="mt-4">Generate Contract Now</Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Takaful Policy</CardTitle>
                    <CardDescription>Islamic insurance coverage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {application.takafulDetails ? (
                      <>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Badge variant={application.takafulDetails.status === 'active' ? 'default' : 'outline'}>
                              {application.takafulDetails.status.replace(/\b\w/g, c => c.toUpperCase())}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Policy Number:</span>
                              <span className="font-medium">{application.takafulDetails.policyNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Provider:</span>
                              <span className="font-medium">{application.takafulDetails.provider}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Coverage:</span>
                              <span className="font-medium">
                                ₦{application.takafulDetails.coverageAmount?.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Premium:</span>
                              <span className="font-medium">
                                ₦{application.takafulDetails.premium?.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          
                          <div className="pt-2">
                            <Button size="sm" className="w-full" variant="outline">View Policy Details</Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No Takaful policy has been linked to this application yet.
                        </p>
                        <Button size="sm" className="mt-4">Set Up Policy</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Employer Undertaking</CardTitle>
                    <CardDescription>Payment assurance from employer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {application.employerUndertaking ? (
                      <>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Badge variant={application.employerUndertaking.status === 'verified' ? 'default' : 'outline'}>
                              {application.employerUndertaking.status.replace(/\b\w/g, c => c.toUpperCase())}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Employer:</span>
                              <span className="font-medium">{application.employerUndertaking.employerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Contact Person:</span>
                              <span className="font-medium">{application.employerUndertaking.contactPerson}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Type:</span>
                              <span className="font-medium capitalize">
                                {application.employerUndertaking.employerType}
                              </span>
                            </div>
                          </div>
                          
                          {application.employerUndertaking.undertakingDocumentUrl && (
                            <div className="pt-2">
                              <Button size="sm" className="w-full" variant="outline">View Undertaking</Button>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No employer undertaking has been uploaded for this application.
                        </p>
                        <Button size="sm" className="mt-4">Request Undertaking</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="communications">
            <Card>
              <CardHeader>
                <CardTitle>Communications History</CardTitle>
                <CardDescription>Messages, notifications, and document requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="bg-muted inline-flex rounded-full p-3">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No Communications Yet</h3>
                  <p className="text-muted-foreground mt-1 max-w-md mx-auto">
                    No communication history is available for this application.
                  </p>
                  <div className="flex justify-center gap-2 mt-6">
                    <Button>Send Message</Button>
                    <Button variant="outline">Request Document</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default MortgageApplicationDetails;
