
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, CreditCard } from 'lucide-react';

const PaymentManagement = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Mock payment data - in a real app, this would come from an API
  const payments = [
    {
      id: '1',
      dueDate: '2025-06-15',
      amount: 75000,
      status: 'upcoming',
      type: 'rent',
      reference: ''
    },
    {
      id: '2',
      dueDate: '2025-05-15',
      amount: 75000,
      status: 'paid',
      type: 'rent',
      reference: 'PAY-123456',
      paidOn: '2025-05-14',
      receiptUrl: '#'
    },
    {
      id: '3',
      dueDate: '2025-04-15',
      amount: 75000,
      status: 'paid',
      type: 'rent',
      reference: 'PAY-123455',
      paidOn: '2025-04-13',
      receiptUrl: '#'
    },
    {
      id: '4',
      dueDate: '2025-03-15',
      amount: 75000,
      status: 'paid',
      type: 'rent',
      reference: 'PAY-123454',
      paidOn: '2025-03-15',
      receiptUrl: '#'
    },
    {
      id: '5',
      dueDate: '2025-07-15',
      amount: 75000,
      status: 'upcoming',
      type: 'rent',
      reference: ''
    },
    {
      id: '6',
      dueDate: '2025-08-15',
      amount: 75000,
      status: 'upcoming',
      type: 'rent',
      reference: ''
    }
  ];
  
  // Filter payments based on tab
  const filteredPayments = payments.filter(payment => {
    if (activeTab === 'upcoming') return payment.status === 'upcoming';
    if (activeTab === 'history') return payment.status === 'paid';
    return true;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="outline">Upcoming</Badge>;
      case 'paid':
        return <Badge variant="success">Paid</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Simulate payment
  const handlePayment = (paymentId: string) => {
    alert(`Processing payment for ID: ${paymentId}`);
    // In a real app, this would open a payment gateway or redirect to a payment page
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Management</CardTitle>
          <CardDescription>
            View and manage your payment schedule and history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-medium">Next Payment Due</h3>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{formatDate(payments.find(p => p.status === 'upcoming')?.dueDate || '')}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Amount</h3>
                    <p className="text-xl font-bold mt-1">₦{payments.find(p => p.status === 'upcoming')?.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <Button className="w-full sm:w-auto">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay Now
                    </Button>
                  </div>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{formatDate(payment.dueDate)}</TableCell>
                      <TableCell className="capitalize">{payment.type}</TableCell>
                      <TableCell className="text-right">₦{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePayment(payment.id)}
                        >
                          Pay
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredPayments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No upcoming payments
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Paid On</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{formatDate(payment.dueDate)}</TableCell>
                      <TableCell>{payment.paidOn ? formatDate(payment.paidOn) : '-'}</TableCell>
                      <TableCell className="capitalize">{payment.type}</TableCell>
                      <TableCell>{payment.reference || '-'}</TableCell>
                      <TableCell className="text-right">₦{payment.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        {payment.receiptUrl && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredPayments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No payment history found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Manage your payment methods and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="font-medium">Treasury Single Account (TSA)</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Payments are processed through the Treasury Single Account system
              </p>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-medium">Auto-Debit Authorization</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Enable automatic debit from your salary for timely payments
              </p>
              <div className="mt-2">
                <Button variant="outline" size="sm">Set Up Auto-Debit</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentManagement;
