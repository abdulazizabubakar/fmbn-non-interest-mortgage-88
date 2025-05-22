
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, ArrowRight, FileCheck, Users, Clock } from 'lucide-react';
import { mockMortgageAccounts } from '@/data/mockMortgageAccounts';
import { toast } from 'sonner';

const OwnershipTransferView: React.FC = () => {
  // Get accounts eligible for transfer (matured or 100% ownership)
  const eligibleAccounts = mockMortgageAccounts.filter(acc => acc.transferEligible);
  
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
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Handle transfer initiation
  const handleInitiateTransfer = () => {
    toast.success('Ownership transfer process initiated');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Ownership Transfer</h2>
          <p className="text-muted-foreground">Manage property title transfers upon mortgage maturity</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Eligible for Transfer</p>
                <p className="text-2xl font-bold">{eligibleAccounts.length}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Home className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Transfer In Progress</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Completed Transfers</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <FileCheck className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Transfer Eligible Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          {eligibleAccounts.length === 0 ? (
            <div className="text-center py-10">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Home className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No Eligible Accounts</h3>
              <p className="text-muted-foreground mt-2">
                There are currently no mortgage accounts eligible for ownership transfer.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {eligibleAccounts.map(account => (
                <Card key={account.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div>
                        <h3 className="font-medium">{account.mortgageNumber}</h3>
                        <p className="text-sm text-muted-foreground">Customer: {account.customerName}</p>
                        <p className="text-sm text-muted-foreground">Property: {account.propertyAddress}</p>
                        <div className="mt-2">
                          <p className="text-sm">
                            <span className="text-muted-foreground">Principal Amount:</span>{' '}
                            {formatCurrency(account.principalAmount)}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Maturity Date:</span>{' '}
                            {formatDate(account.maturityDate)}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Ownership Status:</span>{' '}
                            <span className="text-green-600 font-medium">
                              {account.ownershipPercentage}% complete
                            </span>
                          </p>
                        </div>
                      </div>
                      <Button onClick={handleInitiateTransfer}>
                        Initiate Transfer <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Transfer Process Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FileCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">1. Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Collect and verify all required legal documents for property transfer.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">2. Approvals</h3>
              <p className="text-sm text-muted-foreground">
                Legal, financial, and management approvals for the property transfer.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium mb-2">3. Transfer & Closing</h3>
              <p className="text-sm text-muted-foreground">
                Issue ownership certificate and finalize legal title transfer.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnershipTransferView;
