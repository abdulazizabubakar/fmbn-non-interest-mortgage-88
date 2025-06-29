
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download
} from 'lucide-react';
import { mockDisbursements } from '@/data/mockDeveloperData';
import { DisbursementTracking as DisbursementTrackingType } from '@/types/developer';

interface DisbursementTrackingProps {
  searchTerm: string;
}

const DisbursementTracking: React.FC<DisbursementTrackingProps> = ({ searchTerm }) => {
  const [disbursements] = useState<DisbursementTrackingType[]>(mockDisbursements);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'disbursed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'approved': return <Clock className="h-5 w-5 text-blue-600" />;
      case 'rejected': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <CreditCard className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disbursed': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: 'Total Requests', value: '89', icon: CreditCard },
          { label: 'Pending', value: '12', icon: Clock },
          { label: 'Approved', value: '8', icon: CheckCircle },
          { label: 'Disbursed', value: '65', icon: DollarSign }
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

      {/* Disbursements List */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Disbursement Requests</CardTitle>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {disbursements.map((disbursement) => (
              <div
                key={disbursement.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(disbursement.status)}
                      <div>
                        <h3 className="font-medium">
                          Disbursement #{disbursement.id.split('-')[1]}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Milestone ID: {disbursement.milestoneId}
                        </p>
                      </div>
                      <Badge className={getStatusColor(disbursement.status)}>
                        {disbursement.status}
                      </Badge>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          <span>Amount</span>
                        </div>
                        <p className="text-lg font-bold">₦{disbursement.amount.toLocaleString()}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Request Date</span>
                        </div>
                        <p className="font-medium">{disbursement.requestDate}</p>
                        {disbursement.disbursementDate && (
                          <p className="text-sm text-green-600">
                            Disbursed: {disbursement.disbursementDate}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4" />
                          <span>Reference</span>
                        </div>
                        <p className="font-medium">
                          {disbursement.referenceNumber || 'Pending'}
                        </p>
                        {disbursement.approvedBy && (
                          <p className="text-sm text-muted-foreground">
                            Approved by: {disbursement.approvedBy}
                          </p>
                        )}
                      </div>
                    </div>

                    {disbursement.notes && (
                      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                        <p className="text-sm text-blue-800">
                          <strong>Notes:</strong> {disbursement.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    {disbursement.status === 'requested' && (
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

export default DisbursementTracking;
