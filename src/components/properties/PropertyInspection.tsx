
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PropertyInspectionProps {
  searchQuery?: string;
}

const PropertyInspection: React.FC<PropertyInspectionProps> = ({ searchQuery }) => {
  // Mock inspection data
  const inspections = [
    {
      id: "INS-2023-001",
      propertyId: "PROP-45678",
      propertyAddress: "Kaduna Housing Estate, Block A3",
      scheduledDate: "2023-05-15",
      status: "completed",
      inspector: "Ahmed Ibrahim",
      type: "Pre-handover",
      report: "Inspection passed with minor fixes required"
    },
    {
      id: "INS-2023-002",
      propertyId: "PROP-45679",
      propertyAddress: "Lagos Modern Homes, Tower 2, Flat 4B",
      scheduledDate: "2023-05-18",
      status: "scheduled",
      inspector: "Funmi Adeyemi",
      type: "Construction Progress",
      report: ""
    },
    {
      id: "INS-2023-003",
      propertyId: "PROP-45680",
      propertyAddress: "Abuja Green Estate, Duplex 5",
      scheduledDate: "2023-05-20",
      status: "cancelled",
      inspector: "Ibrahim Musa",
      type: "Maintenance Review",
      report: "Inspection cancelled due to weather conditions"
    },
    {
      id: "INS-2023-004",
      propertyId: "PROP-45681",
      propertyAddress: "Rivers State Residences, Block C2",
      scheduledDate: "2023-05-22",
      status: "pending",
      inspector: "Chioma Okafor",
      type: "Quality Assurance",
      report: ""
    },
  ];

  // Filter inspections based on search query
  const filteredInspections = searchQuery 
    ? inspections.filter(inspection => 
        inspection.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inspection.propertyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inspection.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : inspections;

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed': return <Badge variant="default">Completed</Badge>;
      case 'scheduled': return <Badge variant="outline">Scheduled</Badge>;
      case 'pending': return <Badge variant="secondary">Pending</Badge>;
      case 'cancelled': return <Badge variant="destructive">Cancelled</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Property Inspections</h2>
        <Button>Schedule New Inspection</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming & Recent Inspections</CardTitle>
          <CardDescription>
            Track property inspections, their statuses, and outcomes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Inspection ID</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Inspector</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInspections.map((inspection) => (
                <TableRow key={inspection.id}>
                  <TableCell className="font-medium">{inspection.id}</TableCell>
                  <TableCell>
                    <div>
                      <p>{inspection.propertyAddress}</p>
                      <p className="text-xs text-muted-foreground">{inspection.propertyId}</p>
                    </div>
                  </TableCell>
                  <TableCell>{inspection.scheduledDate}</TableCell>
                  <TableCell>{inspection.inspector}</TableCell>
                  <TableCell>{inspection.type}</TableCell>
                  <TableCell>{getStatusBadge(inspection.status)}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={inspection.status !== 'completed'}
                    >
                      {inspection.status === 'completed' ? 'View Report' : 'N/A'}
                    </Button>
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

export default PropertyInspection;
