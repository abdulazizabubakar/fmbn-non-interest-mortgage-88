
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { MortgageApplication } from '@/types/mortgage-application';

interface ApplicationContractTabProps {
  application: MortgageApplication;
}

const ApplicationContractTab: React.FC<ApplicationContractTabProps> = ({ application }) => {
  return (
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
  );
};

export default ApplicationContractTab;
