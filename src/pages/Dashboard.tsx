
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import DashboardModule from '@/components/dashboard/DashboardModule';

// Simulating user role and region - in a real app, these would come from auth context
const Dashboard = () => {
  // For demo purposes, let's have a role selector to test different dashboards
  const [role, setRole] = useState<string>('admin');
  const [region, setRegion] = useState<string>('All Regions');
  
  return (
    <PageContainer>
      {/* Hidden role selector - only for demonstration */}
      <div className="mb-6 p-3 bg-muted rounded-lg">
        <p className="text-sm font-medium mb-2">Demo Controls (select a role to view different dashboards)</p>
        <div className="flex flex-wrap gap-2">
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-3 py-1 text-sm rounded border"
          >
            <option value="admin">Admin</option>
            <option value="finance">Finance Officer</option>
            <option value="legal">Legal Officer</option>
            <option value="zonal">Zonal Officer</option>
            <option value="developer">Developer</option>
            <option value="customer">Customer</option>
          </select>
          
          {role === 'zonal' && (
            <select 
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="px-3 py-1 text-sm rounded border"
            >
              <option value="All Regions">All Regions</option>
              <option value="North Central">North Central</option>
              <option value="North East">North East</option>
              <option value="North West">North West</option>
              <option value="South East">South East</option>
              <option value="South South">South South</option>
              <option value="South West">South West</option>
            </select>
          )}
        </div>
      </div>
      
      <DashboardModule 
        userRole={role as any} 
        userRegion={role === 'zonal' ? region : undefined} 
      />
    </PageContainer>
  );
};

export default Dashboard;
