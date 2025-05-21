
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RoleManagement from './iam/RoleManagement';
import PermissionManagement from './iam/PermissionManagement';
import AccessControl from './iam/AccessControl';

const IAMSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Identity and Access Management</CardTitle>
        <CardDescription>
          Manage user roles, permissions, and access control
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="roles" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="access">Access Control</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roles">
            <RoleManagement />
          </TabsContent>
          
          <TabsContent value="permissions">
            <PermissionManagement />
          </TabsContent>
          
          <TabsContent value="access">
            <AccessControl />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IAMSettings;
