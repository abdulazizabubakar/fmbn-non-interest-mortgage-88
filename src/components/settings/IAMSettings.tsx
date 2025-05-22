
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RoleManagement from './iam/RoleManagement';
import PermissionManagement from './iam/PermissionManagement';
import AccessControl from './iam/AccessControl';
import UserVerification from './iam/UserVerification';
import UserRoleAssignment from './iam/UserRoleAssignment';
import { RoleBasedAccess } from '@/components/auth/RoleBasedAccess';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';

const IAMSettings = () => {
  const [activeTab, setActiveTab] = useState('roles');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Identity and Access Management</CardTitle>
        <CardDescription>
          Manage user roles, permissions, and access control
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RoleBasedAccess 
          requiredRoles={['super_admin', 'admin']}
          fallback={
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Access Denied</AlertTitle>
              <AlertDescription>
                You do not have permission to access Identity and Access Management settings.
                Please contact your system administrator for assistance.
              </AlertDescription>
            </Alert>
          }
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="roles">Roles</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="user-roles">User Roles</TabsTrigger>
              <TabsTrigger value="access">Access Control</TabsTrigger>
              <TabsTrigger value="verification">User Verification</TabsTrigger>
            </TabsList>
            
            <TabsContent value="roles">
              <RoleManagement />
            </TabsContent>
            
            <TabsContent value="permissions">
              <PermissionManagement />
            </TabsContent>
            
            <TabsContent value="user-roles">
              <UserRoleAssignment />
            </TabsContent>
            
            <TabsContent value="access">
              <AccessControl />
            </TabsContent>
            
            <TabsContent value="verification">
              <UserVerification />
            </TabsContent>
          </Tabs>
        </RoleBasedAccess>
      </CardContent>
    </Card>
  );
};

export default IAMSettings;
