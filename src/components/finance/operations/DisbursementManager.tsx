
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { useToast } from '@/components/ui/use-toast';
import { Search, Plus, Filter, FileText, Download, Check, X, Eye } from 'lucide-react';
import { DisbursementRecord, DisbursementStatus } from '@/types/finance-operations';

// Mock data for disbursements
const mockDisbursements: DisbursementRecord[] = [
  {
    id: "DSB-001-2025",
    requestId: "REQ-001-2025",
    mortgageId: "MRT-001-2025",
    amount: 25000000,
    recipientType: "developer",
    recipientId: "DEV-001",
    recipientName: "Greenfield Developers Ltd",
    accountDetails: {
      bankName: "Jaiz Bank",
      accountNumber: "0123456789",
      accountName: "Greenfield Developers Ltd"
    },
    purpose: "First milestone payment for property development",
    status: "pending_review",
    approvalChain: [
      {
        id: "APV-001",
        entityId: "DSB-001-2025",
        entityType: "disbursement",
        role: "initiator",
        assignedTo: "user-001",
        assignedName: "John Maker",
        status: "approved",
        comment: "Initiated disbursement request for first milestone payment",
        timestamp: "2025-05-15T10:30:00Z",
        ipAddress: "192.168.1.100"
      },
      {
        id: "APV-002",
        entityId: "DSB-001-2025",
        entityType: "disbursement",
        role: "reviewer",
        assignedTo: "user-002",
        assignedName: "Sarah Checker",
        status: "approved",
        comment: "Verified milestone completion and documentation",
        timestamp: "2025-05-16T14:15:00Z",
        ipAddress: "192.168.1.101"
      },
      {
        id: "APV-003",
        entityId: "DSB-001-2025",
        entityType: "disbursement",
        role: "finance_officer",
        assignedTo: "user-003",
        assignedName: "Ahmed Finance",
        status: "pending",
        comment: "",
        timestamp: "",
        ipAddress: ""
      }
    ],
    documents: [
      {
        id: "DOC-001",
        disbursementId: "DSB-001-2025",
        documentType: "invoice",
        title: "Developer Invoice #INV-2025-001",
        fileUrl: "/documents/disbursements/invoice-2025-001.pdf",
        uploadedBy: "user-001",
        uploadedAt: "2025-05-15T10:20:00Z"
      },
      {
        id: "DOC-002",
        disbursementId: "DSB-001-2025",
        documentType: "approval_memo",
        title: "Milestone Completion Approval",
        fileUrl: "/documents/disbursements/milestone-approval-001.pdf",
        uploadedBy: "user-002",
        uploadedAt: "2025-05-16T11:00:00Z"
      }
    ],
    createdBy: "user-001",
    createdAt: "2025-05-15T10:30:00Z",
    updatedBy: "user-002",
    updatedAt: "2025-05-16T14:15:00Z",
    notes: "First disbursement for foundation completion. Inspection conducted on 2025-05-14."
  },
  {
    id: "DSB-002-2025",
    requestId: "REQ-002-2025",
    mortgageId: "MRT-002-2025",
    amount: 35000000,
    recipientType: "contractor",
    recipientId: "CON-001",
    recipientName: "BuildRight Construction Ltd",
    accountDetails: {
      bankName: "Sterling Bank",
      accountNumber: "1234567890",
      accountName: "BuildRight Construction Ltd"
    },
    purpose: "Phase 2 completion payment for estate development",
    status: "approved",
    approvalChain: [
      {
        id: "APV-004",
        entityId: "DSB-002-2025",
        entityType: "disbursement",
        role: "initiator",
        assignedTo: "user-004",
        assignedName: "Amina Initiator",
        status: "approved",
        comment: "Initiated disbursement request for phase 2 completion",
        timestamp: "2025-05-10T09:45:00Z",
        ipAddress: "192.168.1.102"
      },
      {
        id: "APV-005",
        entityId: "DSB-002-2025",
        entityType: "disbursement",
        role: "reviewer",
        assignedTo: "user-005",
        assignedName: "Dayo Reviewer",
        status: "approved",
        comment: "Verified completion and quality of work",
        timestamp: "2025-05-11T13:20:00Z",
        ipAddress: "192.168.1.103"
      },
      {
        id: "APV-006",
        entityId: "DSB-002-2025",
        entityType: "disbursement",
        role: "finance_officer",
        assignedTo: "user-003",
        assignedName: "Ahmed Finance",
        status: "approved",
        comment: "Approved for disbursement",
        timestamp: "2025-05-12T10:15:00Z",
        ipAddress: "192.168.1.104"
      }
    ],
    documents: [
      {
        id: "DOC-003",
        disbursementId: "DSB-002-2025",
        documentType: "invoice",
        title: "Contractor Invoice #2025-052",
        fileUrl: "/documents/disbursements/contractor-invoice-052.pdf",
        uploadedBy: "user-004",
        uploadedAt: "2025-05-10T09:30:00Z"
      },
      {
        id: "DOC-004",
        disbursementId: "DSB-002-2025",
        documentType: "approval_memo",
        title: "Phase 2 Completion Certificate",
        fileUrl: "/documents/disbursements/phase2-completion.pdf",
        uploadedBy: "user-005",
        uploadedAt: "2025-05-11T11:45:00Z"
      }
    ],
    createdBy: "user-004",
    createdAt: "2025-05-10T09:45:00Z",
    updatedBy: "user-003",
    updatedAt: "2025-05-12T10:15:00Z",
    notes: "Phase 2 completion includes roofing, windows, and external works."
  },
  {
    id: "DSB-003-2025",
    requestId: "REQ-003-2025",
    amount: 10000000,
    recipientType: "vendor",
    recipientId: "VEN-001",
    recipientName: "Quality Materials Ltd",
    accountDetails: {
      bankName: "Unity Bank",
      accountNumber: "5678901234",
      accountName: "Quality Materials Ltd"
    },
    purpose: "Payment for building materials supply",
    status: "completed",
    approvalChain: [
      {
        id: "APV-007",
        entityId: "DSB-003-2025",
        entityType: "disbursement",
        role: "initiator",
        assignedTo: "user-006",
        assignedName: "Fatima Creator",
        status: "approved",
        comment: "Initiated payment for materials supply",
        timestamp: "2025-05-05T14:00:00Z",
        ipAddress: "192.168.1.105"
      },
      {
        id: "APV-008",
        entityId: "DSB-003-2025",
        entityType: "disbursement",
        role: "reviewer",
        assignedTo: "user-007",
        assignedName: "Tunde Verifier",
        status: "approved",
        comment: "Verified materials delivery and quality",
        timestamp: "2025-05-06T10:30:00Z",
        ipAddress: "192.168.1.106"
      },
      {
        id: "APV-009",
        entityId: "DSB-003-2025",
        entityType: "disbursement",
        role: "finance_officer",
        assignedTo: "user-003",
        assignedName: "Ahmed Finance",
        status: "approved",
        comment: "Approved for payment",
        timestamp: "2025-05-07T09:15:00Z",
        ipAddress: "192.168.1.107"
      }
    ],
    documents: [
      {
        id: "DOC-005",
        disbursementId: "DSB-003-2025",
        documentType: "invoice",
        title: "Materials Invoice #INV-3456",
        fileUrl: "/documents/disbursements/materials-inv-3456.pdf",
        uploadedBy: "user-006",
        uploadedAt: "2025-05-05T13:50:00Z"
      },
      {
        id: "DOC-006",
        disbursementId: "DSB-003-2025",
        documentType: "receipt",
        title: "Delivery Receipt",
        fileUrl: "/documents/disbursements/delivery-receipt.pdf",
        uploadedBy: "user-007",
        uploadedAt: "2025-05-06T10:00:00Z"
      }
    ],
    disbursementDate: "2025-05-08T11:30:00Z",
    reference: "TRF-12345678",
    createdBy: "user-006",
    createdAt: "2025-05-05T14:00:00Z",
    updatedBy: "user-003",
    updatedAt: "2025-05-08T11:30:00Z",
    notes: "Payment for cement, steel, and finishing materials."
  },
  {
    id: "DSB-004-2025",
    requestId: "REQ-004-2025",
    mortgageId: "MRT-003-2025",
    amount: 18000000,
    recipientType: "legal_partner",
    recipientId: "LAW-001",
    recipientName: "Legal Associates LLP",
    accountDetails: {
      bankName: "First Bank",
      accountNumber: "9876543210",
      accountName: "Legal Associates LLP"
    },
    purpose: "Payment for property documentation and legal services",
    status: "rejected",
    approvalChain: [
      {
        id: "APV-010",
        entityId: "DSB-004-2025",
        entityType: "disbursement",
        role: "initiator",
        assignedTo: "user-008",
        assignedName: "Chika Initiator",
        status: "approved",
        comment: "Initiated payment for legal services",
        timestamp: "2025-05-08T13:25:00Z",
        ipAddress: "192.168.1.108"
      },
      {
        id: "APV-011",
        entityId: "DSB-004-2025",
        entityType: "disbursement",
        role: "reviewer",
        assignedTo: "user-009",
        assignedName: "Bola Checker",
        status: "rejected",
        comment: "Documentation incomplete. Missing government approvals.",
        timestamp: "2025-05-09T16:40:00Z",
        ipAddress: "192.168.1.109"
      }
    ],
    documents: [
      {
        id: "DOC-007",
        disbursementId: "DSB-004-2025",
        documentType: "invoice",
        title: "Legal Services Invoice",
        fileUrl: "/documents/disbursements/legal-invoice.pdf",
        uploadedBy: "user-008",
        uploadedAt: "2025-05-08T13:15:00Z"
      }
    ],
    createdBy: "user-008",
    createdAt: "2025-05-08T13:25:00Z",
    updatedBy: "user-009",
    updatedAt: "2025-05-09T16:40:00Z",
    notes: "Payment for property documentation, searches, and transfer of ownership services."
  }
];

