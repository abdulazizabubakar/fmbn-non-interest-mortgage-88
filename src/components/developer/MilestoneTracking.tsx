
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Calendar, 
  DollarSign, 
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit
} from 'lucide-react';
import { mockMilestones } from '@/data/mockDeveloperData';
import { ProjectMilestone } from '@/types/developer';

interface MilestoneTrackingProps {
  searchTerm: string;
}

const MilestoneTracking: React.FC<MilestoneTrackingProps> = ({ searchTerm }) => {
  const [milestones] = useState<ProjectMilestone[]>(mockMilestones);

  const filteredMilestones = milestones.filter(milestone =>
    milestone.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    milestone.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in_progress': return <Clock className="h-5 w-5 text-blue-600" />;
      case 'verified': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'disputed': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <Target className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'verified': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'disputed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'disbursed': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: 'Total Milestones', value: '156', icon: Target },
          { label: 'In Progress', value: '45', icon: Clock },
          { label: 'Completed', value: '98', icon: CheckCircle },
          { label: 'Disputed', value: '3', icon: AlertTriangle }
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

      {/* Milestones List */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Project Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredMilestones.map((milestone) => (
              <div
                key={milestone.id}
                className="border rounded-lg p-6 hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(milestone.status)}
                        <h3 className="text-lg font-medium">{milestone.title}</h3>
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Completion Progress</span>
                      <span>{milestone.completionPercentage}%</span>
                    </div>
                    <Progress value={milestone.completionPercentage} className="h-2" />
                  </div>

                  {/* Details Grid */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Target Date</span>
                      </div>
                      <p className="font-medium">{milestone.targetDate}</p>
                      {milestone.actualDate && (
                        <p className="text-sm text-muted-foreground">
                          Completed: {milestone.actualDate}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>Payment Amount</span>
                      </div>
                      <p className="font-medium">₦{milestone.paymentAmount.toLocaleString()}</p>
                      <Badge className={getPaymentStatusColor(milestone.paymentStatus)}>
                        {milestone.paymentStatus}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Target className="h-4 w-4" />
                        <span>Attachments</span>
                      </div>
                      <p className="font-medium">{milestone.attachments.length} files</p>
                    </div>
                  </div>

                  {/* Verification Info */}
                  {milestone.verificationNotes && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3">
                      <p className="text-sm text-green-800">
                        <strong>Verification Notes:</strong> {milestone.verificationNotes}
                      </p>
                      {milestone.verifiedBy && milestone.verificationDate && (
                        <p className="text-xs text-green-700 mt-1">
                          Verified by {milestone.verifiedBy} on {milestone.verificationDate}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MilestoneTracking;
