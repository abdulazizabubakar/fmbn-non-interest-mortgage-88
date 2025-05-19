
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockDisbursements } from '@/data/mockFinanceData';
import { DisbursementRequest, DisbursementStatus } from '@/types/finance';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Search, Filter, Plus, FileText, Check, X } from 'lucide-react';
import DisbursementDetails from './DisbursementDetails';

const DisbursementModule = () => {
  const { toast } = useToast();
  const [selectedDisbursement, setSelectedDisbursement] = useState<DisbursementRequest | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleAction = (action: string, disbursement: DisbursementRequest) => {
    toast({
      title: action === 'approve' ? 'Disbursement Approved' : 'Disbursement Rejected',
      description: `You have ${action === 'approve' ? 'approved' : 'rejected'} disbursement ${disbursement.id}`,
      variant: action === 'approve' ? 'default' : 'destructive',
    });
  };

  const handleViewDetails = (disbursement: DisbursementRequest) => {
    setSelectedDisbursement(disbursement);
    setShowDetails(true);
  };

  const getStatusBadge = (status: DisbursementStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'in-review':
        return <Badge variant="secondary">In Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'completed':
        return <Badge variant="default">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredDisbursements = mockDisbursements.filter((disbursement) => {
    const matchesSearch = 
      disbursement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disbursement.mortgageId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disbursement.recipientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || disbursement.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Disbursement Management</CardTitle>
              <CardDescription>Process mortgage disbursement requests</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Disbursement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Create New Disbursement</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new disbursement request
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mortgage">Mortgage ID</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mortgage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MRT-001-2025">MRT-001-2025</SelectItem>
                          <SelectItem value="MRT-002-2025">MRT-002-2025</SelectItem>
                          <SelectItem value="MRT-003-2025">MRT-003-2025</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="milestone">Milestone (Optional)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select milestone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MLS-001-2025">Foundation (25%)</SelectItem>
                          <SelectItem value="MLS-002-2025">Structure (50%)</SelectItem>
                          <SelectItem value="MLS-003-2025">Finishing (25%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" placeholder="Enter amount" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instrument">Disbursement Instrument</Label>
                      <Select defaultValue="direct-to-vendor">
                        <SelectTrigger>
                          <SelectValue placeholder="Select instrument" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="direct-to-vendor">Direct to Vendor</SelectItem>
                          <SelectItem value="cooperative">Cooperative</SelectItem>
                          <SelectItem value="contractor">Contractor</SelectItem>
                          <SelectItem value="escrow">Escrow</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipientBank">Recipient Bank</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jaiz">Jaiz Bank</SelectItem>
                          <SelectItem value="lotus">Lotus Bank</SelectItem>
                          <SelectItem value="taj">TajBank</SelectItem>
                          <SelectItem value="sterling">Sterling Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipientName">Recipient Name</Label>
                      <Input id="recipientName" placeholder="Enter recipient name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipientAccount">Account Number</Label>
                      <Input id="recipientAccount" placeholder="Enter account number" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input id="notes" placeholder="Add notes" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => toast({
                    title: "Disbursement Created",
                    description: "The disbursement request has been created successfully.",
                  })}>
                    Create Disbursement
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <TabsList className="h-9">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="in-review">In Review</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-grow sm:flex-grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search disbursements..."
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
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
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Recipient</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Amount</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Status</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Date</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDisbursements.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-muted-foreground">
                        No disbursements found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredDisbursements.map((disbursement) => (
                      <tr key={disbursement.id} className="border-b hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">{disbursement.id}</td>
                        <td className="p-4 align-middle">{disbursement.mortgageId}</td>
                        <td className="p-4 align-middle">{disbursement.recipientName}</td>
                        <td className="p-4 align-middle">{formatCurrency(disbursement.amount)}</td>
                        <td className="p-4 align-middle">{getStatusBadge(disbursement.status)}</td>
                        <td className="p-4 align-middle">{format(new Date(disbursement.requestedAt), 'MMM dd, yyyy')}</td>
                        <td className="p-4 align-middle">
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewDetails(disbursement)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            
                            {(disbursement.status === 'pending' || disbursement.status === 'in-review') && (
                              <>
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleAction('approve', disbursement)}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleAction('reject', disbursement)}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {selectedDisbursement && (
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Disbursement Details - {selectedDisbursement.id}</DialogTitle>
            </DialogHeader>
            <DisbursementDetails disbursement={selectedDisbursement} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DisbursementModule;