const DisbursementManager: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [recipientFilter, setRecipientFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [disbursements, setDisbursements] = useState<DisbursementRecord[]>(mockDisbursements);
  const [selectedDisbursement, setSelectedDisbursement] = useState<DisbursementRecord | null>(null);
  const [isNewDisbursementOpen, setIsNewDisbursementOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);

  const handleCreateDisbursement = () => {
    toast({
      title: "Disbursement Request Created",
      description: "The disbursement request has been successfully created",
    });
    setIsNewDisbursementOpen(false);
  };

  const handleAction = (action: 'approve' | 'reject', disbursement: DisbursementRecord) => {
    const actionText = action === 'approve' ? 'approved' : 'rejected';
    toast({
      title: `Disbursement ${actionText.charAt(0).toUpperCase() + actionText.slice(1)}`,
      description: `The disbursement request ${disbursement.id} has been ${actionText}`,
      variant: action === 'approve' ? 'default' : 'destructive',
    });
  };

  const getStatusBadge = (status: DisbursementStatus) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'pending_review':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Pending Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>;
      case 'processing':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Processing</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Failed</Badge>;
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

  // Filter disbursements based on search, status, recipient type and date range
  const filteredDisbursements = disbursements.filter(disbursement => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      disbursement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (disbursement.mortgageId && disbursement.mortgageId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      disbursement.recipientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || disbursement.status === statusFilter;
    
    // Recipient type filter
    const matchesRecipient = recipientFilter === 'all' || disbursement.recipientType === recipientFilter;
    
    // Date range filter
    let matchesDateRange = true;
    if (dateRange && dateRange.from) {
      const createdDate = new Date(disbursement.createdAt);
      if (dateRange.to) {
        matchesDateRange = createdDate >= dateRange.from && createdDate <= dateRange.to;
      } else {
        matchesDateRange = createdDate >= dateRange.from;
      }
    }
    
    return matchesSearch && matchesStatus && matchesRecipient && matchesDateRange;
  });

  const viewDetails = (disbursement: DisbursementRecord) => {
    setSelectedDisbursement(disbursement);
    setIsViewDetailsOpen(true);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Disbursement Management</CardTitle>
              <CardDescription>Create and manage disbursement requests</CardDescription>
            </div>
            <Dialog open={isNewDisbursementOpen} onOpenChange={setIsNewDisbursementOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Disbursement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>New Disbursement Request</DialogTitle>
                  <DialogDescription>
                    Create a new disbursement request for payment processing
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mortgageId">Mortgage ID (Optional)</Label>
                      <Input id="mortgageId" placeholder="e.g., MRT-001-2025" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input id="amount" placeholder="Enter amount" type="number" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipientType">Recipient Type</Label>
                      <Select>
                        <SelectTrigger id="recipientType">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="contractor">Contractor</SelectItem>
                          <SelectItem value="vendor">Vendor</SelectItem>
                          <SelectItem value="legal_partner">Legal Partner</SelectItem>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="takaful_provider">Takaful Provider</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipientName">Recipient Name</Label>
                      <Input id="recipientName" placeholder="Enter recipient name" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input id="bankName" placeholder="Enter bank name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input id="accountNumber" placeholder="Enter account number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountName">Account Name</Label>
                      <Input id="accountName" placeholder="Enter account name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input id="purpose" placeholder="Purpose of disbursement" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="docs">Upload Documents</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="invoice" className="text-xs">Invoice</Label>
                        <Input id="invoice" type="file" className="text-xs" />
                      </div>
                      <div>
                        <Label htmlFor="supportDocs" className="text-xs">Supporting Documents</Label>
                        <Input id="supportDocs" type="file" className="text-xs" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Add any additional information" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewDisbursementOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateDisbursement}>Create Disbursement</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending_review">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, mortgage ID, or recipient..."
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
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending_review">Pending Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={recipientFilter} onValueChange={setRecipientFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Recipient Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Recipients</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                    <SelectItem value="legal_partner">Legal Partner</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="takaful_provider">Takaful Provider</SelectItem>
                  </SelectContent>
                </Select>

                <DateRangePicker
                  date={dateRange}
                  setDate={setDateRange}
                />

                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Recipient</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Purpose</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDisbursements.length > 0 ? (
                    filteredDisbursements.map((disbursement) => (
                      <tr key={disbursement.id} className="border-b hover:bg-muted/50">
                        <td className="p-4 align-middle">{disbursement.id}</td>
                        <td className="p-4 align-middle">
                          <div className="font-medium">{disbursement.recipientName}</div>
                          <div className="text-sm text-muted-foreground">{disbursement.recipientType.replace(/_/g, ' ')}</div>
                        </td>
                        <td className="p-4 align-middle font-medium">{formatCurrency(disbursement.amount)}</td>
                        <td className="p-4 align-middle max-w-[200px] truncate">{disbursement.purpose}</td>
                        <td className="p-4 align-middle">{getStatusBadge(disbursement.status)}</td>
                        <td className="p-4 align-middle">{new Date(disbursement.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 align-middle">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => viewDetails(disbursement)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            
                            {(disbursement.status === 'pending_review') && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                  onClick={() => handleAction('approve', disbursement)}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
                  ) : (
                    <tr>
                      <td colSpan={7} className="h-24 text-center">
                        No disbursements found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {selectedDisbursement && (
        <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Disbursement Details - {selectedDisbursement.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Amount</div>
                  <div className="text-xl font-semibold">{formatCurrency(selectedDisbursement.amount)}</div>
                </div>
                <div>{getStatusBadge(selectedDisbursement.status)}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Recipient</div>
                  <div>{selectedDisbursement.recipientName}</div>
                  <div className="text-sm text-muted-foreground">
                    ({selectedDisbursement.recipientType.replace(/_/g, ' ')})
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Account Details</div>
                  <div>{selectedDisbursement.accountDetails.bankName}</div>
                  <div className="text-sm">{selectedDisbursement.accountDetails.accountNumber}</div>
                  <div className="text-sm text-muted-foreground">{selectedDisbursement.accountDetails.accountName}</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-muted-foreground">Purpose</div>
                <div>{selectedDisbursement.purpose}</div>
              </div>
              
              {selectedDisbursement.mortgageId && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Related Mortgage</div>
                  <div>{selectedDisbursement.mortgageId}</div>
                </div>
              )}
              
              <div>
                <div className="text-sm font-medium text-muted-foreground">Documents</div>
                <div className="mt-2 space-y-2">
                  {selectedDisbursement.documents.map(doc => (
                    <div key={doc.id} className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <a href={doc.fileUrl} className="text-blue-600 hover:underline" target="_blank">{doc.title}</a>
                      <span className="text-xs text-muted-foreground">({doc.documentType.replace(/_/g, ' ')})</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-2">Approval Timeline</div>
                <div className="space-y-4">
                  {selectedDisbursement.approvalChain.map((step, idx) => (
                    <div key={step.id} className="flex items-start">
                      <div className="mr-4">
                        <div 
                          className={`h-8 w-8 rounded-full flex items-center justify-center text-xs ${
                            step.status === 'approved' 
                              ? 'bg-green-100 text-green-800' 
                              : step.status === 'rejected' 
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        {idx < selectedDisbursement.approvalChain.length - 1 && (
                          <div className="h-8 border-l border-gray-200 mx-auto"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{step.role.replace(/_/g, ' ')}</div>
                        {step.assignedName && (
                          <div className="text-sm">
                            {step.assignedName}
                            {step.status === 'pending' && (
                              <span className="text-blue-600 ml-2">(Pending)</span>
                            )}
                          </div>
                        )}
                        {step.comment && <div className="text-sm text-muted-foreground">{step.comment}</div>}
                        {step.timestamp && (
                          <div className="text-xs text-muted-foreground">
                            {new Date(step.timestamp).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedDisbursement.notes && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Notes</div>
                  <div className="text-sm">{selectedDisbursement.notes}</div>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground">
                Created by {selectedDisbursement.createdBy} on {new Date(selectedDisbursement.createdAt).toLocaleString()}
                {selectedDisbursement.updatedBy && (
                  <span> • Last updated by {selectedDisbursement.updatedBy} on {new Date(selectedDisbursement.updatedAt!).toLocaleString()}</span>
                )}
              </div>
            </div>
            <DialogFooter>
              {selectedDisbursement.status === 'pending_review' && (
                <>
                  <Button variant="outline" className="text-red-600" onClick={() => {
                    handleAction('reject', selectedDisbursement);
                    setIsViewDetailsOpen(false);
                  }}>
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                    handleAction('approve', selectedDisbursement);
                    setIsViewDetailsOpen(false);
                  }}>
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </>
              )}
              {selectedDisbursement.status !== 'pending_review' && (
                <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)}>
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DisbursementManager;
