
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { FileText, Scale, CheckCircle, AlertTriangle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface LegalDashboardProps {
  region?: string;
}

const LegalDashboard: React.FC<LegalDashboardProps> = ({ region = 'Global' }) => {
  // Mock data for contract status
  const contractData = [
    { name: 'Drafted', value: 45, color: '#93C5FD' },
    { name: 'Pending Signatures', value: 28, color: '#FCD34D' },
    { name: 'Fully Executed', value: 187, color: '#6EE7B7' },
    { name: 'Amendments Needed', value: 12, color: '#F87171' },
  ];

  // Mock data for ownership transfers
  const transferData = [
    { month: 'Jan', initiated: 8, completed: 5, disputed: 1 },
    { month: 'Feb', initiated: 12, completed: 7, disputed: 0 },
    { month: 'Mar', initiated: 10, completed: 9, disputed: 2 },
    { month: 'Apr', initiated: 15, completed: 11, disputed: 1 },
    { month: 'May', initiated: 18, completed: 14, disputed: 1 },
    { month: 'Jun', initiated: 22, completed: 16, disputed: 0 },
  ];

  // Mock data for legal compliance
  const complianceScore = 94;

  // Mock data for recent legal issues
  const legalIssues = [
    {
      id: 'LEG-2023-0045',
      type: 'contract_dispute',
      customer: 'Ibrahim Mohammed',
      property: 'Asokoro Heights, Apt 12',
      status: 'pending',
      priority: 'high',
      openDate: '2023-05-12',
    },
    {
      id: 'LEG-2023-0046',
      type: 'ownership_dispute',
      customer: 'Fatima Aliyu',
      property: 'Gwarinpa Estate, Block 8',
      status: 'in_review',
      priority: 'medium',
      openDate: '2023-05-15',
    },
    {
      id: 'LEG-2023-0047',
      type: 'beneficiary_change',
      customer: 'John Okafor',
      property: 'Wuse II Apartments, Unit 5',
      status: 'resolved',
      priority: 'low',
      openDate: '2023-05-16',
    },
  ];

  // Helper function for priority badge class
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Helper function for status badge class
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'in_review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Legal Department Dashboard</CardTitle>
          <CardDescription>Contracts, ownership transfers, and compliance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-blue-50 border-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    28 pending
                  </span>
                </div>
                <p className="text-lg font-bold mt-3">272</p>
                <p className="text-sm font-medium text-muted-foreground">Total Contracts</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    +16 this month
                  </span>
                </div>
                <p className="text-lg font-bold mt-3">62</p>
                <p className="text-sm font-medium text-muted-foreground">Ownership Transfers</p>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50 border-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    5 high priority
                  </span>
                </div>
                <p className="text-lg font-bold mt-3">17</p>
                <p className="text-sm font-medium text-muted-foreground">Open Legal Issues</p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <Scale className="h-5 w-5 text-purple-600" />
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    Target: 95%
                  </span>
                </div>
                <p className="text-lg font-bold mt-3">{complianceScore}%</p>
                <p className="text-sm font-medium text-muted-foreground">Compliance Score</p>
                <Progress value={complianceScore} className="h-1 mt-2" />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contract Status</CardTitle>
            <CardDescription>Current status of all lease contracts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contractData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {contractData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ownership Transfers</CardTitle>
            <CardDescription>Monthly transfer initiation and completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={transferData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="initiated" fill="#93C5FD" name="Initiated" />
                  <Bar dataKey="completed" fill="#6EE7B7" name="Completed" />
                  <Bar dataKey="disputed" fill="#F87171" name="Disputed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Legal Issues</CardTitle>
          <CardDescription>Active issues requiring legal attention</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Open Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {legalIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">{issue.id}</TableCell>
                  <TableCell>{issue.type.replace('_', ' ')}</TableCell>
                  <TableCell>{issue.customer}</TableCell>
                  <TableCell>{issue.property}</TableCell>
                  <TableCell>
                    <Badge className={getStatusClass(issue.status)}>
                      {issue.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityClass(issue.priority)}>
                      {issue.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{issue.openDate}</TableCell>
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
