
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminMetricCards from '../role-dashboards/admin/AdminMetricCards';
import ApplicationsOverview from '../role-dashboards/admin/ApplicationsOverview';
import MortgageDistributionChart from '../role-dashboards/admin/MortgageDistributionChart';
import AdminActionCards from '../role-dashboards/admin/AdminActionCards';

interface AdminDashboardProps {
  region: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ region }) => {
  return (
    <div className="space-y-6">
      {/* Main KPIs */}
      <AdminMetricCards region={region} timeframe="monthly" />
      
      {/* Applications Overview */}
      <ApplicationsOverview region={region} />
      
      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mortgage Distribution */}
        <MortgageDistributionChart region={region} />
        
        {/* Quick Action Cards */}
        <AdminActionCards region={region} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Key operational indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Processing Time</span>
                <span className="text-sm font-medium text-green-600">12.3 days (Optimal)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Documentation Compliance</span>
                <span className="text-sm font-medium text-green-600">98.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Shariah Compliance</span>
                <span className="text-sm font-medium text-green-600">100%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Customer Satisfaction</span>
                <span className="text-sm font-medium text-amber-600">87% (Target: 90%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">System Uptime</span>
                <span className="text-sm font-medium text-green-600">99.98%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Strategic Goals Progress</CardTitle>
            <CardDescription>Annual targets and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Mortgage Portfolio Growth (Annual Target: 20%)</span>
                  <span className="text-sm font-medium">12.3% / 20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">New Customer Acquisition (Target: 500)</span>
                  <span className="text-sm font-medium">378 / 500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Default Reduction (Target: Below 3%)</span>
                  <span className="text-sm font-medium">3.8% / 3.0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Product Diversification (Target: 5 new products)</span>
                  <span className="text-sm font-medium">3 / 5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
