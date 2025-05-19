
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DisbursementModule from '@/components/finance/DisbursementModule';
import RepaymentModule from '@/components/finance/RepaymentModule';
import SubsidyModule from '@/components/finance/SubsidyModule';
import ExceptionsModule from '@/components/finance/ExceptionsModule';
import FinanceDashboard from '@/components/finance/FinanceDashboard';

const Finance = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="nimms-heading">Finance Operations</h1>
          <p className="text-muted-foreground mt-1">
            Manage disbursements, repayments, and financial operations
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
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
