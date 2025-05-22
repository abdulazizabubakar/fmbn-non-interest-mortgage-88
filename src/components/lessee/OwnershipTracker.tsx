
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, Calendar, ArrowRight, Download, FileText, AlertTriangle } from 'lucide-react';

const OwnershipTracker = () => {
  // Mock data - in a real app, this would come from an API
  const ownershipData = {
    startDate: '2025-04-01',
    maturityDate: '2040-04-01',
    totalTenor: 180, // months
    completedMonths: 2,
    totalAmount: 30000000,
    paidAmount: 450000,
    ownershipPercentage: 1.5,
    milestones: [
      { id: '1', name: 'Contract Start', percentage: 0, date: '2025-04-01', achieved: true },
      { id: '2', name: '25% Ownership', percentage: 25, date: '2030-04-01', achieved: false },
      { id: '3', name: '50% Ownership', percentage: 50, date: '2035-04-01', achieved: false },
      { id: '4', name: '75% Ownership', percentage: 75, date: '2038-04-01', achieved: false },
      { id: '5', name: 'Full Ownership', percentage: 100, date: '2040-04-01', achieved: false }
    ],
    eligibleForTransfer: false,
    transferRequirements: [
      'Completed at least 50% of payments',
      'No outstanding payment defaults',
      'Takaful insurance up to date',
      'Property inspection passed'
    ]
  };
  
  const { 
    startDate, 
    maturityDate, 
    totalTenor, 
    completedMonths, 
    totalAmount, 
    paidAmount, 
    ownershipPercentage, 
    milestones,
    eligibleForTransfer,
    transferRequirements
  } = ownershipData;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Calculate percentage of time elapsed
  const timeElapsedPercentage = (completedMonths / totalTenor) * 100;
  
  // Find next milestone
  const nextMilestone = milestones.find(milestone => !milestone.achieved);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ownership Progress</CardTitle>
          <CardDescription>
            Track your journey to full property ownership
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress indicators */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current Ownership</span>
              <span className="font-medium">{ownershipPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-4">
              <div 
                className="bg-primary h-4 rounded-full" 
                style={{ width: `${ownershipPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Start Date</h3>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{formatDate(startDate)}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Projected Completion</h3>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{formatDate(maturityDate)}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Time Progress</h3>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  {completedMonths} of {totalTenor} months ({timeElapsedPercentage.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Total Amount</h3>
              <p className="text-xl font-bold">₦{totalAmount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Ijarah Agreement Value</p>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Paid Amount</h3>
              <p className="text-xl font-bold">₦{paidAmount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">
                {((paidAmount / totalAmount) * 100).toFixed(1)}% of total value
              </p>
            </div>
          </div>
          
          <Separator />
          
          {/* Milestones */}
          <div className="space-y-4">
            <h3 className="font-medium">Ownership Milestones</h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-muted"></div>
              
              {/* Milestone items */}
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="relative pl-12">
                    {/* Milestone point */}
                    <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.achieved ? 'bg-primary' : 'bg-muted'
                    }`}>
                      <span className={`text-xs font-medium ${
                        milestone.achieved ? 'text-primary-foreground' : 'text-muted-foreground'
                      }`}>
                        {milestone.percentage}%
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h4 className="font-medium flex items-center">
                        {milestone.name}
                        {milestone.achieved && (
                          <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                            Achieved
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(milestone.date)}
                      </p>
                      
                      {index === 0 && milestone.achieved && nextMilestone && (
                        <div className="mt-2 text-xs">
                          <p className="text-muted-foreground">
                            Next milestone: {nextMilestone.name} ({nextMilestone.percentage}%)
                          </p>
                          <p className="text-muted-foreground">
                            Projected date: {formatDate(nextMilestone.date)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={!eligibleForTransfer}>
            Request Ownership Transfer
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      {/* Transfer Eligibility */}
      <Card>
        <CardHeader>
          <CardTitle>Ownership Transfer Eligibility</CardTitle>
          <CardDescription>
            Requirements for transferring property to your name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <p className="text-sm font-medium">
                {eligibleForTransfer 
                  ? 'You are eligible to start the ownership transfer process' 
                  : 'You are not yet eligible for ownership transfer'}
              </p>
            </div>
            
            <div className="space-y-2">
              {transferRequirements.map((requirement, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 rounded-md bg-muted"
                >
                  <div className="w-5 h-5 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">{index + 1}</span>
                  </div>
                  <span className="text-sm">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <FileText className="mr-2 h-4 w-4" />
            Download Transfer Process Guide
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OwnershipTracker;
