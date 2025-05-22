
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Calendar, Download, Upload, Plus, FileText } from 'lucide-react';
import { PaymentRecord, PaymentStatus } from '@/types/finance-operations';

// Mock data for payments
const mockPayments: PaymentRecord[] = [
  {
    id: "PAY-001-2025",
    mortgageId: "MRT-001-2025",
    scheduleId: "SCH-001-2025",
    amount: 350000,
    paymentDate: "2025-05-10T14:30:00Z",
    dueDate: "2025-05-15T00:00:00Z",
    method: "bank_transfer",
    status: "paid",
    reference: "TRF12345678",
    breakdown: {
      principal: 200000,
      rent: 125000,
      maintenance: 15000,
      takaful: 10000
    },
    postedBy: "finance-officer-1",
    postedAt: "2025-05-10T14:45:00Z",
    approvedBy: "finance-manager-1",
    approvedAt: "2025-05-10T15:30:00Z"
  },
  {
    id: "PAY-002-2025",
    mortgageId: "MRT-002-2025",
    scheduleId: "SCH-002-2025",
    amount: 420000,
    paymentDate: "2025-05-12T09:15:00Z",
    dueDate: "2025-05-20T00:00:00Z",
    method: "direct_debit",
    status: "paid",
    reference: "DD87654321",
    breakdown: {
      principal: 240000,
      rent: 150000,
      maintenance: 20000,
      takaful: 10000
    },
    postedBy: "system",
    postedAt: "2025-05-12T09:15:00Z",
    approvedBy: "finance-manager-1",
    approvedAt: "2025-05-12T10:00:00Z"
  },
  {
    id: "PAY-003-2025",
    mortgageId: "MRT-003-2025",
    scheduleId: "SCH-003-2025",
    amount: 500000,
    paymentDate: "2025-05-15T16:45:00Z",
    dueDate: "2025-05-15T00:00:00Z",
    method: "online_payment",
    status: "paid",
    reference: "ONL98765432",
    breakdown: {
      principal: 300000,
      rent: 170000,
      maintenance: 20000,
      takaful: 10000
    },
    postedBy: "system",
    postedAt: "2025-05-15T16:45:00Z",
    approvedBy: "finance-manager-2",
    approvedAt: "2025-05-15T17:30:00Z"
  },
  {
    id: "PAY-004-2025",
    mortgageId: "MRT-004-2025",
    scheduleId: "SCH-004-2025",
    amount: 280000,
    paymentDate: "2025-05-18T11:20:00Z",
    dueDate: "2025-05-25T00:00:00Z",
    method: "mobile_payment",
    status: "partially_paid",
    reference: "MP78901234",
    breakdown: {
      principal: 150000,
      rent: 100000,
      maintenance: 20000,
      takaful: 10000
    },
    postedBy: "system",
    postedAt: "2025-05-18T11:20:00Z"
  },
  {
    id: "PAY-005-2025",
    mortgageId: "MRT-005-2025",
    scheduleId: "SCH-005-2025",
    amount: 0,
    paymentDate: "",
    dueDate: "2025-05-10T00:00:00Z",
    method: "bank_transfer",
    status: "overdue",
    reference: "",
    breakdown: {
      principal: 220000,
      rent: 130000,
      maintenance: 15000,
      takaful: 10000
    },
    postedBy: "system",
    postedAt: "2025-04-25T09:00:00Z"
  },
  {
    id: "PAY-006-2025",
    mortgageId: "MRT-006-2025",
    scheduleId: "SCH-006-2025",
    amount: 0,
    paymentDate: "",
    dueDate: "2025-05-30T00:00:00Z",
    method: "direct_debit",
    status: "pending",
    reference: "",
    breakdown: {
      principal: 185000,
      rent: 115000,
      maintenance: 15000,
      takaful: 10000
    },
    postedBy: "system",
    postedAt: "2025-05-01T09:00:00Z"
  }
];

