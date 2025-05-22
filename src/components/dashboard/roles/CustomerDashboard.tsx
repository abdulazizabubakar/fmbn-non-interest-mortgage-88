
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Home, 
  FileText, 
  Bell, 
  CalendarClock,
  Download,
  ArrowRight
} from 'lucide-react';

// Customer Dashboard focuses on their individual mortgage and payments
const CustomerDashboard: React.FC = () => {
  // Mock data for a customer's mortgage
  const mortgageDetails = {
    accountNumber: 'FMBN-123456',
    propertyAddress: '15 Ahmadu Bello Way, Victoria Island, Lagos',
    financingType: 'Ijarah (Lease)',
    startDate: '2022-08-15',
    tenor: 20, // years
    monthlyPayment: 145000,
    nextPaymentDate: '2025-06-10',
    outstandingBalance: 21850000,
    originalAmount: 25000000,
    ownershipPercentage: 12.6,
  };

  // Mock payment history
  const paymentHistory = [
    { date: '2025-05-10', amount: 145000, status: 'paid', method: 'Bank Transfer' },
    { date: '2025-04-10', amount: 145000, status: 'paid', method: 'Direct Debit' },
    { date: '2025-03-10', amount: 145000, status: 'paid', method: 'Online' },
    { date: '2025-02-10', amount: 145000, status: 'paid', method: 'Direct Debit' }
  ];

  // Mock upcoming payments
  const upcomingPayments = [
    { dueDate: '2025-06-10', amount: 145000 },
    { dueDate: '2025-07-10', amount: 145000 },
    { dueDate: '2025-08-10', amount: 145000 }
  ];

  // Mock documents
  const documents = [
    { id: 'DOC-2346', name: 'Lease Agreement', date: '2022-08-15', status: 'verified' },
    { id: 'DOC-2347', name: 'Property Insurance', date: '2024-09-01', status: 'verified' },
    { id: 'DOC-2348', name: 'Annual Statement', date: '2024-01-10', status: 'available' },
    { id: 'DOC-2349', name: 'Payment Certificate', date: '2025-05-12', status: 'available' }
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Calculate remaining tenor in years and months
  const calculateRemainingTenor = () => {
    const startDate = new Date(mortgageDetails.startDate);
    const endDate = new Date(startDate);
    endDate.setFullYear(startDate.getFullYear() + mortgageDetails.tenor);
    
    const now = new Date();
    const diffTime = Math.abs(endDate.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    return `${years} years, ${months} months`;
  };

  return (
    <div className="space-y-6">
      {/* Mortgage Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Your Mortgage Overview</CardTitle>
          <CardDescription>Account: {mortgageDetails.accountNumber}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Property</p>
                <div className="flex items-start gap-2">
                  <Home className="h-4 w-4 mt-1 text-muted-foreground" />
                  <p>{mortgageDetails.propertyAddress}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Financing Type</p>
                  <p>{mortgageDetails.financingType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                  <p>{formatDate(mortgageDetails.startDate)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Original Amount</p>
                  <p>{formatCurrency(mortgageDetails.originalAmount)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Monthly Payment</p>
                  <p>{formatCurrency(mortgageDetails.monthlyPayment)}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Outstanding Balance</p>
                  <p className="text-sm font-medium">{formatCurrency(mortgageDetails.outstandingBalance)}</p>
                </div>
                <Progress 
                  value={100 - (mortgageDetails.outstandingBalance / mortgageDetails.originalAmount * 100)} 
                  className="h-2" 
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Paid: {formatCurrency(mortgageDetails.originalAmount - mortgageDetails.outstandingBalance)}</span>
                  <span>Original: {formatCurrency(mortgageDetails.originalAmount)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Ownership Progression</p>
                  <p className="text-sm font-medium">{mortgageDetails.ownershipPercentage}%</p>
                </div>
                <Progress value={mortgageDetails.ownershipPercentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Remaining Tenor: {calculateRemainingTenor()}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg mt-4">
                <CalendarClock className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Next Payment Due</p>
                  <div className="flex justify-between items-baseline">
                    <p>{formatDate(mortgageDetails.nextPaymentDate)}</p>
                    <p className="font-bold">{formatCurrency(mortgageDetails.monthlyPayment)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity and Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment History */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Your payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(payment.date)}</TableCell>
                    <TableCell>{formatCurrency(payment.amount)}</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Paid
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                View All Payments <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Documents */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Documents</CardTitle>
            <CardDescription>Important documents related to your mortgage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(doc.date)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                Document Center <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Payments and Support */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>Scheduled payments for the next 3 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map((payment, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Bell className={`h-5 w-5 ${index === 0 ? 'text-amber-500' : 'text-muted-foreground'}`} />
                    <div>
                      <p className="text-sm font-medium">{formatDate(payment.dueDate)}</p>
                      <p className="text-xs text-muted-foreground">
                        {index === 0 ? 'Due Soon' : `Due in ${index + 1} month${index > 0 ? 's' : ''}`}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{formatCurrency(payment.amount)}</p>
                    {index === 0 && (
                      <Button size="sm" variant="outline" className="mt-2">
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Analysis</CardTitle>
            <CardDescription>Your payment breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex justify-center items-center">
              <div className="text-center">
                <BarChart className="h-12 w-12 mx-auto text-blue-600" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Payment analytics will provide insights about your mortgage repayment
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  View Analytics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;
