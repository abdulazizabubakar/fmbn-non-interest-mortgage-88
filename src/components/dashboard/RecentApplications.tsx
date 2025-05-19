
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockMortgages } from '@/data/mockData';
import { Mortgage } from '@/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const getStatusBadgeVariant = (status: Mortgage['status']) => {
  switch (status) {
    case 'approved':
      return 'outline';
    case 'active':
      return 'default';
    case 'draft':
      return 'secondary';
    case 'pending-review':
      return 'secondary';
    case 'under-assessment':
      return 'outline';
    case 'completed':
      return 'default';
    case 'rejected':
      return 'destructive';
    case 'cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);
};

const RecentApplications: React.FC = () => {
  // Get the 5 most recent mortgages based on creation date
  const recentMortgages = [...mockMortgages]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-2 py-3 text-left font-medium text-muted-foreground">ID</th>
                <th className="px-2 py-3 text-left font-medium text-muted-foreground">Customer</th>
                <th className="px-2 py-3 text-left font-medium text-muted-foreground">Type</th>
                <th className="px-2 py-3 text-left font-medium text-muted-foreground">Amount</th>
                <th className="px-2 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-2 py-3 text-left font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentMortgages.map((mortgage) => (
                <tr key={mortgage.id} className="border-b hover:bg-muted/50">
                  <td className="px-2 py-3 font-medium">{mortgage.id}</td>
                  <td className="px-2 py-3">{mortgage.customerName}</td>
                  <td className="px-2 py-3 capitalize">{mortgage.financingType}</td>
                  <td className="px-2 py-3">{formatCurrency(mortgage.amount)}</td>
                  <td className="px-2 py-3">
                    <Badge variant={getStatusBadgeVariant(mortgage.status)} className="capitalize">
                      {mortgage.status.replace('-', ' ')}
                    </Badge>
                  </td>
                  <td className="px-2 py-3 text-muted-foreground">
                    {format(new Date(mortgage.createdAt), 'MMM dd, yyyy')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentApplications;
