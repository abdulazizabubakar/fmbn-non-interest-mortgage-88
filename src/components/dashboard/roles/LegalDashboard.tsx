
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const LegalDashboard: React.FC = () => {
  // Mock data for legal dashboard
  const contractStatus = [
    { name: 'Drafted', value: 25, color: '#93C5FD' },
    { name: 'Sent for Signature', value: 18, color: '#60A5FA' },
    { name: 'Signed', value: 42, color: '#34D399' },
    { name: 'Expired', value: 6, color: '#F87171' },
    { name: 'Cancelled', value: 3, color: '#9CA3AF' },
  ];

  const legalCases = [
    { name: 'Default Proceedings', value: 15, color: '#F59E0B' },
    { name: 'Ownership Disputes', value: 8, color: '#EF4444' },
    { name: 'Contract Breaches', value: 12, color: '#6366F1' },
    { name: 'Documentation Issues', value: 19, color: '#8B5CF6' },
    { name: 'Compliance Reviews', value: 27, color: '#EC4899' },
  ];

  const monthlyData = [
    { month: 'Jan', contracts: 18, disputes: 5, transfers: 12 },
    { month: 'Feb', contracts: 22, disputes: 7, transfers: 14 },
    { month: 'Mar', contracts: 25, disputes: 6, transfers: 16 },
    { month: 'Apr', contracts: 28, disputes: 8, transfers: 18 },
    { month: 'May', contracts: 32, disputes: 9, transfers: 21 },
  ];

  const ownershipTransfers = [
    { id: 'TRF-2348', customer: 'Mohammed A.', property: 'Lagos Unit 45B', status: 'processing', stage: 'Document Verification' },
    { id: 'TRF-2347', customer: 'Chidi N.', property: 'Abuja Block 7-2', status: 'completed', stage: 'Registered' },
    { id: 'TRF-2346', customer: 'Aisha K.', property: 'Kano Estate, Plot 12', status: 'processing', stage: 'Payment Verification' },
    { id: 'TRF-2345', customer: 'Samuel O.', property: 'Enugu Heights, F3', status: 'processing', stage: 'Final Review' },
    { id: 'TRF-2344', customer: 'Elizabeth T.', property: 'Port Harcourt, Unit 15C', status: 'completed', stage: 'Registered' },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Processing</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Legal Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Active Contracts</p>
            <h3 className="text-2xl font-bold mt-1">482</h3>
            <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Pending Signatures</p>
            <h3 className="text-2xl font-bold mt-1">18</h3>
            <p className="text-xs text-muted-foreground mt-1">5 require follow-up</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Active Legal Cases</p>
            <h3 className="text-2xl font-bold mt-1">42</h3>
            <p className="text-xs text-muted-foreground mt-1">15 high priority</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Transfers in Progress</p>
            <h3 className="text-2xl font-bold mt-1">24</h3>
            <p className="text-xs text-muted-foreground mt-1">8 near completion</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Contract and Legal Case Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contract Status</CardTitle>
            <CardDescription>Distribution of contracts by current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contractStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {contractStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} contracts`, 'Count']} />
                  <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Legal Cases By Type</CardTitle>
            <CardDescription>Distribution of active legal proceedings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={legalCases}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {legalCases.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} cases`, 'Count']} />
                  <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Activity Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Legal Department Activity</CardTitle>
          <CardDescription>Monthly trends in contracts, disputes, and transfers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                contracts: { label: "New Contracts", color: "#60A5FA" },
                disputes: { label: "Disputes", color: "#F87171" },
                transfers: { label: "Ownership Transfers", color: "#10B981" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="contracts" name="New Contracts" stackId="a" fill="#60A5FA" />
                  <Bar dataKey="disputes" name="Disputes" stackId="a" fill="#F87171" />
                  <Bar dataKey="transfers" name="Ownership Transfers" stackId="a" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Transfers */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Ownership Transfers</CardTitle>
          <CardDescription>Latest property ownership transfer proceedings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Current Stage</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ownershipTransfers.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell className="font-medium">{transfer.id}</TableCell>
                  <TableCell>{transfer.customer}</TableCell>
                  <TableCell>{transfer.property}</TableCell>
                  <TableCell>{transfer.stage}</TableCell>
                  <TableCell className="text-right">{getStatusBadge(transfer.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalDashboard;
