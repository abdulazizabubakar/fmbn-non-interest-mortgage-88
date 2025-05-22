
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { mockMortgageApplications } from '@/data/mockMortgageApplications';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileText } from 'lucide-react';
import ApplicationSummary from '@/components/mortgage/ApplicationSummary';
import ApplicationDocuments from '@/components/mortgage/ApplicationDocuments';
import ApplicationApprovals from '@/components/mortgage/ApplicationApprovals';
import ApplicationStatusHeader from '@/components/mortgage/ApplicationStatusHeader';
import ApplicationContractTab from '@/components/mortgage/ApplicationContractTab';
import ApplicationCommunicationsTab from '@/components/mortgage/ApplicationCommunicationsTab';

const MortgageApplicationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the application by ID
  const application = useMemo(() => {
    return mockMortgageApplications.find(app => app.id === id);
  }, [id]);
  
  // Handle navigation back to application list
  const handleBack = () => {
    navigate('/mortgage-applications');
  };
  
  // If application not found
  if (!application) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="rounded-full bg-muted p-6 mb-4">
            <FileText className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Application Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The application you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Applications
          </Button>
        </div>
      </PageContainer>
    );
  }
  
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
        
        <ApplicationStatusHeader application={application} />
        
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
            <ApplicationContractTab application={application} />
          </TabsContent>
          
          <TabsContent value="communications">
            <ApplicationCommunicationsTab application={application} />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default MortgageApplicationDetails;
