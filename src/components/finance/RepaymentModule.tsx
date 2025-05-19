
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockRepaymentSchedules } from '@/data/mockFinanceData';
import { RepaymentScheduleItem, RepaymentStatus, RepaymentChannel } from '@/types/finance';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { Search, Plus, Calendar, Wallet, AlertCircle, CheckCircle, AlarmClock } from 'lucide-react';

const RepaymentModule = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPayment, setSelectedPayment] = useState<RepaymentScheduleItem | null>(null);
  const [showRecordPayment, setShowRecordPayment] = useState(false);

  const getStatusBadge = (status: RepaymentStatus) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-800 hover:bg-blue-50">Scheduled</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'partial':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Partial</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleRecordPayment = (payment: RepaymentScheduleItem) => {
    setSelectedPayment(payment);
    setShowRecordPayment(true);
  };

  const handleSendReminder = (payment: RepaymentScheduleItem) => {
    toast({
      title: "Reminder Sent",
      description: `Payment reminder has been sent for ${payment.id}`,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredPayments = mockRepaymentSchedules.filter((payment) => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.mortgageId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalDue = mockRepaymentSchedules.reduce((total, item) => total + item.amount, 0);
  const totalPaid = mockRepaymentSchedules
    .filter(item => item.status === 'completed')
    .reduce((total, item) => total + item.amount, 0);
  const totalPartial = mockRepaymentSchedules
    .filter(item => item.status === 'partial')
    .reduce((total, item) => total + (item.paidAmount || 0), 0);
  const collectionRate = ((totalPaid + totalPartial) / totalDue) * 100;

  const getDueStatus = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: "Overdue", color: "text-red-500" };
    } else if (diffDays === 0) {
      return { text: "Due Today", color: "text-amber-500" };
    } else if (diffDays <= 7) {
      return { text: `Due in ${diffDays} day${diffDays === 1 ? '' : 's'}`, color: "text-amber-500" };
    } else {
      return { text: `Due in ${diffDays} days`, color: "text-green-500" };
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalDue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPaid + totalPartial)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Collection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collectionRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalDue - totalPaid - totalPartial)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Repayment Management</CardTitle>
              <CardDescription>Track and manage mortgage repayment schedules</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate Schedule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <TabsList className="h-9">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
                <TabsTrigger value="partial">Partial</TabsTrigger>
              </TabsList>
              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-grow sm:flex-grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 h-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">ID</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Mortgage</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Due Date</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Amount</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Paid</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Status</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-muted-foreground">
                        No payments found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((payment) => {
                      const dueStatus = getDueStatus(payment.dueDate);
                      return (
                        <tr key={payment.id} className="border-b hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">{payment.id}</td>
                          <td className="p-4 align-middle">{payment.mortgageId}</td>
                          <td className="p-4 align-middle">
                            <div className="flex flex-col">
                              <span>{format(new Date(payment.dueDate), 'MMM dd, yyyy')}</span>
                              {payment.status !== 'completed' && (
                                <span className={`text-xs ${dueStatus.color}`}>{dueStatus.text}</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex flex-col">
                              <span>{formatCurrency(payment.amount)}</span>
                              <span className="text-xs text-muted-foreground">
                                Principal: {formatCurrency(payment.principal)}, Profit: {formatCurrency(payment.profit)}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            {payment.paidAmount ? formatCurrency(payment.paidAmount) : '-'}
                            {payment.paidDate && (
                              <div className="text-xs text-muted-foreground">
                                on {format(new Date(payment.paidDate), 'MMM dd, yyyy')}
                                {payment.paidVia && ` via ${payment.paidVia.replace('-', ' ')}`}
                              </div>
                            )}
                          </td>
                          <td className="p-4 align-middle">{getStatusBadge(payment.status)}</td>
                          <td className="p-4 align-middle">
                            <div className="flex space-x-2">
                              {(payment.status === 'scheduled' || payment.status === 'failed' || payment.status === 'partial') && (
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  onClick={() => handleRecordPayment(payment)}
                                >
                                  <Wallet className="h-4 w-4 mr-1" />
                                  Record Payment
                                </Button>
                              )}
                              
                              {(payment.status === 'scheduled' || payment.status === 'failed' || payment.status === 'partial') && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleSendReminder(payment)}
                                >
                                  <AlarmClock className="h-4 w-4 mr-1" />
                                  Send Reminder
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Record Payment Dialog */}
      {selectedPayment && (
        <Dialog open={showRecordPayment} onOpenChange={setShowRecordPayment}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Record Payment</DialogTitle>
              <DialogDescription>
                Record a payment for {selectedPayment.id} - Due {format(new Date(selectedPayment.dueDate), 'MMM dd, yyyy')}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Due Amount</Label>
                <Input value={selectedPayment.amount.toLocaleString()} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paidAmount">Amount Paid</Label>
                <Input id="paidAmount" placeholder="Enter amount" defaultValue={selectedPayment.amount.toString()} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentDate">Payment Date</Label>
                  <Input id="paymentDate" type="date" defaultValue={format(new Date(), 'yyyy-MM-dd')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentChannel">Payment Channel</Label>
                  <Select defaultValue="bank-transfer">
                    <SelectTrigger id="paymentChannel">
                      <SelectValue placeholder="Select a channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="wallet">Mobile Wallet</SelectItem>
                      <SelectItem value="direct-debit">Direct Debit</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reference">Reference Number</Label>
                <Input id="reference" placeholder="Enter payment reference" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Add notes (optional)" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => {
                setShowRecordPayment(false);
                toast({
                  title: "Payment Recorded",
                  description: `Payment has been successfully recorded for ${selectedPayment.id}`,
                });
              }}>
                Record Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RepaymentModule;
