
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PencilLine, 
  FileCog, 
  Pause, 
  Timer, 
  ArrowDownUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  X
} from 'lucide-react';
import { MortgageAccount, TermAdjustment, AdjustmentType } from '@/types/mortgage-account';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface AccountModificationsProps {
  account: MortgageAccount;
}

// Sample term adjustments
const sampleAdjustments: TermAdjustment[] = [
  {
    id: "adj-001",
    mortgageId: "mort-004",
    type: "extension" as AdjustmentType,
    requestDate: "2024-02-10T10:30:00Z",
    effectiveDate: "2024-03-01T00:00:00Z",
    approvedBy: "Musa Ibrahim",
    approvedDate: "2024-02-20T14:15:00Z",
    originalTenor: 240,
    newTenor: 324,
    originalAmount: 140000,
    newAmount: 120000,
    reason: "Customer requested extension due to temporary financial hardship",
    documentUrl: "/documents/adjustment-001.pdf",
    status: "approved",
    notes: "Approved by credit committee after review of customer's financial situation"
  },
  {
    id: "adj-002",
    mortgageId: "mort-004",
    type: "deferral" as AdjustmentType,
    requestDate: "2023-11-05T09:15:00Z",
    effectiveDate: "2023-12-01T00:00:00Z",
    approvedBy: "Fatima Aliyu",
    approvedDate: "2023-11-20T11:30:00Z",
    originalTenor: 240,
    originalAmount: 140000,
    reason: "Payment deferral for December due to medical emergency",
    documentUrl: "/documents/adjustment-002.pdf",
    status: "approved",
    notes: "One-month deferral approved due to documented medical emergency"
  },
  {
    id: "adj-003",
    mortgageId: "mort-001",
    type: "prepayment" as AdjustmentType,
    requestDate: "2024-04-10T15:20:00Z",
    effectiveDate: "2024-04-15T00:00:00Z",
    originalTenor: 300,
    originalAmount: 150000,
    reason: "Customer wishes to make partial prepayment of NGN 2,000,000",
    status: "pending",
    notes: "Awaiting approval from finance department"
  }
];

