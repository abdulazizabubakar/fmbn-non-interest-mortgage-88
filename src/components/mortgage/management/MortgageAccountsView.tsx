
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, Calendar, AlertTriangle, Banknote, User } from 'lucide-react';
import { MortgageAccount, MortgageAccountStatus } from '@/types/mortgage-account';
import { mockMortgageAccounts } from '@/data/mockMortgageAccounts';
import { toast } from 'sonner';

const MortgageAccountsView: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Function to get badge styling based on account status
  const getStatusBadge = (status: MortgageAccountStatus) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'in_arrears':
        return <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300">In Arrears</Badge>;
      case 'default':
        return <Badge variant="destructive">Default</Badge>;
      case 'restructured':
        return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-300">Restructured</Badge>;
      case 'suspended':
        return <Badge variant="secondary">Suspended</Badge>;
      case 'closed':
        return <Badge variant="outline">Closed</Badge>;
      case 'matured':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Matured</Badge>;
      case 'foreclosed':
        return <Badge variant="destructive">Foreclosed</Badge>;
      case 'transferred':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Transferred</Badge>;
      default:
        return <Badge variant="outline">{status.replace('_', ' ')}</Badge>;
    }
  };
  
  // Format currency amount
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Filter accounts based on search term, status, and type
  const filteredAccounts = mockMortgageAccounts.filter(account => {
    const matchesSearch = 
      account.mortgageNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || account.status === statusFilter;
    const matchesType = typeFilter === 'all' || account.financingType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Handle viewing account details
  const handleViewAccount = (accountId: string) => {
    navigate(`/mortgage-management/accounts/${accountId}`);
  };
  
  // Handle quick payment
  const handleQuickPayment = (account: MortgageAccount, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`Recording payment for ${account.mortgageNumber}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Mortgage Accounts</h2>
          <p className="text-muted-foreground">Manage and track active mortgage accounts</p>
        </div>
        <Button>
          + New Account
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Active Accounts</p>
                <p className="text-2xl font-bold">{mockMortgageAccounts.filter(a => a.status === 'active').length}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <User className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">In Default</p>
                <p className="text-2xl font-bold">{mockMortgageAccounts.filter(a => a.status === 'default').length}</p>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Collected (MTD)</p>
                <p className="text-2xl font-bold">₦42.5M</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Banknote className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Due This Month</p>
                <p className="text-2xl font-bold">₦18.2M</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by account number, customer, or property..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex space-x-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="in_arrears">In Arrears</SelectItem>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="restructured">Restructured</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="matured">Matured</SelectItem>
              <SelectItem value="transferred">Transferred</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="ijara">Ijara</SelectItem>
              <SelectItem value="murabaha">Murabaha</SelectItem>
              <SelectItem value="musharaka">Musharaka</SelectItem>
              <SelectItem value="istisna">Istisna</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAccounts.map(account => (
          <Card 
            key={account.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleViewAccount(account.id)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <h3 className="font-medium">{account.mortgageNumber}</h3>
                    {getStatusBadge(account.status)}
                  </div>
                  
                  <p className="text-sm">
                    <span className="text-muted-foreground">Customer:</span> {account.customerName}
                  </p>
                  
                  <p className="text-sm">
                    <span className="text-muted-foreground">Property:</span> {account.propertyAddress}
                  </p>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Type:</span>{' '}
                      <span className="font-medium capitalize">{account.financingType}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Principal:</span>{' '}
                      <span className="font-medium">{formatCurrency(account.principalAmount)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Monthly Payment:</span>{' '}
                      <span className="font-medium">{formatCurrency(account.monthlyPayment)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Maturity:</span>{' '}
                      <span className="font-medium">{formatDate(account.maturityDate)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="shrink-0 flex flex-col gap-2 justify-center">
                  {account.status !== 'matured' && account.status !== 'transferred' && account.status !== 'closed' && (
                    <div>
                      <p className="text-sm text-muted-foreground">Next Payment:</p>
                      <p className="font-medium">
                        {account.nextPaymentAmount ? formatCurrency(account.nextPaymentAmount) : 'N/A'} 
                        {account.nextPaymentDate && (
                          <span className="text-xs text-muted-foreground ml-1">
                            ({formatDate(account.nextPaymentDate)})
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Button>
                    {(account.status === 'active' || account.status === 'in_arrears') && (
                      <Button 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={(e) => handleQuickPayment(account, e)}
                      >
                        <Banknote className="h-3.5 w-3.5" />
                        Record Payment
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredAccounts.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No mortgage accounts found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your filters or search to find what you're looking for.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MortgageAccountsView;
