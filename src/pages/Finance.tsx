
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DisbursementModule from '@/components/finance/DisbursementModule';
import RepaymentModule from '@/components/finance/RepaymentModule';
import SubsidyModule from '@/components/finance/SubsidyModule';
import ExceptionsModule from '@/components/finance/ExceptionsModule';
import FinanceDashboard from '@/components/finance/FinanceDashboard';

const Finance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the tab from the URL path
  const getTabFromPath = () => {
    const path = location.pathname;
    if (path.includes('/finance/disbursements')) return 'disbursements';
    if (path.includes('/finance/repayments')) return 'repayments';
    if (path.includes('/finance/subsidies')) return 'subsidies';
    if (path.includes('/finance/exceptions')) return 'exceptions';
    return 'dashboard'; // Default tab
  };
  
  const [activeTab, setActiveTab] = useState(getTabFromPath());
  
  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/finance/${value === 'dashboard' ? '' : value}`);
  };
  
  // Update active tab when URL changes
  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="nimms-heading">Finance Operations</h1>
          <p className="text-muted-foreground mt-1">
            Manage disbursements, repayments, and financial operations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid grid-cols-2 sm:grid-cols-5 h-auto">
            <TabsTrigger value="dashboard" className="py-2">Dashboard</TabsTrigger>
            <TabsTrigger value="disbursements" className="py-2">Disbursements</TabsTrigger>
            <TabsTrigger value="repayments" className="py-2">Repayments</TabsTrigger>
            <TabsTrigger value="subsidies" className="py-2">Subsidies</TabsTrigger>
            <TabsTrigger value="exceptions" className="py-2">Exceptions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            <FinanceDashboard />
          </TabsContent>
          
          <TabsContent value="disbursements" className="space-y-4">
            <DisbursementModule />
          </TabsContent>
          
          <TabsContent value="repayments" className="space-y-4">
            <RepaymentModule />
          </TabsContent>
          
          <TabsContent value="subsidies" className="space-y-4">
            <SubsidyModule />
          </TabsContent>
          
          <TabsContent value="exceptions" className="space-y-4">
            <ExceptionsModule />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Finance;
