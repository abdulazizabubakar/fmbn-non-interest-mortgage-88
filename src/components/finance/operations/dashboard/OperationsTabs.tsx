
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  BarChart, 
  CreditCard, 
  DollarSign, 
  FileText, 
  ArrowDownUp, 
  AlertTriangle 
} from 'lucide-react';

// Import subcomponents
import CollectionsSummary from '../CollectionsSummary';
import PaymentTracker from '../PaymentTracker';
import DisbursementManager from '../DisbursementManager';
import RefundManager from '../RefundManager';
import ReconciliationTool from '../ReconciliationTool';
import DelinquencyDashboard from '../DelinquencyDashboard';
import TreasuryDashboard from '../TreasuryDashboard';
import OverviewFinancialHealth from './OverviewFinancialHealth';

interface OperationsTabsProps {
  initialTab?: string;
}

const OperationsTabs: React.FC<OperationsTabsProps> = ({ initialTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  return (
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
          <OverviewFinancialHealth />
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
  );
};

export default OperationsTabs;
