
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AdminDashboard from './roles/AdminDashboard';
import ZonalDashboard from './roles/ZonalDashboard';
import FinanceDashboard from './roles/FinanceDashboard';
import LegalDashboard from './roles/LegalDashboard';
import DeveloperDashboard from './roles/DeveloperDashboard';
import CustomerDashboard from './roles/CustomerDashboard';

interface RoleDashboardProps {
  userRole: string;
  region?: string;
}

const RoleDashboard: React.FC<RoleDashboardProps> = ({ userRole, region }) => {
  // Render appropriate dashboard based on role
  const renderDashboard = () => {
    switch (userRole) {
      case 'admin':
      case 'super_admin':
        return <AdminDashboard region={region || 'Global'} />;
      case 'zonal_admin':
      case 'officer':
        return <ZonalDashboard region={region} />;
      case 'finance_officer':
      case 'treasury_officer':
        return <FinanceDashboard region={region} />;
      case 'legal_officer':
        return <LegalDashboard region={region} />;
      case 'developer':
        return <DeveloperDashboard />;
      case 'customer':
      case 'lessee':
        return <CustomerDashboard />;
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Welcome to NIMMS Dashboard</CardTitle>
              <CardDescription>
                Non-Interest Mortgage Management System - Performance Overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Please select a section from below to view detailed information.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return <div>{renderDashboard()}</div>;
};

export default RoleDashboard;
