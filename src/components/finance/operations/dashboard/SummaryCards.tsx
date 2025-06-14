
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSign, ArrowDownUp, AlertTriangle } from 'lucide-react';

const SummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 via-white to-fmbn-light/50 hover:from-green-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Collections</CardTitle>
          <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center shadow">
            <DollarSign className="h-4 w-4 text-green-700" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦247,500,000</div>
          <div className="flex items-center pt-1">
            <span className="text-xs text-green-600 font-medium">+20.1%</span>
            <span className="text-xs text-muted-foreground ml-2">from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 hover:from-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Disbursements</CardTitle>
          <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center shadow">
            <ArrowDownUp className="h-4 w-4 text-blue-700" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦189,250,000</div>
          <div className="flex items-center pt-1">
            <span className="text-xs text-amber-600 font-medium">32</span>
            <span className="text-xs text-muted-foreground ml-2">pending approvals</span>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-xl border-0 bg-gradient-to-br from-amber-50 via-white to-yellow-100 hover:from-amber-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Delinquency Rate</CardTitle>
          <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center shadow">
            <AlertTriangle className="h-4 w-4 text-amber-700" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4.7%</div>
          <div className="flex items-center pt-1">
            <span className="text-xs text-green-600 font-medium">-0.3%</span>
            <span className="text-xs text-muted-foreground ml-2">from previous quarter</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
