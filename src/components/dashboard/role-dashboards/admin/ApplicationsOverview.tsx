
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, ArrowRight } from 'lucide-react';

interface ApplicationsOverviewProps {
  region: string;
}

// Mock data for recent applications
const recentApplications = [
  {
    id: 'APP-7839',
    customer: 'Ahmed Abubakar',
    propertyType: 'Apartment',
    location: 'Abuja',
    status: 'in_review',
    submittedDate: '2024-05-16',
    amount: '₦15,500,000'
  },
  {
    id: 'APP-7823',
    customer: 'Fatima Hassan',
    propertyType: 'Duplex',
    location: 'Lagos',
    status: 'pending_documents',
    submittedDate: '2024-05-15',
    amount: '₦22,800,000'
  },
  {
    id: 'APP-7811',
    customer: 'Chioma Okeke',
    propertyType: 'Bungalow',
    location: 'Enugu',
    status: 'approved',
    submittedDate: '2024-05-13',
    amount: '₦18,200,000'
  },
  {
    id: 'APP-7804',
    customer: 'Mohammed Ibrahim',
    propertyType: 'Terrace',
    location: 'Kano',
    status: 'rejected',
    submittedDate: '2024-05-12',
    amount: '₦20,500,000'
  },
  {
    id: 'APP-7798',
    customer: 'Grace Adeyemi',
    propertyType: 'Semi-Detached',
    location: 'Ibadan',
    status: 'approved',
    submittedDate: '2024-05-11',
    amount: '₦17,300,000'
  }
];

const ApplicationsOverview: React.FC<ApplicationsOverviewProps> = ({ region }) => {
  // Function to get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'in_review':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">In Review</Badge>;
      case 'pending_documents':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pending Docs</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Filter applications by region if specified
  const filteredApplications = region !== 'All Regions' 
    ? recentApplications.filter(app => app.location === region)
    : recentApplications;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest mortgage applications submitted</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.id}</TableCell>
                <TableCell>{application.customer}</TableCell>
                <TableCell>{application.propertyType}</TableCell>
                <TableCell>{application.location}</TableCell>
                <TableCell>{application.amount}</TableCell>
                <TableCell>{getStatusBadge(application.status)}</TableCell>
                <TableCell className="flex items-center">
                  <CalendarDays className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">
                    {new Date(application.submittedDate).toLocaleDateString()}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredApplications.length} of {recentApplications.length} applications
        </p>
        <Button variant="ghost" size="sm">
          View All <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApplicationsOverview;
