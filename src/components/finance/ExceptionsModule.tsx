
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { mockExceptions } from '@/data/mockFinanceData';
import { ExceptionType, ExceptionStatus, FinancialException } from '@/types/finance';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { Search, AlertCircle, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';

const ExceptionsModule = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedException, setSelectedException] = useState<FinancialException | null>(null);
  const [showResolveDialog, setShowResolveDialog] = useState(false);

  const getStatusBadge = (status: ExceptionStatus) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Open</Badge>;
      case 'in-progress':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Progress</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>;
      case 'escalated':
        return <Badge variant="destructive">Escalated</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getExceptionTypeIcon = (type: ExceptionType) => {
    switch (type) {
      case 'rejected-payment':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'partial-payment':
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case 'duplicate-transaction':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'reconciliation-mismatch':
        return <AlertCircle className="h-5 w-5 text-purple-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleResolve = (exception: FinancialException) => {
    setSelectedException(exception);
    setShowResolveDialog(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredExceptions = mockExceptions.filter((exception) => {
    const matchesSearch = 
      exception.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exception.relatedEntityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exception.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || exception.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const openExceptions = mockExceptions.filter(e => e.status === 'open').length;
  const inProgressExceptions = mockExceptions.filter(e => e.status === 'in-progress').length;
  const resolvedExceptions = mockExceptions.filter(e => e.status === 'resolved').length;
  const escalatedExceptions = mockExceptions.filter(e => e.status === 'escalated').length;

  const getExceptionTypeName = (type: ExceptionType): string => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-4">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-red-50">
          <CardContent className="py-4 px-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-red-800">Open</p>
                <p className="text-2xl font-bold text-red-900">{openExceptions}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50">
          <CardContent className="py-4 px-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-amber-800">In Progress</p>
                <p className="text-2xl font-bold text-amber-900">{inProgressExceptions}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardContent className="py-4 px-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-green-800">Resolved</p>
                <p className="text-2xl font-bold text-green-900">{resolvedExceptions}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardContent className="py-4 px-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-purple-800">Escalated</p>
                <p className="text-2xl font-bold text-purple-900">{escalatedExceptions}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Exceptions</CardTitle>
          <CardDescription>
            Track and resolve payment issues and financial discrepancies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exceptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-9 w-full sm:w-[300px]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] h-9">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            {filteredExceptions.length === 0 ? (
              <div className="text-center p-6 border rounded-md">
                <p className="text-muted-foreground">No exceptions found matching your criteria</p>
              </div>
            ) : (
              filteredExceptions.map((exception) => (
                <Card key={exception.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="p-4 border-l-4 border-red-500">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex gap-4 items-start">
                          <div className="p-2 bg-red-50 rounded-lg">
                            {getExceptionTypeIcon(exception.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{exception.id}</h3>
                              {getStatusBadge(exception.status)}
                            </div>
                            <p className="text-sm mt-1">{getExceptionTypeName(exception.type)}</p>
                            <p className="text-sm mt-0.5">{exception.description}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
                              <div>
                                <span className="text-muted-foreground">Entity:</span>{' '}
                                <span className="font-medium">{exception.relatedEntityId} ({exception.relatedEntityType})</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Amount:</span>{' '}
                                <span className="font-medium">{formatCurrency(exception.amount)}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Raised:</span>{' '}
                                <span className="font-medium">
                                  {format(new Date(exception.raisedAt), 'MMM dd, yyyy')} by {exception.raisedBy}
                                </span>
                              </div>
                              {exception.status === 'resolved' && exception.resolvedAt && (
                                <div>
                                  <span className="text-muted-foreground">Resolved:</span>{' '}
                                  <span className="font-medium">
                                    {format(new Date(exception.resolvedAt), 'MMM dd, yyyy')} by {exception.resolvedBy}
                                  </span>
                                </div>
                              )}
                            </div>
                            {exception.resolution && (
                              <p className="text-xs bg-gray-50 p-2 mt-2 rounded">
                                <span className="font-medium">Resolution:</span> {exception.resolution}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0 self-start md:self-center mt-4 md:mt-0">
                          {(exception.status === 'open' || exception.status === 'in-progress') ? (
                            <div className="flex gap-2">
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleResolve(exception)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Resolve
                              </Button>
                              <Button variant="outline" size="sm">
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Escalate
                              </Button>
                            </div>
                          ) : (
                            <Button variant="outline" size="sm">View Details</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Resolve Exception Dialog */}
      {selectedException && (
        <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Resolve Exception - {selectedException.id}</DialogTitle>
              <DialogDescription>
                Provide resolution details for this financial exception
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Exception Type</Label>
                <Input value={getExceptionTypeName(selectedException.type)} disabled />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input value={selectedException.description} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resolution">Resolution</Label>
                <Textarea
                  id="resolution"
                  placeholder="Describe how this exception was resolved"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="resolvedDate">Resolution Date</Label>
                  <Input id="resolvedDate" type="date" defaultValue={format(new Date(), 'yyyy-MM-dd')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resolutionAction">Action Taken</Label>
                  <Select defaultValue="adjusted">
                    <SelectTrigger id="resolutionAction">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adjusted">Amount Adjusted</SelectItem>
                      <SelectItem value="corrected">Data Corrected</SelectItem>
                      <SelectItem value="reprocessed">Payment Reprocessed</SelectItem>
                      <SelectItem value="cancelled">Transaction Cancelled</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => {
                setShowResolveDialog(false);
                toast({
                  title: "Exception Resolved",
                  description: `Exception ${selectedException.id} has been marked as resolved`,
                });
              }}>
                Confirm Resolution
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ExceptionsModule;
