
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, AlertTriangle, FileText, Bell, Calendar, Plus } from 'lucide-react';
import { mockMortgageAccounts } from '@/data/mockMortgageAccounts';
import { MortgageAccount } from '@/types/mortgage-account';
import { toast } from 'sonner';

const DefaultManagementView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter accounts based on status for defaults and arrears
  const defaultAccounts = mockMortgageAccounts.filter(acc => acc.status === 'default');
  const inArrearsAccounts = mockMortgageAccounts.filter(acc => acc.status === 'in_arrears');
  
  // Combined accounts with issues
  const allProblemAccounts = [...defaultAccounts, ...inArrearsAccounts];
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Function to get the appropriate accounts based on the active tab
  const getFilteredAccounts = () => {
    let accounts: MortgageAccount[];
    
    switch(activeTab) {
      case 'defaults':
        accounts = defaultAccounts;
        break;
      case 'arrears':
        accounts = inArrearsAccounts;
        break;
      case 'all':
      default:
        accounts = allProblemAccounts;
        break;
    }
    
    // Apply search filter
    return accounts.filter(acc => 
      acc.mortgageNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  const handleCreateCaseClick = (account: MortgageAccount) => {
    toast.success(`Creating default case for ${account.mortgageNumber}`);
  };
  
  const handleSendNotice = (account: MortgageAccount) => {
    toast.success(`Sending notice to ${account.customerName}`);
  };
  
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Accounts in Default</p>
                <p className="text-2xl font-bold">{defaultAccounts.length}</p>
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
                <p className="text-sm text-muted-foreground">Accounts in Arrears</p>
                <p className="text-2xl font-bold">{inArrearsAccounts.length}</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <Bell className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Overdue Amount</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    allProblemAccounts.reduce((total, acc) => total + acc.overduePrincipal + acc.overdueProfitRent, 0)
                  )}
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Card */}
      <Card>
        <CardHeader>
          <CardTitle>Default Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Default Case
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="all">All Issues ({allProblemAccounts.length})</TabsTrigger>
              <TabsTrigger value="defaults">Defaults ({defaultAccounts.length})</TabsTrigger>
              <TabsTrigger value="arrears">In Arrears ({inArrearsAccounts.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {renderAccounts(getFilteredAccounts(), handleCreateCaseClick, handleSendNotice)}
            </TabsContent>
            
            <TabsContent value="defaults" className="space-y-4">
              {renderAccounts(getFilteredAccounts(), handleCreateCaseClick, handleSendNotice)}
            </TabsContent>
            
            <TabsContent value="arrears" className="space-y-4">
              {renderAccounts(getFilteredAccounts(), handleCreateCaseClick, handleSendNotice)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to render accounts
function renderAccounts(
  accounts: MortgageAccount[], 
  handleCreateCaseClick: (account: MortgageAccount) => void,
  handleSendNotice: (account: MortgageAccount) => void
) {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Get the badge for an account
  const getStatusBadge = (account: MortgageAccount) => {
    if (account.status === 'default') {
      return <Badge variant="destructive">Default</Badge>;
    } else if (account.status === 'in_arrears') {
      return <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300">In Arrears</Badge>;
    }
    return null;
  };
  
  if (accounts.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium">No accounts found</h3>
        <p className="mt-1">There are no accounts matching your search criteria.</p>
      </div>
    );
  }
  
  return accounts.map(account => (
    <Card key={account.id} className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{account.mortgageNumber}</h3>
              {getStatusBadge(account)}
              <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                {account.overdueDays} days overdue
              </Badge>
            </div>
            
            <p className="text-sm">
              <span className="text-muted-foreground">Customer:</span> {account.customerName}
            </p>
            
            <p className="text-sm">
              <span className="text-muted-foreground">Overdue Amount:</span>{' '}
              <span className="font-medium text-red-600">
                {formatCurrency(account.overduePrincipal + account.overdueProfitRent)}
              </span>
              {account.penalties > 0 && (
                <> + {formatCurrency(account.penalties)} penalties</>
              )}
            </p>
            
            <p className="text-sm">
              <span className="text-muted-foreground">Missed Payments:</span>{' '}
              <span className="font-medium">
                {Math.ceil(account.overduePrincipal / account.monthlyPayment)}
              </span>
            </p>
          </div>
          
          <div className="shrink-0 space-y-2 flex flex-col">
            <Button 
              variant={account.status === 'default' ? 'outline' : 'default'} 
              size="sm"
              onClick={() => handleCreateCaseClick(account)}
              disabled={account.status === 'default'}
            >
              <FileText className="h-3.5 w-3.5 mr-1" />
              {account.status === 'default' ? 'Case Created' : 'Create Case'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleSendNotice(account)}
            >
              <Bell className="h-3.5 w-3.5 mr-1" />
              Send Notice
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  ));
}

export default DefaultManagementView;
