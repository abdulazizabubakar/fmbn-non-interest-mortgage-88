
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, Search, Filter, Wallet } from 'lucide-react';
import { 
  MortgageAccount, 
  ScheduleItem,
  PaymentStatus 
} from '@/types/mortgage-account';
import { generateMockPaymentSchedule } from '@/data/mockMortgageAccounts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface PaymentScheduleProps {
  account: MortgageAccount;
}

const PaymentSchedule: React.FC<PaymentScheduleProps> = ({ account }) => {
  const [paymentSchedule, setPaymentSchedule] = useState<ScheduleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPayment, setSelectedPayment] = useState<ScheduleItem | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll generate mock data
    const startDate = account.activationDate 
      ? new Date(account.activationDate) 
      : new Date(account.creationDate);
    
    const isIslamic = account.financingType === 'ijara' || account.financingType === 'musharaka';
    
    const schedule = generateMockPaymentSchedule(
      account.id,
      account.principalAmount,
      account.monthlyPayment,
      account.tenor,
      startDate,
      isIslamic
    );
    
    setPaymentSchedule(schedule);
  }, [account]);
  
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
      day: 'numeric',
    });
  };
  
  // Status badge
  const getStatusBadge = (status: PaymentStatus) => {
    switch(status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>;
      case 'partially_paid':
        return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-300">Partially Paid</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      case 'upcoming':
        return <Badge variant="outline">Upcoming</Badge>;
      case 'waived':
        return <Badge variant="secondary">Waived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Filter payment schedule
  const filteredSchedule = paymentSchedule.filter((item) => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatDate(item.dueDate).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Handle record payment button
  const handleRecordPayment = (item: ScheduleItem) => {
    setSelectedPayment(item);
    setPaymentAmount(item.amount.toString());
    setShowPaymentDialog(true);
  };
  
  // Handle submit payment
  const handleSubmitPayment = () => {
    // In a real app, this would make an API call
    if (!selectedPayment) return;
    
    toast.success(`Payment of ${formatCurrency(Number(paymentAmount))} recorded for ${formatDate(selectedPayment.dueDate)}`);
    setShowPaymentDialog(false);
    
    // Update the payment schedule item (in a real app, this would come from the API response)
    const updatedSchedule = paymentSchedule.map(item => {
      if (item.id === selectedPayment.id) {
        const paymentAmountNumber = Number(paymentAmount);
        return {
          ...item,
          status: paymentAmountNumber >= item.amount ? 'paid' : 'partially_paid',
          paymentDate: new Date().toISOString(),
          paymentAmount: paymentAmountNumber,
          paymentMethod: 'bank_transfer',
          reference: `REF-${Math.floor(Math.random() * 1000000)}`
        };
      }
      return item;
    });
    
    setPaymentSchedule(updatedSchedule);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Payment Schedule</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-1" />
              Repayment Calendar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export Schedule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partially_paid">Partially Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="waived">Waived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">No.</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Due Date</th>
                    <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Principal</th>
                    <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">
                      {account.financingType === 'ijara' || account.financingType === 'musharaka' ? 'Rent' : 'Profit'}
                    </th>
                    <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Total</th>
                    <th className="h-10 px-4 text-center align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-10 px-4 text-center align-middle font-medium text-muted-foreground">Paid Date</th>
                    <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Paid Amount</th>
                    <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Balance</th>
                    <th className="h-10 px-4 text-center align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchedule.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-10 text-center text-muted-foreground">
                        No payment schedule items match your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredSchedule.map((item, index) => (
                      <tr key={item.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3 align-middle">{index + 1}</td>
                        <td className="px-4 py-3 align-middle">{formatDate(item.dueDate)}</td>
                        <td className="px-4 py-3 align-middle text-right">{formatCurrency(item.principal)}</td>
                        <td className="px-4 py-3 align-middle text-right">{formatCurrency(item.rent || item.profit || 0)}</td>
                        <td className="px-4 py-3 align-middle text-right font-medium">{formatCurrency(item.amount)}</td>
                        <td className="px-4 py-3 align-middle text-center">{getStatusBadge(item.status)}</td>
                        <td className="px-4 py-3 align-middle text-center">
                          {item.paymentDate ? formatDate(item.paymentDate) : '-'}
                        </td>
                        <td className="px-4 py-3 align-middle text-right">
                          {item.paymentAmount ? formatCurrency(item.paymentAmount) : '-'}
                        </td>
                        <td className="px-4 py-3 align-middle text-right">
                          {formatCurrency(item.remainingBalance)}
                        </td>
                        <td className="px-4 py-3 align-middle text-center">
                          {(item.status === 'upcoming' || item.status === 'overdue' || item.status === 'partially_paid') && (
                            <Button variant="ghost" size="sm" onClick={() => handleRecordPayment(item)}>
                              <Wallet className="h-4 w-4 mr-1" />
                              Record Payment
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-2 text-sm text-muted-foreground">
            Showing {filteredSchedule.length} of {paymentSchedule.length} payments
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" value={selectedPayment ? formatDate(selectedPayment.dueDate) : ''} disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueAmount">Due Amount</Label>
              <Input id="dueAmount" value={selectedPayment ? formatCurrency(selectedPayment.amount) : ''} disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="paymentAmount">Payment Amount</Label>
              <Input 
                id="paymentAmount" 
                value={paymentAmount} 
                onChange={(e) => setPaymentAmount(e.target.value)}
                type="number"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="paymentDate">Payment Date</Label>
              <Input 
                id="paymentDate" 
                type="date" 
                defaultValue={new Date().toISOString().split('T')[0]} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select defaultValue="bank_transfer">
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="direct_debit">Direct Debit</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="online">Online Payment</SelectItem>
                  <SelectItem value="mobile_wallet">Mobile Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reference">Reference Number</Label>
              <Input id="reference" placeholder="Enter payment reference" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="Additional notes (optional)" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmitPayment}>
              Record Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentSchedule;
