
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from '@/components/settings/GeneralSettings';
import UserManagement from '@/components/settings/UserManagement';
import ProductManagement from '@/components/settings/ProductManagement';
import SystemConfigurations from '@/components/settings/SystemConfigurations';

const Settings = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="nimms-heading">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage system settings and configurations
          </p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="products">Product Management</TabsTrigger>
            <TabsTrigger value="system">System Configurations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>
          
          <TabsContent value="system">
            <SystemConfigurations />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Settings;
