
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Check, AlertTriangle, Download } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const ApplicationReview = () => {
  // In a real app, this data would come from the previous steps and API
  const applicationData = {
    // Property Details
    property: {
      name: 'Ahmadu Bello Residence',
      address: '25 Ahmadu Bello Way, Abuja',
      type: 'apartment',
      value: 30000000,
    },
    
    // Financial Details
    financialDetails: {
      financingType: 'ijara',
      financingAmount: 25500000,
      equityContribution: 4500000,
      equityPercentage: 15,
      monthlyRent: 75000,
      tenor: 180, // months
    },
    
    // Documents Status
    documents: [
      { type: 'id_card', name: 'National ID Card', status: 'completed' },
      { type: 'payslip', name: 'Payslip', status: 'completed' },
      { type: 'employment_letter', name: 'Employment Letter', status: 'completed' },
      { type: 'utility_bill', name: 'Utility Bill', status: 'completed' },
    ],
    
    // Employer Details
    employer: {
      name: 'Federal Ministry of Finance',
      type: 'public',
      jobTitle: 'Senior Accountant',
      startDate: '2019-05-10',
      status: 'permanent',
      monthlyIncome: '450000',
    },
    
    // Eligibility Check
    eligibility: {
      status: 'eligible',
      maxFinancing: 27000000,
      affordabilityRatio: 0.25, // Monthly rent / Monthly income
      incomeMultiple: 5.2, // Financing amount / Annual income
    }
  };
  
  const { property, financialDetails, documents, employer, eligibility } = applicationData;
  
  const incompleteDocuments = documents.filter(doc => doc.status !== 'completed');
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Review Your Application</h2>
        <p className="text-sm text-muted-foreground">
          Please review all details before submitting your application
        </p>
      </div>
      
      {/* Eligibility Status */}
      <Alert variant={eligibility.status === 'eligible' ? 'default' : 'destructive'}>
        {eligibility.status === 'eligible' ? (
          <Check className="h-4 w-4" />
        ) : (
          <AlertTriangle className="h-4 w-4" />
        )}
        <AlertTitle>
          {eligibility.status === 'eligible' 
            ? 'You are eligible for financing' 
            : 'Your eligibility check failed'}
        </AlertTitle>
        <AlertDescription>
          {eligibility.status === 'eligible'
            ? `Based on your income and employment details, you qualify for up to ₦${eligibility.maxFinancing.toLocaleString()} in financing.`
            : 'Please review your application details or contact customer support for assistance.'}
        </AlertDescription>
      </Alert>
      
      {/* Document Status */}
      {incompleteDocuments.length > 0 && (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Missing Documents</AlertTitle>
          <AlertDescription>
            You need to upload {incompleteDocuments.length} required document(s) before submitting your application.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-6">
        {/* Property Details */}
        <div className="space-y-2">
          <h3 className="font-medium text-md">Selected Property</h3>
          <div className="bg-muted p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-muted-foreground">{property.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Type</p>
                <p className="text-sm text-muted-foreground capitalize">{property.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">{property.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Value</p>
                <p className="text-sm text-muted-foreground">₦{property.value.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Financial Details */}
        <div className="space-y-2">
          <h3 className="font-medium text-md">Financial Details</h3>
          <div className="bg-muted p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium">Financing Type</p>
                <p className="text-sm text-muted-foreground capitalize">{financialDetails.financingType}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Financing Amount</p>
                <p className="text-sm text-muted-foreground">₦{financialDetails.financingAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Equity Contribution</p>
                <p className="text-sm text-muted-foreground">₦{financialDetails.equityContribution.toLocaleString()} ({financialDetails.equityPercentage}%)</p>
              </div>
              <div>
                <p className="text-sm font-medium">Monthly Rent</p>
                <p className="text-sm text-muted-foreground">₦{financialDetails.monthlyRent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Tenor</p>
                <p className="text-sm text-muted-foreground">{financialDetails.tenor} months ({financialDetails.tenor / 12} years)</p>
              </div>
              <div>
                <p className="text-sm font-medium">Affordability Ratio</p>
                <p className="text-sm text-muted-foreground">{(eligibility.affordabilityRatio * 100).toFixed(1)}% of income</p>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Employment Details */}
        <div className="space-y-2">
          <h3 className="font-medium text-md">Employment Details</h3>
          <div className="bg-muted p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Employer</p>
                <p className="text-sm text-muted-foreground">{employer.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Job Title</p>
                <p className="text-sm text-muted-foreground">{employer.jobTitle}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Employment Type</p>
                <p className="text-sm text-muted-foreground capitalize">{employer.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Employment Status</p>
                <p className="text-sm text-muted-foreground capitalize">{employer.status}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Monthly Income</p>
                <p className="text-sm text-muted-foreground">₦{parseInt(employer.monthlyIncome).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-muted-foreground">{new Date(employer.startDate).toLocaleDateString('en-GB')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Summary
        </Button>
        <Button>Confirm & Submit Application</Button>
      </div>
    </div>
  );
};
