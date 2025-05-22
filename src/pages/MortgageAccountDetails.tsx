
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Wallet, Clock, AlertCircle, Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AccountOverview from '@/components/mortgage/management/AccountOverview';
import PaymentSchedule from '@/components/mortgage/management/PaymentSchedule';
import AccountDocuments from '@/components/mortgage/management/AccountDocuments';
import AccountModifications from '@/components/mortgage/management/AccountModifications';
import { Badge } from '@/components/ui/badge';
import { MortgageAccount, MortgageAccountStatus } from '@/types/mortgage-account';

// Mock data for development
const mockAccount: MortgageAccount = {
  id: 'mort-1234',
  mortgageNumber: 'MRT-001-2024',
  customerId: 'cust-001',
  customerName: 'Ibrahim Ahmed',
  propertyId: 'prop-001',
  propertyAddress: '15 Ahmadu Bello Way, Lagos',
  financingType: 'ijara', // Fixed: Changed from 'ijarah' to 'ijara' to match FinancingType
  status: 'active',
  creationDate: '2023-12-15',
  activationDate: '2024-01-10',
  maturityDate: '2039-01-10',
  lastUpdated: '2024-05-15',
  principalAmount: 50000000,
  equityContribution: 10000000,
  equityPercentage: 20,
  monthlyPayment: 250000,
  totalPayable: 90000000,
  rentRate: 8.5,
  tenor: 180,
  graceMonths: 1,
  scheduleType: 'fixed',
  paymentDay: 10,
  totalScheduleItems: 180,
  completedPayments: 4,
  nextPaymentDate: '2024-06-10',
  nextPaymentAmount: 250000,
  outstandingPrincipal: 45000000,
  outstandingRent: 38250000,
  currentBalance: 83250000,
  overdueDays: 0,
  overduePrincipal: 0,
  overdueProfitRent: 0,
  penalties: 0,
  ownershipPercentage: 20,
  transferEligible: false,
  notes: [
    "Customer requested statement of account on 2024-05-10",
    "Monthly payment increased by ₦15,000 after rent adjustment on 2024-04-01"
  ],
  tags: ['vip', 'govt-employee'],
  flags: []
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

const MortgageAccountDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [account, setAccount] = useState<MortgageAccount | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch the account data from an API
    setLoading(true);
    setTimeout(() => {
      setAccount(mockAccount);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleBackClick = () => {
    navigate('/mortgage-management');
  };
  
  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={handleBackClick}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="h-[400px] flex items-center justify-center">
          <p>Loading account details...</p>
        </div>
      </PageContainer>
    );
  }
  
  if (!account) {
    return (
      <PageContainer>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={handleBackClick}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="h-[400px] flex items-center justify-center">
          <p>Account not found</p>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={handleBackClick}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Mortgage Account Details</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">{account.mortgageNumber}</h2>
            <div className="flex items-center space-x-2 mb-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{account.customerName}</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span>
                {account.financingType.charAt(0).toUpperCase() + account.financingType.slice(1).replace('_', ' ')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Started {new Date(account.activationDate as string).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Status</h3>
              <Badge variant="outline" className={getStatusColor(account.status)}>
                {account.status.replace('_', ' ')}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Next Payment</p>
                <p className="font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  {new Date(account.nextPaymentDate as string).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Payment Amount</p>
                <p className="font-medium flex items-center">
                  <Wallet className="h-4 w-4 mr-1 text-muted-foreground" />
                  {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(account.monthlyPayment)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Outstanding Principal</p>
                <p className="font-medium">
                  {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(account.outstandingPrincipal)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Payments Made</p>
                <p className="font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  {account.completedPayments} of {account.totalScheduleItems}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="modifications">Modifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <AccountOverview account={account} />
          </TabsContent>
          
          <TabsContent value="schedule">
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
