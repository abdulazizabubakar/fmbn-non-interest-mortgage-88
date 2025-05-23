
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface ZonalDashboardProps {
  region?: string;
}

const ZonalDashboard: React.FC<ZonalDashboardProps> = ({ region = 'North Central' }) => {
  // Mock data for regional applications
  const applicationData = [
    { month: 'Jan', applications: 35, approvals: 28, disbursements: 22 },
    { month: 'Feb', applications: 42, approvals: 30, disbursements: 25 },
    { month: 'Mar', applications: 48, approvals: 36, disbursements: 30 },
    { month: 'Apr', applications: 52, approvals: 40, disbursements: 32 },
    { month: 'May', applications: 58, approvals: 44, disbursements: 38 },
    { month: 'Jun', applications: 62, approvals: 46, disbursements: 40 },
  ];

  // Mock data for property status
  const propertyData = [
    { name: 'Available', value: 35, color: '#10B981' },
    { name: 'Reserved', value: 45, color: '#3B82F6' },
    { name: 'Occupied', value: 120, color: '#6366F1' },
    { name: 'Under Construction', value: 25, color: '#F59E0B' },
  ];

  // Mock data for payment collection
  const paymentData = [
    { name: 'On Time', value: 82, color: '#10B981' },
    { name: '1-30 Days Late', value: 12, color: '#F59E0B' },
    { name: '31-90 Days Late', value: 5, color: '#EF4444' },
    { name: '90+ Days Late', value: 1, color: '#7F1D1D' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{region} Region Dashboard</CardTitle>
          <CardDescription>Performance metrics for your regional operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Active Leases</p>
              <p className="text-2xl font-bold">287</p>
              <p className="text-xs text-green-600">↑ 4.2% from last month</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Collection Rate</p>
              <p className="text-2xl font-bold">94.3%</p>
              <p className="text-xs text-green-600">↑ 1.5% from last month</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Properties</p>
              <p className="text-2xl font-bold">225</p>
              <p className="text-xs text-blue-600">+12 new this month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Applications Trend</CardTitle>
            <CardDescription>Monthly applications, approvals and disbursements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={applicationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="applications" fill="#3B82F6" name="Applications" />
                  <Bar dataKey="approvals" fill="#10B981" name="Approvals" />
                  <Bar dataKey="disbursements" fill="#6366F1" name="Disbursements" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Regional Metrics</CardTitle>
              <CardDescription>Property status and payment collection</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold mb-4 text-center">Property Status</h4>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={propertyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {propertyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-4 text-center">Payment Collection</h4>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={paymentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ZonalDashboard;
