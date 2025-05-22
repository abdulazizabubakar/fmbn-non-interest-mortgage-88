
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { BarChart, CreditCard, DollarSign, LineChart, FileText, ArrowDownUp, AlertTriangle, ChevronRight, Download, Filter } from 'lucide-react';

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
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-nimms-primary">Finance Operations</h2>
          <p className="text-muted-foreground mt-1">
            Manage payments, disbursements, refunds, and financial operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-9" onClick={handleExportData}>
            <FileText className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Button size="sm" className="h-9 bg-nimms-primary hover:bg-nimms-primary/90">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm border-nimms-primary/10 hover:border-nimms-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collections</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-green-600" />
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
        <Card className="shadow-sm border-nimms-primary/10 hover:border-nimms-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disbursements</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <ArrowDownUp className="h-4 w-4 text-blue-600" />
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
        <Card className="shadow-sm border-nimms-primary/10 hover:border-nimms-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delinquency Rate</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted/50 p-1 h-auto inline-flex flex-wrap w-full md:w-auto gap-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm h-9 px-4">
            <BarChart className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="payments" className="data-[state=active]:bg-white data-[state=active]:shadow-sm h-9 px-4">
            <CreditCard className="h-4 w-4 mr-2" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="disbursements" className="data-[state=active]:bg-white data-[state=active]:shadow-sm h-9 px-4">
            <ArrowDownUp className="h-4 w-4 mr-2" />
            Disbursements
          </TabsTrigger>
          <TabsTrigger value="refunds" className="data-[state=active]:bg-white data-[state=active]:shadow-sm h-9 px-4">
            <DollarSign className="h-4 w-4 mr-2" />
            Refunds
          </TabsTrigger>
          <TabsTrigger value="reconciliation" className="data-[state=active]:bg-white data-[state=active]:shadow-sm h-9 px-4">
            <FileText className="h-4 w-4 mr-2" />
            Reconciliation
          </TabsTrigger>
          <TabsTrigger value="delinquency" className="data-[state=active]:bg-white data-[state=active]:shadow-sm h-9 px-4">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Delinquency
          </TabsTrigger>
          <TabsTrigger value="treasury" className="data-[state=active]:bg-white data-[state=active]:shadow-sm h-9 px-4">
            <BarChart className="h-4 w-4 mr-2" />
            Treasury
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 animate-in fade-in-50">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <CollectionsSummary />
            <Card className="shadow-sm border-nimms-primary/10">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-nimms-primary">Financial Health</CardTitle>
                <CardDescription>Key financial indicators and metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mb-4" />
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
        
        <TabsContent value="payments" className="space-y-4 animate-in fade-in-50">
          <PaymentTracker />
        </TabsContent>
        
        <TabsContent value="disbursements" className="space-y-4 animate-in fade-in-50">
          <DisbursementManager />
        </TabsContent>
        
        <TabsContent value="refunds" className="space-y-4 animate-in fade-in-50">
          <RefundManager />
        </TabsContent>
        
        <TabsContent value="reconciliation" className="space-y-4 animate-in fade-in-50">
          <ReconciliationTool />
        </TabsContent>
        
        <TabsContent value="delinquency" className="space-y-4 animate-in fade-in-50">
          <DelinquencyDashboard />
        </TabsContent>
        
        <TabsContent value="treasury" className="space-y-4 animate-in fade-in-50">
          <TreasuryDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceOperationsDashboard;
