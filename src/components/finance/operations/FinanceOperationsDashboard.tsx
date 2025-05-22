
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { BarChart, CreditCard, DollarSign, LineChart, FileText, ArrowDownUp, AlertTriangle } from 'lucide-react';

// Finance operations subcomponents
import CollectionsSummary from './CollectionsSummary';
import PaymentTracker from './PaymentTracker';
import DisbursementManager from './DisbursementManager';
import RefundManager from './RefundManager';
import ReconciliationTool from './ReconciliationTool';
import DelinquencyDashboard from './DelinquencyDashboard';
import TreasuryDashboard from './TreasuryDashboard';

const FinanceOperationsDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState('overview');

  const handleExportData = () => {
    toast({
      title: "Export initiated",
      description: "Your financial data is being prepared for download",
    });
  };

  console.log("Finance Operations Dashboard is rendering");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Finance Operations</h2>
          <p className="text-muted-foreground">
            Manage payments, disbursements, refunds, and financial operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportData}>
            <FileText className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collections</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦247,500,000</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disbursements</CardTitle>
            <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦189,250,000</div>
            <p className="text-xs text-muted-foreground">
              32 pending approvals
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delinquency Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7%</div>
            <p className="text-xs text-muted-foreground">
              -0.3% from previous quarter
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-7 h-auto">
          <TabsTrigger value="overview" className="py-2">Overview</TabsTrigger>
          <TabsTrigger value="payments" className="py-2">Payments</TabsTrigger>
          <TabsTrigger value="disbursements" className="py-2">Disbursements</TabsTrigger>
          <TabsTrigger value="refunds" className="py-2">Refunds</TabsTrigger>
          <TabsTrigger value="reconciliation" className="py-2">Reconciliation</TabsTrigger>
          <TabsTrigger value="delinquency" className="py-2">Delinquency</TabsTrigger>
          <TabsTrigger value="treasury" className="py-2">Treasury</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <CollectionsSummary />
            <Card>
              <CardHeader>
                <CardTitle>Financial Health</CardTitle>
                <CardDescription>Key financial indicators and metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <BarChart className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium">Financial Metrics</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Detailed financial health metrics will be displayed here with performance indicators and trends
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <TreasuryDashboard showSummary={true} />
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-4">
          <PaymentTracker />
        </TabsContent>
        
        <TabsContent value="disbursements" className="space-y-4">
          <DisbursementManager />
        </TabsContent>
        
        <TabsContent value="refunds" className="space-y-4">
          <RefundManager />
        </TabsContent>
        
        <TabsContent value="reconciliation" className="space-y-4">
          <ReconciliationTool />
        </TabsContent>
        
        <TabsContent value="delinquency" className="space-y-4">
          <DelinquencyDashboard />
        </TabsContent>
        
        <TabsContent value="treasury" className="space-y-4">
          <TreasuryDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceOperationsDashboard;
