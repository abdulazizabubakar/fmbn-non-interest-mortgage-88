
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { MortgageApplication, ApprovalStage } from '@/types/mortgage-application';
import { CheckCircle, Clock, AlertCircle, User } from 'lucide-react';
import { toast } from 'sonner';

interface ApplicationApprovalsProps {
  application: MortgageApplication;
}

const ApplicationApprovals: React.FC<ApplicationApprovalsProps> = ({ application }) => {
  // Get status badge styling and icon
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return {
          variant: 'default' as const,
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
          label: 'Approved'
        };
      case 'pending':
        return {
          variant: 'outline' as const,
          icon: <Clock className="h-3.5 w-3.5 mr-1" />,
          label: 'Pending'
        };
      case 'in_progress':
        return {
          variant: 'outline' as const,
          icon: <Clock className="h-3.5 w-3.5 mr-1" />,
          label: 'In Progress'
        };
      case 'rejected':
        return {
          variant: 'destructive' as const,
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1" />,
          label: 'Rejected'
        };
      case 'info_requested':
        return {
          variant: 'secondary' as const,
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1" />,
          label: 'Info Requested'
        };
      default:
        return {
          variant: 'outline' as const,
          icon: <Clock className="h-3.5 w-3.5 mr-1" />,
          label: status.replace(/_/g, ' ')
        };
    }
  };
  
  // Format stage name
  const formatStageName = (stage: string) => {
    const capitalized = stage.charAt(0).toUpperCase() + stage.slice(1);
    return capitalized === 'Credit' ? 'Credit Assessment' :
           capitalized === 'Legal' ? 'Legal Review' :
           capitalized === 'Shariah' ? 'Shariah Compliance' :
           capitalized === 'Management' ? 'Management Approval' :
           capitalized === 'Board' ? 'Board Approval' : capitalized;
  };
  
  // Approval workflow stages in order
  const workflowStages: ApprovalStage['stage'][] = ['credit', 'legal', 'shariah', 'management', 'board'];
  
  // Get all stages with their status
  const getAllStages = () => {
    const result: ApprovalStage[] = [];
    
    // Add existing stages from application
    const existingStages = new Map(application.approvalStages.map(stage => [stage.stage, stage]));
    
    // Create the complete workflow with pending stages
    workflowStages.forEach(stageName => {
      if (existingStages.has(stageName)) {
        result.push(existingStages.get(stageName)!);
      } else {
        // Add placeholder for stages not started yet
        result.push({
          id: `placeholder-${stageName}`,
          stage: stageName,
          status: 'pending'
        });
      }
    });
    
    return result;
  };
  
  const allStages = getAllStages();
  const currentStage = application.approvalStages.find(stage => 
    ['pending', 'in_progress', 'info_requested'].includes(stage.status)
  ) || allStages[0];
  
  // Is this stage active (current)
  const isActiveStage = (stage: ApprovalStage) => {
    return stage.id === currentStage.id;
  };
  
  // Handle approve action
  const handleApprove = () => {
    toast.success('Application approved to next stage');
  };
  
  // Handle request info action
  const handleRequestInfo = () => {
    toast.info('Additional information requested from customer');
  };
  
  // Handle reject action
  const handleReject = () => {
    toast.error('Application rejected');
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Approval Workflow</CardTitle>
            <CardDescription>Multi-level approval process for mortgage application</CardDescription>
          </CardHeader>
          <CardContent>
            {allStages.map((stage, index) => {
              const statusBadge = getStatusBadge(stage.status);
              
              return (
                <div key={stage.id} className="mb-6 last:mb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`rounded-full w-8 h-8 flex items-center justify-center mr-3 ${
                        stage.status === 'approved' ? 'bg-green-100' :
                        stage.status === 'rejected' ? 'bg-red-100' :
                        isActiveStage(stage) ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <span className="font-medium text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{formatStageName(stage.stage)}</h4>
                        {stage.assignedTo && (
                          <p className="text-xs text-muted-foreground">
                            Assigned to: {stage.assignedTo}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <Badge variant={statusBadge.variant} className="flex items-center">
                      {statusBadge.icon}
                      {statusBadge.label}
                    </Badge>
                  </div>
                  
                  {stage.status !== 'pending' && (
                    <div className="ml-11 mt-2 space-y-2">
                      {stage.assignedDate && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Started on {format(new Date(stage.assignedDate), 'MMM dd, yyyy')}
                        </div>
                      )}
                      
                      {stage.completedDate && stage.completedBy && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <User className="h-3 w-3 mr-1" />
                          Completed by {stage.completedBy} on {format(new Date(stage.completedDate), 'MMM dd, yyyy')}
                        </div>
                      )}
                      
                      {stage.notes && (
                        <p className="text-sm mt-1 italic">{stage.notes}</p>
                      )}
                      
                      {isActiveStage(stage) && (
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" onClick={handleApprove}>Approve</Button>
                          <Button size="sm" variant="outline" onClick={handleRequestInfo}>Request Info</Button>
                          <Button size="sm" variant="outline" className="text-red-600" onClick={handleReject}>Reject</Button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {index < allStages.length - 1 && (
                    <div className="ml-4 border-l border-dashed h-4 my-2"></div>
                  )}
                </div>
              );
            })}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              All approvals must follow the maker-checker principle, with different users handling each step.
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Stage</CardTitle>
            <CardDescription>
              {formatStageName(currentStage.stage)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                {(() => {
                  const statusBadge = getStatusBadge(currentStage.status);
                  return (
                    <Badge variant={statusBadge.variant} className="flex items-center mb-4">
                      {statusBadge.icon}
                      {statusBadge.label}
                    </Badge>
                  );
                })()}
                
                <div className="space-y-2">
                  {currentStage.assignedTo ? (
                    <div>
                      <div className="text-sm text-muted-foreground">Assigned To</div>
                      <div className="font-medium">{currentStage.assignedTo}</div>
                    </div>
                  ) : (
                    <div className="text-amber-600 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Not assigned to any reviewer yet
                    </div>
                  )}
                  
                  {currentStage.assignedDate && (
                    <div>
                      <div className="text-sm text-muted-foreground">Assigned On</div>
                      <div className="font-medium">
                        {format(new Date(currentStage.assignedDate), 'MMM dd, yyyy')}
                      </div>
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <h4 className="font-medium">Required Actions</h4>
                  
                  {currentStage.stage === 'credit' && (
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-xs">1</span>
                        </div>
                        <span>Verify income documentation and employment status</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-xs">2</span>
                        </div>
                        <span>Calculate and confirm debt-to-income ratio</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-xs">3</span>
                        </div>
                        <span>Check NHF contribution status and history</span>
                      </li>
                    </ul>
                  )}
                  
                  {currentStage.stage === 'legal' && (
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-xs">1</span>
                        </div>
                        <span>Verify property documentation and ownership</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-xs">2</span>
                        </div>
                        <span>Review draft Ijarah contract terms</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-xs">3</span>
                        </div>
                        <span>Confirm legal compliance with mortgage regulations</span>
                      </li>
                    </ul>
                  )}
                  
                  {currentStage.stage === 'shariah' && (
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-xs">1</span>
                        </div>
                        <span>Verify Ijarah structure is Shariah-compliant</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-xs">2</span>
                        </div>
                        <span>Review profit calculation methodology</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-xs">3</span>
                        </div>
                        <span>Confirm payment terms meet non-interest requirements</span>
                      </li>
                    </ul>
                  )}
                  
                  {(currentStage.stage === 'management' || currentStage.stage === 'board') && (
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-xs">1</span>
                        </div>
                        <span>Review all prior approvals and documentation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-xs">2</span>
                        </div>
                        <span>Confirm financing terms and risk assessment</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-xs">3</span>
                        </div>
                        <span>Provide final approval for mortgage issuance</span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              
              <div className="pt-2 space-y-2">
                <Button className="w-full" onClick={handleApprove}>Approve to Next Stage</Button>
                <Button variant="outline" className="w-full" onClick={handleRequestInfo}>Request Additional Information</Button>
                <Button variant="outline" className="w-full text-red-600" onClick={handleReject}>Reject Application</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>SLA Tracking</CardTitle>
            <CardDescription>Service level agreement metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Time in current stage</span>
                <span className="font-medium">3 days</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 days</span>
                <span>SLA: 5 days</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total application time</span>
                <span className="font-medium">12 days</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 days</span>
                <span>Target: 30 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationApprovals;
