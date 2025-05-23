
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building, CheckCircle, Home } from 'lucide-react';

const DeveloperDashboard = () => {
  // Mock data for project completion
  const projectCompletionData = [
    { month: 'Jan', planned: 10, actual: 8 },
    { month: 'Feb', planned: 20, actual: 18 },
    { month: 'Mar', planned: 30, actual: 29 },
    { month: 'Apr', planned: 45, actual: 42 },
    { month: 'May', planned: 60, actual: 56 },
    { month: 'Jun', planned: 75, actual: 70 },
  ];

  // Mock data for property status
  const propertySubmissionData = [
    { month: 'Jan', submitted: 24, approved: 18, rejected: 2 },
    { month: 'Feb', submitted: 32, approved: 26, rejected: 3 },
    { month: 'Mar', submitted: 28, approved: 23, rejected: 1 },
    { month: 'Apr', submitted: 35, approved: 30, rejected: 2 },
    { month: 'May', submitted: 42, approved: 36, rejected: 3 },
    { month: 'Jun', submitted: 38, approved: 33, rejected: 1 },
  ];

  // Mock data for submitted properties
  const submittedProperties = [
    { 
      id: 'DEV-1045', 
      name: 'Greenfield Apartments', 
      location: 'FCT Abuja', 
      units: 48, 
      status: 'approved',
      progress: 72, 
      date: '2023-05-12'
    },
    { 
      id: 'DEV-1089', 
      name: 'Sunrise Estate', 
      location: 'Lagos', 
      units: 36, 
      status: 'in_review',
      progress: 45, 
      date: '2023-05-18'
    },
    { 
      id: 'DEV-1102', 
      name: 'Oakwood Residences', 
      location: 'Rivers', 
      units: 24, 
      status: 'approved',
      progress: 92, 
      date: '2023-05-05'
    },
    { 
      id: 'DEV-1115', 
      name: 'Magnolia Heights', 
      location: 'Kaduna', 
      units: 42, 
      status: 'pending',
      progress: 10, 
      date: '2023-05-22'
    },
  ];

  // Helper function for status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Developer Dashboard</CardTitle>
          <CardDescription>Property submissions, approvals, and construction status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    +38 this month
                  </span>
                </div>
                <p className="text-lg font-bold mt-3">198</p>
                <p className="text-sm font-medium text-muted-foreground">Properties Submitted</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    +33 this month
                  </span>
                </div>
                <p className="text-lg font-bold mt-3">166</p>
                <p className="text-sm font-medium text-muted-foreground">Approved Properties</p>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50 border-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <Home className="h-5 w-5 text-amber-600" />
                  <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    63% overall
                  </span>
                </div>
                <p className="text-lg font-bold mt-3">70%</p>
                <p className="text-sm font-medium text-muted-foreground">Construction Progress</p>
                <Progress value={70} className="h-1 mt-2" />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Completion</CardTitle>
            <CardDescription>Planned vs. actual construction progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={projectCompletionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Completion %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="planned"
                    stroke="#3B82F6"
                    activeDot={{ r: 8 }}
                    name="Planned"
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#10B981"
                    name="Actual"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Submission Status</CardTitle>
            <CardDescription>Submission, approvals, and rejections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={propertySubmissionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="submitted" fill="#3B82F6" name="Submitted" />
                  <Bar dataKey="approved" fill="#10B981" name="Approved" />
                  <Bar dataKey="rejected" fill="#F87171" name="Rejected" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Property Submissions</CardTitle>
          <CardDescription>Status of your recently submitted properties</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Submission Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submittedProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.id}</TableCell>
                  <TableCell>{property.name}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.units}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(property.status)}>
                      {property.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={property.progress} className="h-2 w-16" />
                      <span>{property.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{property.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperDashboard;
