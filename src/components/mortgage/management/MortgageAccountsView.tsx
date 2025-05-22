
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MortgageAccountStatus } from '@/types/mortgage-account';

// Mock data for development
const mockAccounts = [
  {
    id: 'mort-1234',
    mortgageNumber: 'MRT-001-2024',
    customerName: 'Ibrahim Ahmed',
    status: 'active' as MortgageAccountStatus,
    propertyAddress: '15 Ahmadu Bello Way, Lagos',
    financingType: 'ijarah',
    outstandingAmount: 45000000,
    monthlyPayment: 250000,
    nextPaymentDate: '2024-06-15',
    overdueDays: 0,
  },
  {
    id: 'mort-2345',
    mortgageNumber: 'MRT-002-2024',
    customerName: 'Aisha Mohammed',
    status: 'in_arrears' as MortgageAccountStatus,
    propertyAddress: '27 Broad Street, Lagos',
    financingType: 'diminishing_musharakah',
    outstandingAmount: 38750000,
    monthlyPayment: 215000,
    nextPaymentDate: '2024-06-01',
    overdueDays: 15,
  },
  {
    id: 'mort-3456',
    mortgageNumber: 'MRT-003-2024',
    customerName: 'Chinedu Okonkwo',
    status: 'restructured' as MortgageAccountStatus,
    propertyAddress: '8 Independence Ave, Abuja',
    financingType: 'conventional_fixed',
    outstandingAmount: 27500000,
    monthlyPayment: 185000,
    nextPaymentDate: '2024-06-10',
    overdueDays: 0,
  }
];

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
};

// Helper function to get status badge color
const getStatusColor = (status: MortgageAccountStatus) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'in_arrears':
      return 'bg-amber-100 text-amber-800';
    case 'default':
      return 'bg-red-100 text-red-800';
    case 'restructured':
      return 'bg-blue-100 text-blue-800';
    case 'suspended':
      return 'bg-gray-100 text-gray-800';
    case 'closed':
      return 'bg-slate-100 text-slate-800';
    case 'matured':
      return 'bg-purple-100 text-purple-800';
    case 'foreclosed':
      return 'bg-rose-100 text-rose-800';
    case 'transferred':
      return 'bg-cyan-100 text-cyan-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const MortgageAccountsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const navigate = useNavigate();
  
  const handleViewAccount = (accountId: string) => {
    navigate(`/mortgage-management/accounts/${accountId}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Mortgage Accounts</h2>
          <p className="text-muted-foreground">Manage and monitor all active mortgage accounts</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Account
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search accounts, customers, or properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="in_arrears">In Arrears</SelectItem>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="restructured">Restructured</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mortgage #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Property</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="text-right">Outstanding</TableHead>
              <TableHead className="hidden md:table-cell">Monthly Payment</TableHead>
              <TableHead className="hidden md:table-cell">Next Payment</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.mortgageNumber}</TableCell>
                <TableCell>{account.customerName}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(account.status)}>
                    {account.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px] truncate" title={account.propertyAddress}>
                  {account.propertyAddress}
                </TableCell>
                <TableCell className="hidden md:table-cell capitalize">
                  {account.financingType.replace('_', ' ')}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(account.outstandingAmount)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatCurrency(account.monthlyPayment)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(account.nextPaymentDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleViewAccount(account.id)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MortgageAccountsView;
