import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Steps, Step } from '@/components/lessee/Steps';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PropertySelection } from '@/components/lessee/application/PropertySelection';
import { DocumentUpload } from '@/components/lessee/application/DocumentUpload';
import { EmployerDetails } from '@/components/lessee/application/EmployerDetails';
import { ApplicationReview } from '@/components/lessee/application/ApplicationReview';
import { ArrowLeft, ArrowRight, Save, SendHorizontal, Check } from 'lucide-react';

const ApplicationWorkflow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [savedStep, setSavedStep] = useState(-1);
  
  // Mock application status - in a real app, this would come from an API
  const applicationStatus = "draft" as string; // cast as string to ensure TypeScript knows it's a string
  
  const steps = [
    { id: 'property', title: 'Property Selection' },
    { id: 'documents', title: 'Document Upload' },
    { id: 'employer', title: 'Employer Details' },
    { id: 'review', title: 'Review & Submit' }
  ];
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSaveProgress = () => {
    setSavedStep(currentStep);
    // In a real app, this would save the current progress to the backend
  };
  
  // If application is not a draft, show application status instead of the workflow
  if (applicationStatus !== "draft") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Application Status: {applicationStatus.toUpperCase()}</CardTitle>
          <CardDescription>
            Your application was submitted on May 15, 2025
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Steps activeStep={4} completedSteps={[0, 1, 2, 3]}>
              <Step title="Application Submitted" />
              <Step title="Initial Review" description="Your application is being reviewed by our team" />
              <Step title="Credit Assessment" />
              <Step title="Final Approval" />
            </Steps>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Selected Property</h3>
                <p className="text-sm text-muted-foreground">Ahmadu Bello Residence, Abuja</p>
              </div>
              
              <div>
                <h3 className="font-medium">Financing Details</h3>
                <p className="text-sm text-muted-foreground">
                  Amount: ₦30,000,000 | Tenor: 15 years | Monthly Rent: ₦75,000
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Download Application Summary</Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mortgage Application</CardTitle>
        <CardDescription>
          Complete the following steps to apply for non-interest housing finance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Stepper */}
          <div className="hidden sm:block">
            <Steps activeStep={currentStep}>
              {steps.map((step, index) => (
                <Step 
                  key={step.id} 
                  title={step.title} 
                  completed={index < currentStep || savedStep >= index}
                  onClick={() => savedStep >= index && setCurrentStep(index)}
                />
              ))}
            </Steps>
          </div>
          
          <div className="sm:hidden">
            <p className="text-sm font-medium">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </p>
          </div>
          
          <Separator />
          
          {/* Step Content */}
          <div className="py-4">
            {currentStep === 0 && <PropertySelection />}
            {currentStep === 1 && <DocumentUpload />}
            {currentStep === 2 && <EmployerDetails />}
            {currentStep === 3 && <ApplicationReview />}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            onClick={handleSaveProgress}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Progress
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNextStep}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={() => alert('Application submitted!')}>
              Submit Application
              <SendHorizontal className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ApplicationWorkflow;
