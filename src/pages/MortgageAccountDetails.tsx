
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Home, 
  FileText, 
  AlertTriangle,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockMortgageAccounts } from '@/data/mockMortgageAccounts';
import { MortgageAccount, MortgageAccountStatus } from '@/types/mortgage-account';

// Import the tab components (to be created)
import AccountOverview from '@/components/mortgage/management/AccountOverview';
import PaymentSchedule from '@/components/mortgage/management/PaymentSchedule';
import AccountDocuments from '@/components/mortgage/management/AccountDocuments';
import AccountModifications from '@/components/mortgage/management/AccountModifications';

const MortgageAccountDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the mortgage account with the matching ID
  const account = mockMortgageAccounts.find(acc => acc.id === id);
  
  if (!account) {
    return (
      <PageContainer>
        <div className="py-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Mortgage Account Not Found</h2>
          <p className="mb-6">The mortgage account you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/mortgage-management">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Mortgage Management
            </Link>
          </Button>
        </div>
      </PageContainer>
    );
  }
  
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
  
  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header section */}
        <div>
          <div className="flex items-center mb-4">
            <Button variant="ghost" className="mr-2 p-0" asChild>
              <Link to="/mortgage-management">
                <ArrowLeft className="h-4 w-4 mr-1" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              {account.mortgageNumber}
            </h1>
            <div className="ml-4">{getStatusBadge(account.status)}</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-4">
              <User className="h-10 w-10 text-muted-foreground bg-muted p-2 rounded" />
              <div>
                <h2 className="font-medium">{account.customerName}</h2>
                <p className="text-sm text-muted-foreground">Customer ID: {account.customerId}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Home className="h-10 w-10 text-muted-foreground bg-muted p-2 rounded" />
              <div>
                <h2 className="font-medium">Property</h2>
                <p className="text-sm text-muted-foreground">{account.propertyAddress}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Principal Amount</p>
              <p className="text-lg font-bold">{formatCurrency(account.principalAmount)}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Outstanding Balance</p>
              <p className="text-lg font-bold">{formatCurrency(account.currentBalance)}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Monthly Payment</p>
              <p className="text-lg font-bold">{formatCurrency(account.monthlyPayment)}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Next Payment</p>
              <p className="text-lg font-bold">{account.nextPaymentDate ? formatDate(account.nextPaymentDate) : "N/A"}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Payments Made</p>
              <p className="text-lg font-bold">{account.completedPayments} / {account.totalScheduleItems}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Maturity Date</p>
              <p className="text-lg font-bold">{formatDate(account.maturityDate)}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button>Record Payment</Button>
          <Button variant="outline">Generate Statement</Button>
          <Button variant="outline">Download Contract</Button>
          {account.status === 'active' && (
            <Button variant="outline" className="text-red-600 hover:bg-red-50">Flag for Default</Button>
          )}
        </div>
        
        {/* Alert for accounts in trouble */}
        {(account.status === 'in_arrears' || account.status === 'default') && (
          <Card className={`${account.status === 'default' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
            <CardContent className="p-4 flex items-center space-x-3">
              <AlertTriangle className={`h-5 w-5 ${account.status === 'default' ? 'text-red-500' : 'text-amber-500'}`} />
              <div>
                <p className="font-medium">
                  {account.status === 'default' ? 'Account in Default' : 'Account in Arrears'}
                </p>
                <p className="text-sm">
                  {account.status === 'default' 
                    ? `This account is ${account.overdueDays} days overdue with ${formatCurrency(account.overduePrincipal)} outstanding.`
                    : `This account has missed a recent payment. Total overdue: ${formatCurrency(account.overduePrincipal)}`
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Maturity/Transfer eligible alert */}
        {account.transferEligible && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Eligible for Ownership Transfer</p>
                <p className="text-sm">
                  This mortgage has been fully paid and is eligible for ownership transfer to the customer.
                </p>
              </div>
              <Button className="ml-auto" size="sm">
                Start Transfer Process
              </Button>
            </CardContent>
          </Card>
        )}
        
        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payment Schedule</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="modifications">Modifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <AccountOverview account={account} />
          </TabsContent>
          
          <TabsContent value="payments">
            <PaymentSchedule account={account} />
          </TabsContent>
          
          <TabsContent value="documents">
            <AccountDocuments account={account} />
          </TabsContent>
          
          <TabsContent value="modifications">
            <AccountModifications account={account} />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default MortgageAccountDetails;
