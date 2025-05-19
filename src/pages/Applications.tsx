
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockMortgages, mockCustomers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { FilePlus, FileText, FileCheck, FileMinus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import FinanceTypeSelector from '@/components/mortgages/FinanceTypeSelector';

const Applications = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'pending-review':
        return <Badge variant="secondary">Pending Review</Badge>;
      case 'under-assessment':
        return <Badge variant="warning" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Under Assessment</Badge>;
      case 'approved':
        return <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'active':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Active</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mortgage Applications</h1>
            <p className="text-muted-foreground mt-1">
              Process and manage Islamic financing applications
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <FilePlus className="h-4 w-4" />
            New Application
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Application Directory</CardTitle>
                <CardDescription>
                  View and manage all mortgage applications
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border rounded-md">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Customer</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Financing Type</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {mockMortgages.map(mortgage => (
                        <tr key={mortgage.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{mortgage.id}</td>
                          <td className="p-4 align-middle">{mortgage.customerName}</td>
                          <td className="p-4 align-middle capitalize">{mortgage.financingType}</td>
                          <td className="p-4 align-middle">₦{mortgage.amount.toLocaleString()}</td>
                          <td className="p-4 align-middle">
                            {getStatusBadge(mortgage.status)}
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm">Process</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="draft" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Draft Applications</CardTitle>
                <CardDescription>Applications in preparation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMortgages.filter(m => m.status === 'draft').map(mortgage => (
                    <Card key={mortgage.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{mortgage.id}: {mortgage.customerName}</CardTitle>
                          {getStatusBadge(mortgage.status)}
                        </div>
                        <CardDescription>Created: {new Date(mortgage.createdAt).toLocaleDateString()}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 pb-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Financing Type</p>
                            <p className="text-sm capitalize">{mortgage.financingType}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Amount</p>
                            <p className="text-sm">₦{mortgage.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Tenor</p>
                            <p className="text-sm">{mortgage.tenor} months</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Property</p>
                            <p className="text-sm truncate">{mortgage.propertyAddress}</p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button size="sm">Submit for Review</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Applications Pending Review</CardTitle>
                <CardDescription>Applications awaiting assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMortgages.filter(m => m.status === 'pending-review' || m.status === 'under-assessment').map(mortgage => (
                    <Card key={mortgage.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{mortgage.id}: {mortgage.customerName}</CardTitle>
                          {getStatusBadge(mortgage.status)}
                        </div>
                        <CardDescription>Updated: {new Date(mortgage.updatedAt).toLocaleDateString()}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Financing Type</p>
                            <p className="text-sm capitalize">{mortgage.financingType}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Amount</p>
                            <p className="text-sm">₦{mortgage.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Next Action</p>
                            <p className="text-sm">Credit Assessment</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Assigned To</p>
                            <p className="text-sm">Credit Officer</p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button size="sm">Process</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Approved Applications</CardTitle>
                <CardDescription>Applications ready for disbursement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMortgages.filter(m => m.status === 'approved').map(mortgage => (
                    <Card key={mortgage.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{mortgage.id}: {mortgage.customerName}</CardTitle>
                          {getStatusBadge(mortgage.status)}
                        </div>
                        <CardDescription>Approved: {mortgage.approvalDate ? new Date(mortgage.approvalDate).toLocaleDateString() : 'N/A'}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Financing Type</p>
                            <p className="text-sm capitalize">{mortgage.financingType}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Amount</p>
                            <p className="text-sm">₦{mortgage.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Tenor</p>
                            <p className="text-sm">{mortgage.tenor} months</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Next Step</p>
                            <p className="text-sm">Disbursement</p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                          <Button variant="outline" size="sm">View Contract</Button>
                          <Button size="sm">Initiate Disbursement</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Islamic Financing Products</CardTitle>
              <CardDescription>Choose the right Shariah-compliant financing product</CardDescription>
            </CardHeader>
            <CardContent>
              <FinanceTypeSelector />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common application processes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto py-4">
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      <FilePlus className="h-4 w-4" />
                      <span className="font-medium">Create Application</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Start a new mortgage application</span>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4" />
                      <span className="font-medium">Approve Applications</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Review pending applications</span>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium">Generate Contracts</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Create Islamic financing contracts</span>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      <FileMinus className="h-4 w-4" />
                      <span className="font-medium">Manage Documents</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Handle application paperwork</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Applications;
