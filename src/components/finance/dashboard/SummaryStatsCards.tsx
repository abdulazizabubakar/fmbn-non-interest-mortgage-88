
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUp, AlertTriangle } from 'lucide-react';

interface SummaryStatsCardsProps {
  totalDisbursed: number;
  pendingDisbursements: number;
  pendingDisbursementsCount: number;
  totalRepaymentsPaid: number;
  totalRepaymentsDue: number;
  openExceptions: number;
  formatCurrency: (amount: number) => string;
}

const SummaryStatsCards: React.FC<SummaryStatsCardsProps> = ({
  totalDisbursed,
  pendingDisbursements,
  pendingDisbursementsCount,
  totalRepaymentsPaid,
  totalRepaymentsDue,
  openExceptions,
  formatCurrency,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Disbursed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalDisbursed)}</div>
          <div className="flex items-center mt-2 text-sm">
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">12.5%</span>
            <span className="text-muted-foreground ml-1">vs last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Pending Disbursements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(pendingDisbursements)}</div>
          <Progress value={(pendingDisbursements / (pendingDisbursements + totalDisbursed)) * 100} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {pendingDisbursementsCount} requests pending
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Repayment Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{((totalRepaymentsPaid / totalRepaymentsDue) * 100).toFixed(1)}%</div>
          <Progress value={(totalRepaymentsPaid / totalRepaymentsDue) * 100} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {formatCurrency(totalRepaymentsPaid)} collected of {formatCurrency(totalRepaymentsDue)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Financial Exceptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{openExceptions}</div>
          <div className="flex items-center mt-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
            <span className="text-amber-500">{openExceptions} open issues</span>
            <span className="text-muted-foreground ml-1">need attention</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryStatsCards;
