
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCustomers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Receipt, UserPlus, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Customers = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage customer onboarding and KYC processes
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add New Customer
          </Button>
        </div>

        <Tabs defaultValue="customers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="customers">All Customers</TabsTrigger>
            <TabsTrigger value="pending">Pending KYC</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Customer Directory</CardTitle>
                <CardDescription>
                  View and manage all registered customers in the system
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border rounded-md">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Phone</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Income</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {mockCustomers.map(customer => (
                        <tr key={customer.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">{customer.name}</td>
                          <td className="p-4 align-middle">{customer.email}</td>
                          <td className="p-4 align-middle">{customer.phone}</td>
                          <td className="p-4 align-middle">₦{customer.monthlyIncome.toLocaleString()}</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border-green-200">
                              Verified
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm">Edit</Button>
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

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending KYC Verification</CardTitle>
                <CardDescription>Customers awaiting document verification</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">No pending KYC verifications found.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verified" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Verified Customers</CardTitle>
                <CardDescription>Customers with completed KYC</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockCustomers.map(customer => (
                    <Card key={customer.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{customer.name}</CardTitle>
                        <CardDescription>{customer.email}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">BVN:</span>
                          <span>{customer.bvn}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Income:</span>
                          <span>₦{customer.monthlyIncome.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Joined:</span>
                          <span>{new Date(customer.createdAt).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Repository</CardTitle>
                <CardDescription>Customer KYC documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Receipt className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Identity Documents</p>
                        <p className="text-sm text-muted-foreground">National IDs, Passports, Driver's Licenses</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Income Verification</p>
                        <p className="text-sm text-muted-foreground">Payslips, Bank Statements, Tax Returns</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Customers;
