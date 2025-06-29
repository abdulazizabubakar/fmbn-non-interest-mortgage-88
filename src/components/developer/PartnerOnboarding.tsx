
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  UserPlus, 
  FileCheck, 
  Clock, 
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';

const PartnerOnboarding: React.FC = () => {
  const [onboardingApplications] = useState([
    {
      id: 'app-001',
      partnerName: 'Metro Construction Ltd',
      type: 'developer',
      status: 'under_review',
      submittedDate: '2024-06-25',
      progress: 75,
      documents: {
        submitted: 8,
        required: 10
      },
      reviewer: 'John Smith'
    },
    {
      id: 'app-002',
      partnerName: 'Accurate Surveys Inc',
      type: 'surveyor',
      status: 'approved',
      submittedDate: '2024-06-20',
      progress: 100,
      documents: {
        submitted: 6,
        required: 6
      },
      reviewer: 'Jane Doe'
    },
    {
      id: 'app-003',
      partnerName: 'Prime Valuers',
      type: 'valuer',
      status: 'rejected',
      submittedDate: '2024-06-18',
      progress: 45,
      documents: {
        submitted: 3,
        required: 7
      },
      reviewer: 'Mike Johnson',
      rejectionReason: 'Incomplete documentation'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'under_review': return <Clock className="h-5 w-5 text-orange-600" />;
      default: return <FileCheck className="h-5 w-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: 'Total Applications', value: '24', icon: UserPlus },
          { label: 'Under Review', value: '8', icon: Clock },
          { label: 'Approved', value: '14', icon: CheckCircle },
          { label: 'Rejected', value: '2', icon: XCircle }
        ].map((stat, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Applications List */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Onboarding Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {onboardingApplications.map((application) => (
              <div
                key={application.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(application.status)}
                      <div>
                        <h3 className="font-medium">{application.partnerName}</h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {application.type} • Submitted {application.submittedDate}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Application Progress</span>
                        <span>{application.progress}%</span>
                      </div>
                      <Progress value={application.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>
                          Documents: {application.documents.submitted}/{application.documents.required}
                        </span>
                        <span>Reviewer: {application.reviewer}</span>
                      </div>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status.replace('_', ' ')}
                      </Badge>
                    </div>

                    {application.rejectionReason && (
                      <div className="bg-red-50 border border-red-200 rounded-md p-3">
                        <p className="text-sm text-red-800">
                          <strong>Rejection Reason:</strong> {application.rejectionReason}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                    {application.status === 'under_review' && (
                      <>
                        <Button size="sm" variant="default">
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerOnboarding;
