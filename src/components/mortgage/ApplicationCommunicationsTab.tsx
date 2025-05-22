
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { MortgageApplication } from '@/types/mortgage-application';

interface ApplicationCommunicationsTabProps {
  application: MortgageApplication;
}

const ApplicationCommunicationsTab: React.FC<ApplicationCommunicationsTabProps> = ({ application }) => {
  return (
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
  );
};

export default ApplicationCommunicationsTab;
