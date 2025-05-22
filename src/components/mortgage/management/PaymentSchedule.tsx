
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Calendar } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { ScheduleItem, PaymentStatus } from '@/types/mortgage-account';

interface PaymentScheduleProps {
  accountId: string;
}

// Mock data for development
const mockScheduleItems: ScheduleItem[] = [
  {
    id: 'schd-001',
    mortgageId: 'mort-1234',
    dueDate: '2024-02-10',
    amount: 250000,
    principal: 100000,
    rent: 150000,
    cumulativePrincipal: 100000,
    remainingBalance: 49900000,
    status: 'paid',
    paymentDate: '2024-02-09',
    paymentAmount: 250000,
    paymentMethod: 'bank_transfer',
    reference: 'TRF-123456',
  },
  {
    id: 'schd-002',
    mortgageId: 'mort-1234',
    dueDate: '2024-03-10',
    amount: 250000,
    principal: 101500,
    rent: 148500,
    cumulativePrincipal: 201500,
    remainingBalance: 49798500,
    status: 'paid',
    paymentDate: '2024-03-10',
    paymentAmount: 250000,
    paymentMethod: 'direct_debit',
    reference: 'DD-123457',
  },
  {
    id: 'schd-003',
    mortgageId: 'mort-1234',
    dueDate: '2024-04-10',
    amount: 250000,
    principal: 103000,
    rent: 147000,
    cumulativePrincipal: 304500,
    remainingBalance: 49695500,
    status: 'paid',
    paymentDate: '2024-04-08',
    paymentAmount: 250000,
    paymentMethod: 'online',
    reference: 'ONL-123458',
  },
  {
    id: 'schd-004',
    mortgageId: 'mort-1234',
    dueDate: '2024-05-10',
    amount: 250000,
    principal: 104500,
    rent: 145500,
    cumulativePrincipal: 409000,
    remainingBalance: 49591000,
    status: 'paid',
    paymentDate: '2024-05-10',
    paymentAmount: 250000,
    paymentMethod: 'direct_debit',
    reference: 'DD-123459',
  },
  {
    id: 'schd-005',
    mortgageId: 'mort-1234',
    dueDate: '2024-06-10',
    amount: 250000,
    principal: 106000,
    rent: 144000,
    cumulativePrincipal: 515000,
    remainingBalance: 49485000,
    status: 'upcoming',
  },
  {
    id: 'schd-006',
    mortgageId: 'mort-1234',
    dueDate: '2024-07-10',
    amount: 250000,
    principal: 107500,
    rent: 142500,
    cumulativePrincipal: 622500,
    remainingBalance: 49377500,
    status: 'upcoming',
  }
];

const getStatusBadgeClass = (status: PaymentStatus) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'partially_paid':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'overdue':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'upcoming':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'waived':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const PaymentSchedule: React.FC<PaymentScheduleProps> = ({ accountId }) => {
  const [loading, setLoading] = useState(true);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ScheduleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    // In a real app, fetch the schedule items from an API based on accountId
    setLoading(true);
    setTimeout(() => {
      setScheduleItems(mockScheduleItems);
      setFilteredItems(mockScheduleItems);
      setLoading(false);
    }, 500);
  }, [accountId]);

  useEffect(() => {
    let filtered = [...scheduleItems];
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    // Filter by date range
    if (dateRange && dateRange.from) {
      filtered = filtered.filter(item => {
        const dueDate = new Date(item.dueDate);
        if (dateRange.to) {
          return dueDate >= dateRange.from && dueDate <= dateRange.to;
        }
        return dueDate >= dateRange.from;
      });
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.id.toLowerCase().includes(term) || 
        (item.reference && item.reference.toLowerCase().includes(term))
      );
    }
    
    setFilteredItems(filtered);
  }, [scheduleItems, statusFilter, dateRange, searchTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
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
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="waived">Waived</SelectItem>
              </SelectContent>
            </Select>
            
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="py-16 text-center">
            <p>Loading payment schedule...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center">
            <p>No schedule items found matching your filters</p>
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Principal</TableHead>
                  <TableHead className="hidden md:table-cell">Rent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Payment Date</TableHead>
                  <TableHead className="hidden md:table-cell">Reference</TableHead>
                  <TableHead className="hidden lg:table-cell">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {new Date(item.dueDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(item.amount)}</TableCell>
                    <TableCell className="hidden md:table-cell">{formatCurrency(item.principal)}</TableCell>
                    <TableCell className="hidden md:table-cell">{formatCurrency(item.rent)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(item.status)}`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.paymentDate ? new Date(item.paymentDate).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.reference || '-'}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {formatCurrency(item.remainingBalance)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentSchedule;
