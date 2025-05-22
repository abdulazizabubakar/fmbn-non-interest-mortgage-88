import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardKPIs from './DashboardKPIs';
import ActionShortcuts from './ActionShortcuts';
import { RoleBasedAccess } from '@/components/auth/RoleBasedAccess';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface DashboardModuleProps {
  userRole: string | null;
  userRegion?: string;
}

const DashboardModule: React.FC<DashboardModuleProps> = ({ 
  userRole,
  userRegion = 'Global'
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="nimms-heading">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the NIMMS Dashboard - {userRegion} Region
        </p>
      </div>

      <DashboardKPIs userRole={userRole || 'viewer'} region={userRegion} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ActionShortcuts userRole={userRole || undefined} />
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No recent activity to display.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <RoleBasedAccess
        requiredRoles={['admin', 'manager', 'finance_officer', 'treasury_officer']}
        fallback={null}
      >
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="collections">
              <TabsList>
                <TabsTrigger value="collections">Collections</TabsTrigger>
                <TabsTrigger value="disbursements">Disbursements</TabsTrigger>
                <TabsTrigger value="projections">Projections</TabsTrigger>
              </TabsList>
              <TabsContent value="collections" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Collection data visualization will appear here.
                </p>
              </TabsContent>
              <TabsContent value="disbursements" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Disbursement data visualization will appear here.
                </p>
              </TabsContent>
              <TabsContent value="projections" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Financial projections will appear here.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </RoleBasedAccess>
    </div>
  );
};

export default DashboardModule;