const AccountModifications: React.FC<AccountModificationsProps> = ({ account }) => {
  const [adjustments] = useState<TermAdjustment[]>(
    // Filter adjustments for this account
    sampleAdjustments.filter(adj => adj.mortgageId === account.id)
  );
  
  const [activeTab, setActiveTab] = useState('adjustments');
  const [showNewAdjustmentDialog, setShowNewAdjustmentDialog] = useState(false);
  const [adjustmentType, setAdjustmentType] = useState<AdjustmentType>('extension');
  
  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Get adjustment type icon
  const getAdjustmentIcon = (type: AdjustmentType) => {
    switch(type) {
      case 'extension':
        return <Timer className="h-5 w-5 text-blue-600" />;
      case 'reduction':
        return <ArrowDownUp className="h-5 w-5 text-green-600" />;
      case 'prepayment':
        return <FileCog className="h-5 w-5 text-purple-600" />;
      case 'deferral':
        return <Pause className="h-5 w-5 text-amber-600" />;
      case 'waiver':
        return <X className="h-5 w-5 text-red-600" />;
      default:
        return <PencilLine className="h-5 w-5 text-gray-600" />;
    }
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Approved
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Pending
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive">
            <X className="h-3.5 w-3.5 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Handle new adjustment
  const handleNewAdjustment = () => {
    setShowNewAdjustmentDialog(true);
  };
  
  // Handle submit adjustment
  const handleSubmitAdjustment = () => {
    toast.success(`Adjustment request submitted for approval`);
    setShowNewAdjustmentDialog(false);
  };
  
  // Get adjustment type label
  const getAdjustmentTypeLabel = (type: AdjustmentType): string => {
    switch(type) {
      case 'extension': return 'Tenure Extension';
      case 'reduction': return 'Payment Reduction';
      case 'prepayment': return 'Prepayment';
      case 'deferral': return 'Payment Deferral';
      case 'waiver': return 'Payment Waiver';
      default: return type;
    }
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-6">
          <TabsTrigger value="adjustments">Term Adjustments</TabsTrigger>
          <TabsTrigger value="restructuring">Restructuring</TabsTrigger>
          <TabsTrigger value="termination">Termination</TabsTrigger>
        </TabsList>
        
        <TabsContent value="adjustments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Term Adjustments</CardTitle>
              <Button onClick={handleNewAdjustment}>
                <PencilLine className="h-4 w-4 mr-2" />
                New Adjustment
              </Button>
            </CardHeader>
            <CardContent>
              {adjustments.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  <FileCog className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">No adjustments found</h3>
                  <p className="mt-1">This mortgage account has no term adjustments.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {adjustments.map(adjustment => (
                    <Card key={adjustment.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                              {getAdjustmentIcon(adjustment.type)}
                            </div>
                          </div>
                          
                          <div className="flex-grow space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div>
                                <h3 className="font-medium text-lg capitalize">
                                  {getAdjustmentTypeLabel(adjustment.type)}
                                </h3>
                                <p className="text-muted-foreground">
                                  Requested on {formatDate(adjustment.requestDate)}
                                  {adjustment.effectiveDate && ` • Effective from ${formatDate(adjustment.effectiveDate)}`}
                                </p>
                              </div>
                              <div>
                                {getStatusBadge(adjustment.status)}
                              </div>
                            </div>
                            
                            <div className="bg-muted/50 p-4 rounded-md">
                              <h4 className="font-medium mb-2">Reason</h4>
                              <p>{adjustment.reason}</p>
                              
                              {adjustment.notes && (
                                <div className="mt-4 pt-4 border-t border-muted-foreground/20">
                                  <h4 className="font-medium mb-2">Notes</h4>
                                  <p>{adjustment.notes}</p>
                                </div>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {adjustment.type === 'extension' && (
                                <>
                                  <div>
                                    <h4 className="text-sm text-muted-foreground">Original Tenure</h4>
                                    <p className="font-medium">
                                      {Math.floor(adjustment.originalTenor / 12)} years {adjustment.originalTenor % 12} months
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="text-sm text-muted-foreground">New Tenure</h4>
                                    <p className="font-medium">
                                      {adjustment.newTenor ? `${Math.floor(adjustment.newTenor / 12)} years ${adjustment.newTenor % 12} months` : 'N/A'}
                                    </p>
                                  </div>
                                </>
                              )}
                              
                              {(adjustment.type === 'extension' || adjustment.type === 'reduction') && (
                                <>
                                  <div>
                                    <h4 className="text-sm text-muted-foreground">Original Monthly Payment</h4>
                                    <p className="font-medium">
                                      {formatCurrency(adjustment.originalAmount)}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="text-sm text-muted-foreground">New Monthly Payment</h4>
                                    <p className="font-medium">
                                      {adjustment.newAmount ? formatCurrency(adjustment.newAmount) : 'N/A'}
                                    </p>
                                  </div>
                                </>
                              )}
                              
                              {adjustment.type === 'prepayment' && (
                                <div>
                                  <h4 className="text-sm text-muted-foreground">Prepayment Amount</h4>
                                  <p className="font-medium">
                                    {adjustment.newAmount ? formatCurrency(adjustment.newAmount) : 'N/A'}
                                  </p>
                                </div>
                              )}
                              
                              {adjustment.approvedBy && (
                                <div>
                                  <h4 className="text-sm text-muted-foreground">Approved By</h4>
                                  <p className="font-medium">
                                    {adjustment.approvedBy} on {formatDate(adjustment.approvedDate!)}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            {adjustment.documentUrl && (
                              <div className="flex justify-end">
                                <Button variant="outline" size="sm">
                                  <FileCog className="h-4 w-4 mr-2" />
                                  View Document
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="restructuring">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-10">
                <div className="bg-amber-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="text-lg font-medium">Mortgage Restructuring</h3>
                <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                  Restructuring is a significant modification to the mortgage terms, usually for accounts 
                  in financial distress. This process requires multiple approvals and documentation.
                </p>
                <Button className="mt-6">
                  <FileCog className="h-4 w-4 mr-2" />
                  Start Restructuring Process
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="termination">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-10">
                <div className="bg-red-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-lg font-medium">Mortgage Termination</h3>
                <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                  Terminating a mortgage account before maturity will trigger the account closure process. 
                  This may include early settlement fees, property inspection, and ownership changes.
                </p>
                <Button variant="destructive" className="mt-6">
                  <X className="h-4 w-4 mr-2" />
                  Initiate Termination
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* New Adjustment Dialog */}
      <Dialog open={showNewAdjustmentDialog} onOpenChange={setShowNewAdjustmentDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>New Term Adjustment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="adjustmentType">Adjustment Type</Label>
              <Select 
                defaultValue={adjustmentType} 
                onValueChange={(value) => setAdjustmentType(value as AdjustmentType)}
              >
                <SelectTrigger id="adjustmentType">
                  <SelectValue placeholder="Select adjustment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="extension">Tenure Extension</SelectItem>
                  <SelectItem value="reduction">Payment Reduction</SelectItem>
                  <SelectItem value="prepayment">Prepayment</SelectItem>
                  <SelectItem value="deferral">Payment Deferral</SelectItem>
                  <SelectItem value="waiver">Payment Waiver</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="effectiveDate">Effective Date</Label>
              <Input 
                id="effectiveDate" 
                type="date" 
                defaultValue={new Date().toISOString().split('T')[0]} 
              />
            </div>
            
            {adjustmentType === 'extension' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="originalTenor">Original Tenor (months)</Label>
                  <Input id="originalTenor" type="number" defaultValue={account.tenor} disabled />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newTenor">New Tenor (months)</Label>
                  <Input id="newTenor" type="number" placeholder="Enter new tenor" />
                </div>
              </div>
            )}
            
            {(adjustmentType === 'extension' || adjustmentType === 'reduction') && (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="originalAmount">Original Monthly Payment</Label>
                  <Input 
                    id="originalAmount" 
                    type="text" 
                    defaultValue={account.monthlyPayment.toString()} 
                    disabled 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newAmount">New Monthly Payment</Label>
                  <Input id="newAmount" type="number" placeholder="Enter new payment amount" />
                </div>
              </div>
            )}
            
            {adjustmentType === 'prepayment' && (
              <div className="grid gap-2">
                <Label htmlFor="prepaymentAmount">Prepayment Amount</Label>
                <Input id="prepaymentAmount" type="number" placeholder="Enter prepayment amount" />
              </div>
            )}
            
            {adjustmentType === 'deferral' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="deferralStart">Deferral Start Date</Label>
                  <Input id="deferralStart" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deferralEnd">Deferral End Date</Label>
                  <Input id="deferralEnd" type="date" />
                </div>
              </div>
            )}
            
            {adjustmentType === 'waiver' && (
              <div className="grid gap-2">
                <Label htmlFor="waiverDate">Waiver Date</Label>
                <Input id="waiverDate" type="date" />
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Adjustment</Label>
              <Textarea 
                id="reason" 
                placeholder="Provide detailed reason for the requested adjustment"
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="document">Supporting Document (if any)</Label>
              <Input id="document" type="file" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowNewAdjustmentDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmitAdjustment}>
              Submit for Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountModifications;
