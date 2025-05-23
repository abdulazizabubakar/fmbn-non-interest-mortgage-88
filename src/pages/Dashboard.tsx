
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import DashboardModule from '@/components/dashboard/DashboardModule';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  // Use actual user role from auth context if available
  const { user } = useAuth();
  
  // For demo purposes, allow role selection to test different dashboards
  const [role, setRole] = useState<string>(user?.roles[0] || 'admin');
  const [region, setRegion] = useState<string>(user?.region || 'All Regions');
  
  return (
    <PageContainer>
      {/* Demo controls for role selection - only visible in development mode */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Demo Controls</CardTitle>
            <CardDescription className="text-xs">Select a role to view different dashboards</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-4">
              <div className="w-64">
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="finance_officer">Finance Officer</SelectItem>
                    <SelectItem value="legal_officer">Legal Officer</SelectItem>
                    <SelectItem value="zonal_admin">Zonal Officer</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="customer">Customer/Lessee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(role === 'zonal_admin') && (
                <div className="w-64">
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Regions">All Regions</SelectItem>
                      <SelectItem value="North Central">North Central</SelectItem>
                      <SelectItem value="North East">North East</SelectItem>
                      <SelectItem value="North West">North West</SelectItem>
                      <SelectItem value="South East">South East</SelectItem>
                      <SelectItem value="South South">South South</SelectItem>
                      <SelectItem value="South West">South West</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      <DashboardModule 
        userRole={role} 
        userRegion={role === 'zonal_admin' ? region : undefined} 
      />
    </PageContainer>
  );
};

export default Dashboard;
