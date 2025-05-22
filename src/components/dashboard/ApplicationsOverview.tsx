
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ApplicationsOverviewProps {
  detailed?: boolean;
}

const ApplicationsOverview: React.FC<ApplicationsOverviewProps> = ({ detailed = false }) => {
  // Mock data
  const applicationsByStatus = [
    { name: 'Draft', value: 42, fill: '#E5E5E5' },
    { name: 'Submitted', value: 58, fill: '#93C5FD' },
    { name: 'In Review', value: 34, fill: '#60A5FA' },
    { name: 'Approved', value: 45, fill: '#34D399' },
    { name: 'Rejected', value: 12, fill: '#F87171' },
  ];

  const recentApplications = [
    { id: 'APP-2023', customer: 'Mohammed Ibrahim', date: '2024-05-20', amount: 25000000, status: 'submitted' },
    { id: 'APP-2022', customer: 'Fatima Aliyu', date: '2024-05-19', amount: 18500000, status: 'in_review' },
    { id: 'APP-2021', customer: 'John Okafor', date: '2024-05-18', amount: 32000000, status: 'approved' },
    { id: 'APP-2020', customer: 'Sarah Ahmed', date: '2024-05-16', amount: 15700000, status: 'rejected' },
  ];

  // Application trend data (monthly)
  const applicationTrend = [
    { month: 'Jan', submitted: 32, approved: 22, rejected: 5 },
    { month: 'Feb', submitted: 40, approved: 30, rejected: 8 },
    { month: 'Mar', submitted: 45, approved: 25, rejected: 12 },
    { month: 'Apr', submitted: 50, approved: 35, rejected: 10 },
    { month: 'May', submitted: 58, approved: 42, rejected: 12 },
    { month: 'Jun', submitted: 48, approved: 38, rejected: 8 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_review':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className={detailed ? '' : 'col-span-1'}>
      <CardHeader>
        <CardTitle>Application Status</CardTitle>
        <CardDescription>Overview of mortgage application submissions and approvals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {detailed && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3">Application Trend</h4>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  submitted: { label: "Submitted", color: "#60A5FA" },
                  approved: { label: "Approved", color: "#34D399" },
                  rejected: { label: "Rejected", color: "#F87171" },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={applicationTrend} 
                    margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      content={(props) => 
                        <ChartTooltipContent 
                          {...props} 
                          formatter={(value) => [value, "Applications"]} 
                        />
                      }
                    />
                    <Legend />
                    <Bar dataKey="submitted" fill="#60A5FA" name="Submitted" />
                    <Bar dataKey="approved" fill="#34D399" name="Approved" />
                    <Bar dataKey="rejected" fill="#F87171" name="Rejected" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold mb-3">Applications by Status</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={applicationsByStatus} 
                  layout="vertical" 
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip 
                    formatter={(value) => [`${value} Applications`, 'Count']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="value" background={{ fill: '#f5f5f5' }}>
                    {applicationsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Recent Applications</h4>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.id}</TableCell>
                      <TableCell>{application.customer}</TableCell>
                      <TableCell>{formatCurrency(application.amount)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(application.status)}>
                          {application.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {detailed && (
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm">
              View All Applications <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationsOverview;
