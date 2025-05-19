
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { mockSubsidies } from '@/data/mockFinanceData';
import { Subsidy, SubsidyType, SubsidyApplication } from '@/types/finance';
import { Search, Plus, FileText, Building, BriefcaseBusiness, Award } from 'lucide-react';

const SubsidyModule = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'expired':
        return <Badge variant="outline">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSubsidyTypeIcon = (type: SubsidyType) => {
    switch (type) {
      case 'government':
        return <Building className="h-5 w-5 text-blue-600" />;
      case 'employer':
        return <BriefcaseBusiness className="h-5 w-5 text-purple-600" />;
      case 'charity':
        return <Award className="h-5 w-5 text-amber-600" />;
      case 'other':
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredSubsidies = mockSubsidies.filter((subsidy) => {
    const matchesSearch = 
      subsidy.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subsidy.mortgageId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subsidy.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || subsidy.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate total subsidy amount
  const totalSubsidyAmount = mockSubsidies.reduce((total, subsidy) => total + subsidy.amount, 0);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Subsidy & Grant Management</CardTitle>
              <CardDescription>
                Track government subsidies and grants for housing
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Subsidy
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Register New Subsidy</DialogTitle>
                  <DialogDescription>
                    Add a new subsidy or grant to an eligible mortgage
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="mortgage">Mortgage ID</Label>
                    <Select>
                      <SelectTrigger id="mortgage">
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
                    <Label htmlFor="subsidyType">Subsidy Type</Label>
                    <Select>
                      <SelectTrigger id="subsidyType">
                        <SelectValue placeholder="Select subsidy type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="employer">Employer</SelectItem>
                        <SelectItem value="charity">Charity</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="provider">Provider</Label>
                    <Input id="provider" placeholder="Name of subsidy provider" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" placeholder="Enter subsidy amount" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Application</Label>
                    <RadioGroup defaultValue="principal">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="principal" id="principal" />
                        <Label htmlFor="principal">Principal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="profit" id="profit" />
                        <Label htmlFor="profit">Profit</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both">Both</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input id="notes" placeholder="Additional information" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => {
                    toast({
                      title: "Subsidy Registered",
                      description: "The subsidy has been successfully registered",
                    });
                  }}>
                    Register Subsidy
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
                  <div>
                    <h3 className="font-medium text-blue-800">Total Subsidy Amount</h3>
                    <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalSubsidyAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700">
                      Subsidies help reduce the cost burden on customers and make housing more affordable.
                      All subsidies are applied according to Shariah compliant principles.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subsidies..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            {filteredSubsidies.length === 0 ? (
              <div className="text-center p-6 border rounded-md">
                <p className="text-muted-foreground">No subsidies found matching your criteria</p>
              </div>
            ) : (
              filteredSubsidies.map((subsidy) => (
                <Card key={subsidy.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="p-4 border-l-4 border-blue-500">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex gap-4 items-start">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            {getSubsidyTypeIcon(subsidy.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{subsidy.id}</h3>
                              {getStatusBadge(subsidy.status)}
                            </div>
                            <p className="text-sm mt-1">{subsidy.provider}</p>
                            <p className="text-sm text-muted-foreground">Mortgage: {subsidy.mortgageId}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
                              <div>
                                <span className="text-muted-foreground">Amount:</span>{' '}
                                <span className="font-medium">{formatCurrency(subsidy.amount)}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Applied to:</span>{' '}
                                <span className="font-medium capitalize">{subsidy.applicationTo}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Start Date:</span>{' '}
                                <span className="font-medium">{format(new Date(subsidy.startDate), 'MMM dd, yyyy')}</span>
                              </div>
                              {subsidy.endDate && (
                                <div>
                                  <span className="text-muted-foreground">End Date:</span>{' '}
                                  <span className="font-medium">{format(new Date(subsidy.endDate), 'MMM dd, yyyy')}</span>
                                </div>
                              )}
                              {subsidy.frequency && (
                                <div>
                                  <span className="text-muted-foreground">Frequency:</span>{' '}
                                  <span className="font-medium capitalize">{subsidy.frequency}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 self-start md:self-center mt-4 md:mt-0">
                          <Button variant="outline" size="sm">View Details</Button>
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
    </div>
  );
};

export default SubsidyModule;
