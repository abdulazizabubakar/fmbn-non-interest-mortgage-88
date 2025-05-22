
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Wallet, Calendar, Filter, Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { format } from 'date-fns';

const PaymentTrackingView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentType, setPaymentType] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Payment Tracking</h2>
          <p className="text-muted-foreground">Monitor and reconcile payments across all mortgage accounts</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Record Payment
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Today's Collections</p>
                <p className="text-2xl font-bold">₦2,850,000</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Wallet className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">₦42,520,000</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">96.5%</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <Filter className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by mortgage #, customer, or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={paymentType} onValueChange={setPaymentType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Payment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="direct_debit">Direct Debit</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="online">Online Payment</SelectItem>
                  <SelectItem value="mobile_wallet">Mobile Wallet</SelectItem>
                </SelectContent>
              </Select>
              
              <DateRangePicker date={dateRange} setDate={setDateRange} />
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Wallet className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium">Payment Tracking Module</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              This module will display a comprehensive list of all payments, 
              with reconciliation status, transaction details, and filtering options.
            </p>
            <p className="text-sm mt-6">Coming in the next sprint</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentTrackingView;
