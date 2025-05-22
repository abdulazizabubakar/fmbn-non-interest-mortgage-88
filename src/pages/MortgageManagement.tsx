
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MortgageAccountsView from '@/components/mortgage/management/MortgageAccountsView';
import PaymentTrackingView from '@/components/mortgage/management/PaymentTrackingView';
import DefaultManagementView from '@/components/mortgage/management/DefaultManagementView';
import RestructuringView from '@/components/mortgage/management/RestructuringView';
import OwnershipTransferView from '@/components/mortgage/management/OwnershipTransferView';
import ReportingView from '@/components/mortgage/management/ReportingView';

const MortgageManagement = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mortgage Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage mortgage accounts, payments, defaults, and ownership transfers
          </p>
        </div>
        
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="defaults">Defaults</TabsTrigger>
            <TabsTrigger value="restructuring">Restructuring</TabsTrigger>
            <TabsTrigger value="transfers">Ownership</TabsTrigger>
            <TabsTrigger value="reporting">Reporting</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts">
            <MortgageAccountsView />
          </TabsContent>
          
          <TabsContent value="payments">
            <PaymentTrackingView />
          </TabsContent>
          
          <TabsContent value="defaults">
            <DefaultManagementView />
          </TabsContent>
          
          <TabsContent value="restructuring">
            <RestructuringView />
          </TabsContent>
          
          <TabsContent value="transfers">
            <OwnershipTransferView />
          </TabsContent>
          
          <TabsContent value="reporting">
            <ReportingView />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default MortgageManagement;
