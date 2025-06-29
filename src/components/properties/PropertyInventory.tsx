
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building, MapPin, Eye, Edit, AlertCircle } from 'lucide-react';

interface PropertyInventoryProps {
  searchQuery?: string;
}

const PropertyInventory: React.FC<PropertyInventoryProps> = ({ searchQuery = '' }) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Mock inventory data
  const inventoryData = [
    {
      id: 'PROP-001',
      name: 'Sunset Villa Estate',
      type: 'apartment',
      location: 'Lagos, Victoria Island',
      totalUnits: 48,
      availableUnits: 12,
      allocatedUnits: 28,
      underConstruction: 8,
      value: 45000000,
      status: 'available',
      completionRate: 85,
      developer: 'Unity Homes Ltd',
    },
    {
      id: 'PROP-002',
      name: 'Green Valley Heights',
      type: 'duplex',
      location: 'Abuja, Gwarinpa',
      totalUnits: 24,
      availableUnits: 6,
      allocatedUnits: 18,
      underConstruction: 0,
      value: 65000000,
      status: 'allocated',
      completionRate: 100,
      developer: 'Kabash Developers',
    },
    {
      id: 'PROP-003',
      name: 'Harmony Towers',
      type: 'apartment',
      location: 'Kano, Nassarawa',
      totalUnits: 36,
      availableUnits: 0,
      allocatedUnits: 20,
      underConstruction: 16,
      value: 32000000,
      status: 'under-construction',
      completionRate: 45,
      developer: 'Northern Housing',
    },
    {
      id: 'PROP-004',
      name: 'Royal Gardens',
      type: 'bungalow',
      location: 'Rivers, Port Harcourt',
      totalUnits: 15,
      availableUnits: 8,
      allocatedUnits: 7,
      underConstruction: 0,
      value: 38000000,
      status: 'available',
      completionRate: 100,
      developer: 'Adkan Properties',
    },
  ];

  // Filter data based on search query and filters
  const filteredData = inventoryData.filter(property => {
    const matchesSearch = 
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' ? true : property.status === statusFilter;
    const matchesType = typeFilter === 'all' ? true : property.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'available': return <Badge variant="default" className="bg-green-100 text-green-800">Available</Badge>;
      case 'allocated': return <Badge variant="outline" className="border-blue-500 text-blue-700">Allocated</Badge>;
      case 'under-construction': return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Under Construction</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getOccupancyRate = (allocated: number, total: number) => {
    return Math.round((allocated / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Properties</p>
                <p className="text-2xl font-bold">{inventoryData.length}</p>
              </div>
              <Building className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Units</p>
                <p className="text-2xl font-bold text-green-600">
                  {inventoryData.reduce((sum, prop) => sum + prop.availableUnits, 0)}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-green-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Allocated Units</p>
                <p className="text-2xl font-bold text-blue-600">
                  {inventoryData.reduce((sum, prop) => sum + prop.allocatedUnits, 0)}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-blue-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Under Construction</p>
                <p className="text-2xl font-bold text-orange-600">
                  {inventoryData.reduce((sum, prop) => sum + prop.underConstruction, 0)}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="allocated">Allocated</SelectItem>
            <SelectItem value="under-construction">Under Construction</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="duplex">Duplex</SelectItem>
            <SelectItem value="bungalow">Bungalow</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline">Export Inventory</Button>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Property Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{property.name}</p>
                      <p className="text-sm text-muted-foreground">{property.id}</p>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{property.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {property.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="text-green-600">{property.availableUnits} Available</div>
                      <div className="text-blue-600">{property.allocatedUnits} Allocated</div>
                      <div className="text-orange-600">{property.underConstruction} Construction</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{getOccupancyRate(property.allocatedUnits, property.totalUnits)}%</div>
                      <Progress value={getOccupancyRate(property.allocatedUnits, property.totalUnits)} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>₦{property.value.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(property.status)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{property.completionRate}%</div>
                      <Progress value={property.completionRate} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
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

export default PropertyInventory;
