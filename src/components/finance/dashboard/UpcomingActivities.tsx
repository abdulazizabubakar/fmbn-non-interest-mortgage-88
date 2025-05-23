
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const UpcomingActivities: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Financial Activities</CardTitle>
        <CardDescription>Scheduled transactions and deadlines</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium">Disbursement Review</h4>
              <p className="text-sm text-muted-foreground">3 disbursement requests need review by May 21, 2025</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-amber-100 p-2 rounded-full">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-medium">Overdue Repayments</h4>
              <p className="text-sm text-muted-foreground">2 repayments are overdue and require immediate follow-up</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">Reconciliation Due</h4>
              <p className="text-sm text-muted-foreground">Daily reconciliation needs to be completed by 5:00 PM</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingActivities;