const PaymentTracker: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [paymentsList, setPaymentsList] = useState<PaymentRecord[]>(mockPayments);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isRecordPaymentModalOpen, setIsRecordPaymentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const handleRecordPayment = () => {
    toast({
      title: "Payment Recorded",
      description: "The payment has been successfully recorded",
    });
    setIsRecordPaymentModalOpen(false);
  };

  const handleUploadBulk = () => {
    toast({
      title: "Bulk Upload Initiated",
      description: "Your file is being processed. You'll be notified when it's complete.",
    });
    setIsUploadModalOpen(false);
  };

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Paid</Badge>;
      case 'partially_paid':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Partially Paid</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Overdue</Badge>;
      case 'cancelled':
        return <Badge variant="outline">Cancelled</Badge>;
      case 'refunded':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter payments based on search, status, method and date range
  const filteredPayments = paymentsList.filter(payment => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.mortgageId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    // Payment method filter
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
    
    // Date range filter
    let matchesDateRange = true;
    if (dateRange && dateRange.from) {
      const dueDate = new Date(payment.dueDate);
      if (dateRange.to) {
        matchesDateRange = dueDate >= dateRange.from && dueDate <= dateRange.to;
      } else {
        matchesDateRange = dueDate >= dateRange.from;
      }
    }
    
    return matchesSearch && matchesStatus && matchesMethod && matchesDateRange;
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Payment Tracker</CardTitle>
              <CardDescription>Track and manage all payment transactions</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Dialog open={isRecordPaymentModalOpen} onOpenChange={setIsRecordPaymentModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Record Payment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Record New Payment</DialogTitle>
                    <DialogDescription>
                      Enter the payment details to record a new transaction.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="mortgageId">Mortgage ID</Label>
                        <Input id="mortgageId" placeholder="e.g., MRT-001-2025" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" placeholder="Enter amount" type="number" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="paymentDate">Payment Date</Label>
                        <Input id="paymentDate" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="method">Payment Method</Label>
                        <Select>
                          <SelectTrigger id="method">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                            <SelectItem value="direct_debit">Direct Debit</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="online_payment">Online Payment</SelectItem>
                            <SelectItem value="mobile_payment">Mobile Payment</SelectItem>
                            <SelectItem value="payroll_deduction">Payroll Deduction</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reference">Reference Number</Label>
                      <Input id="reference" placeholder="Payment reference number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Input id="notes" placeholder="Add any additional notes" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsRecordPaymentModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleRecordPayment}>Record Payment</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Bulk Upload
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bulk Payment Upload</DialogTitle>
                    <DialogDescription>
                      Upload a CSV or Excel file containing multiple payment records.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="file">Upload File</Label>
                      <Input id="file" type="file" />
                    </div>
                    <div className="p-4 border border-dashed rounded-md">
                      <p className="text-sm text-muted-foreground">
                        The file should contain columns for: Mortgage ID, Amount, Payment Date, Reference, Method
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        <FileText className="h-4 w-4 inline mr-1" />
                        <a href="#" className="text-blue-500 hover:underline">Download Template</a>
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleUploadBulk}>Upload</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Payments</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending/Partial</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, mortgage, or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="partially_paid">Partially Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="direct_debit">Direct Debit</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="online_payment">Online Payment</SelectItem>
                    <SelectItem value="mobile_payment">Mobile Payment</SelectItem>
                    <SelectItem value="payroll_deduction">Payroll Deduction</SelectItem>
                    <SelectItem value="wallet">Wallet</SelectItem>
                  </SelectContent>
                </Select>

                <DateRangePicker
                  date={dateRange}
                  setDate={setDateRange}
                  showCompare={false}
                />

                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Payment ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Mortgage ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Due Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Payment Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Method</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Reference</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <tr key={payment.id} className="border-b hover:bg-muted/50">
                        <td className="p-4 align-middle">{payment.id}</td>
                        <td className="p-4 align-middle">{payment.mortgageId}</td>
                        <td className="p-4 align-middle font-medium">{formatCurrency(payment.amount || 0)}</td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            {formatDate(payment.dueDate)}
                          </div>
                        </td>
                        <td className="p-4 align-middle">{payment.paymentDate ? formatDate(payment.paymentDate) : 'N/A'}</td>
                        <td className="p-4 align-middle">{getStatusBadge(payment.status)}</td>
                        <td className="p-4 align-middle">{payment.method.replace(/_/g, ' ')}</td>
                        <td className="p-4 align-middle">{payment.reference || 'N/A'}</td>
                        <td className="p-4 align-middle">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="h-24 text-center">
                        No payments found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-muted-foreground">Showing {filteredPayments.length} of {paymentsList.length} payments</p>
            <div className="space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentTracker;
