
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  User, 
  Home, 
  MapPin, 
  DollarSign, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

interface AllocationEngineProps {
  searchQuery?: string;
}

const AllocationEngine: React.FC<AllocationEngineProps> = ({ searchQuery }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [selectedProperty, setSelectedProperty] = useState<string>('');

  // Mock data for pending allocations
  const pendingAllocations = [
    {
      id: 'ALLOC-001',
      customerName: 'Ahmed Musa',
      customerId: 'CUST-2023-001',
      requestedPropertyType: 'apartment',
      budget: 45000000,
      location: 'Lagos',
      priority: 'high',
      score: 92,
      status: 'pending',
      requestDate: '2023-11-15',
    },
    {
      id: 'ALLOC-002',
      customerName: 'Fatima Ibrahim',
      customerId: 'CUST-2023-002',
      requestedPropertyType: 'duplex',
      budget: 65000000,
      location: 'Abuja',
      priority: 'medium',
      score: 87,
      status: 'in-progress',
      requestDate: '2023-11-14',
    },
  ];

  // Mock data for available properties
  const availableProperties = [
    {
      id: 'PROP-001',
      name: 'Sunset Villa Estate',
      type: 'apartment',
      location: 'Lagos, Victoria Island',
      value: 45000000,
      availableUnits: 12,
      matchScore: 95,
    },
    {
      id: 'PROP-002',
      name: 'Green Valley Heights',
      type: 'duplex',
      location: 'Abuja, Gwarinpa',
      value: 65000000,
      availableUnits: 6,
      matchScore: 89,
    },
  ];

  // Mock data for recent allocations
  const recentAllocations = [
    {
      id: 'ALLOC-003',
      customerName: 'Usman Bello',
      propertyName: 'Royal Gardens',
      unitNumber: 'RG-A-12',
      allocationDate: '2023-11-10',
      value: 38000000,
      status: 'completed',
    },
    {
      id: 'ALLOC-004',
      customerName: 'Aisha Mohammed',
      propertyName: 'Harmony Towers',
      unitNumber: 'HT-B-08',
      allocationDate: '2023-11-08',
      value: 32000000,
      status: 'completed',
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high': return <Badge variant="destructive">High Priority</Badge>;
      case 'medium': return <Badge variant="outline">Medium Priority</Badge>;
      case 'low': return <Badge variant="secondary">Low Priority</Badge>;
      default: return <Badge>{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      );
      case 'in-progress': return (
        <Badge variant="outline" className="flex items-center gap-1 border-orange-500 text-orange-700">
          <AlertCircle className="h-3 w-3" />
          In Progress
        </Badge>
      );
      case 'completed': return (
        <Badge variant="default" className="flex items-center gap-1 bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3" />
          Completed
        </Badge>
      );
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Allocation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-2xl font-bold text-orange-600">12</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">8</p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Today</p>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-green-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Allocations</TabsTrigger>
          <TabsTrigger value="matcher">Smart Matcher</TabsTrigger>
          <TabsTrigger value="recent">Recent Allocations</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Allocation Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingAllocations.map((allocation) => (
                  <div key={allocation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{allocation.customerName}</h4>
                        <p className="text-sm text-muted-foreground">{allocation.customerId}</p>
                      </div>
                      <div className="flex gap-2">
                        {getPriorityBadge(allocation.priority)}
                        {getStatusBadge(allocation.status)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Property Type</p>
                        <p className="text-sm font-medium capitalize">{allocation.requestedPropertyType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Budget</p>
                        <p className="text-sm font-medium">₦{allocation.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium">{allocation.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Match Score</p>
                        <div className="flex items-center gap-2">
                          <Progress value={allocation.score} className="h-2 flex-1" />
                          <span className="text-sm font-medium">{allocation.score}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        Requested: {new Date(allocation.requestDate).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button size="sm">Find Matches</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matcher" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Smart Property Matcher</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Customer Selection</h4>
                  <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {pendingAllocations.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.customerName} - {customer.requestedPropertyType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Property Matches</h4>
                  {selectedCustomer && (
                    <div className="space-y-3">
                      {availableProperties.map((property) => (
                        <div key={property.id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-medium">{property.name}</h5>
                              <p className="text-sm text-muted-foreground">{property.location}</p>
                            </div>
                            <Badge variant="outline" className="text-green-600">
                              {property.matchScore}% Match
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">₦{property.value.toLocaleString()}</span>
                            <Button size="sm">Allocate</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Allocations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAllocations.map((allocation) => (
                  <div key={allocation.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{allocation.customerName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {allocation.propertyName} - Unit {allocation.unitNumber}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Allocated: {new Date(allocation.allocationDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₦{allocation.value.toLocaleString()}</p>
                      {getStatusBadge(allocation.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AllocationEngine;
