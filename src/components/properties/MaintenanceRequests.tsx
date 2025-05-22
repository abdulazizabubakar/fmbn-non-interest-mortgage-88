
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MaintenanceRequestsProps {
  searchQuery?: string;
}

const MaintenanceRequests: React.FC<MaintenanceRequestsProps> = ({ searchQuery }) => {
  // Mock maintenance data
  const maintenanceRequests = [
    {
      id: "MNT-2023-001",
      propertyId: "PROP-45678",
      propertyUnit: "Block A3, Unit 5",
      issue: "Plumbing leak in bathroom",
      priority: "high",
      requestDate: "2023-05-10",
      status: "in-progress",
      assignee: "Mohammed Yusuf",
      assigneeAvatar: "MY",
    },
    {
      id: "MNT-2023-002",
      propertyId: "PROP-45679",
      propertyUnit: "Tower 2, Flat 4B",
      issue: "Electrical fault in kitchen",
      priority: "critical",
      requestDate: "2023-05-12",
      status: "pending",
      assignee: "",
      assigneeAvatar: "",
    },
    {
      id: "MNT-2023-003",
      propertyId: "PROP-45680",
      propertyUnit: "Duplex 5",
      issue: "Broken window in living room",
      priority: "medium",
      requestDate: "2023-05-14",
      status: "completed",
      assignee: "Amina Bello",
      assigneeAvatar: "AB",
    },
    {
      id: "MNT-2023-004",
      propertyId: "PROP-45681",
      propertyUnit: "Block C2, Unit 8",
      issue: "AC unit not cooling",
      priority: "low",
      requestDate: "2023-05-16",
      status: "scheduled",
      assignee: "David Okonkwo",
      assigneeAvatar: "DO",
    },
  ];

  // Filter maintenance requests based on search query
  const filteredRequests = searchQuery 
    ? maintenanceRequests.filter(request => 
        request.propertyUnit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.propertyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.issue.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : maintenanceRequests;

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed': return <Badge variant="default">Completed</Badge>;
      case 'in-progress': return <Badge variant="secondary">In Progress</Badge>;
      case 'scheduled': return <Badge variant="outline">Scheduled</Badge>;
      case 'pending': return <Badge className="bg-amber-600">Pending</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'critical': return <Badge variant="destructive">Critical</Badge>;
      case 'high': return <Badge className="bg-red-500">High</Badge>;
      case 'medium': return <Badge className="bg-amber-500">Medium</Badge>;
      case 'low': return <Badge className="bg-green-500">Low</Badge>;
      default: return <Badge>{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Maintenance Requests</h2>
        <Button>Create New Request</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Property Maintenance</CardTitle>
          <CardDescription>
            Track and manage maintenance requests for properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Property Unit</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>
                    <div>
                      <p>{request.propertyUnit}</p>
                      <p className="text-xs text-muted-foreground">{request.propertyId}</p>
                    </div>
                  </TableCell>
                  <TableCell>{request.issue}</TableCell>
                  <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    {request.assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{request.assigneeAvatar}</AvatarFallback>
                        </Avatar>
                        <span>{request.assignee}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceRequests;
