
import React from 'react';
import { DisbursementRequest } from '@/types/finance';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

interface DisbursementDetailsProps {
  disbursement: DisbursementRequest;
}

const DisbursementDetails: React.FC<DisbursementDetailsProps> = ({ disbursement }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'in-review':
        return <Badge variant="secondary">In Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'completed':
        return <Badge variant="default">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h3 className="text-xl font-semibold">{disbursement.id}</h3>
          <p className="text-muted-foreground">Requested on {format(new Date(disbursement.requestedAt), 'MMMM d, yyyy')}</p>
        </div>
        <div>
          {getStatusBadge(disbursement.status)}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Disbursement Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Amount</p>
              <p className="font-semibold">{formatCurrency(disbursement.amount)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Mortgage ID</p>
              <p>{disbursement.mortgageId}</p>
            </div>
          </div>
          {disbursement.milestoneId && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Milestone ID</p>
              <p>{disbursement.milestoneId}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Instrument Type</p>
              <p className="capitalize">{disbursement.instrument.replace(/-/g, ' ')}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Notes</p>
              <p>{disbursement.notes}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recipient Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Name</p>
            <p>{disbursement.recipientName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Bank</p>
            <p>{disbursement.recipientBank}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Account Number</p>
            <p>{disbursement.recipientAccount}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Workflow Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-4">1</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Requested</p>
                    <p className="text-sm text-muted-foreground">By {disbursement.requestedBy}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(disbursement.requestedAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
              </div>
            </div>
            
            {disbursement.reviewedBy && (
              <>
                <Separator className="my-2" />
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-4">2</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Reviewed</p>
                        <p className="text-sm text-muted-foreground">By {disbursement.reviewedBy}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {disbursement.reviewedAt && format(new Date(disbursement.reviewedAt), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {disbursement.approvedBy && (
              <>
                <Separator className="my-2" />
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center mr-4">3</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Approved</p>
                        <p className="text-sm text-muted-foreground">By {disbursement.approvedBy}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {disbursement.approvedAt && format(new Date(disbursement.approvedAt), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {disbursement.executedAt && (
              <>
                <Separator className="my-2" />
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-4">4</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Executed</p>
                        <p className="text-sm text-muted-foreground">Payment completed</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(disbursement.executedAt), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <CardFooter className="text-xs text-muted-foreground">
        <p>All disbursements are processed in accordance with Shariah principles and FMBN guidelines.</p>
      </CardFooter>
    </div>
  );
};

export default DisbursementDetails;
