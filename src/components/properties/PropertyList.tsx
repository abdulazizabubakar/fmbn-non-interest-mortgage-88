
import React, { useState } from 'react';
import { mockProperties } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, Home, Users, FileText, Eye } from 'lucide-react';
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
import { Property } from '@/types';

interface PropertyListProps {
  searchQuery?: string;
}

const PropertyList: React.FC<PropertyListProps> = ({ searchQuery = '' }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter properties based on search query and status filter
  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = 
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' ? true : property.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Enhanced property data with status
  const enhancedProperties = filteredProperties.map(property => ({
    ...property,
    status: ['available', 'allocated', 'under-construction', 'maintenance'][Math.floor(Math.random() * 4)],
    developer: ['Adkan Properties', 'Unity Homes', 'Kabash Developers', 'Northern Housing'][Math.floor(Math.random() * 4)],
    units: Math.floor(Math.random() * 20) + 1,
    completionDate: new Date(Date.now() + (Math.random() * 10000000000)).toLocaleDateString()
  }));

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'available': return 'default';
      case 'allocated': return 'outline';
      case 'under-construction': return 'secondary';
      case 'maintenance': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </Button>
          <Button 
            variant={viewMode === 'table' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setViewMode('table')}
          >
            Table View
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="allocated">Allocated</SelectItem>
              <SelectItem value="under-construction">Under Construction</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export List
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enhancedProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                <img 
                  src={property.images[0]} 
                  alt={property.address}
                  className="object-cover w-full h-full" 
                />
                <Badge 
                  className="absolute top-2 right-2" 
                  variant={getStatusBadgeVariant(property.status)}
                >
                  {property.status === 'under-construction' ? 'Under Construction' : 
                   property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{property.address}</CardTitle>
                    <CardDescription>ID: {property.id}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="font-medium">Value</p>
                    <p>₦{property.value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium">Units</p>
                    <p>{property.units} units</p>
                  </div>
                  <div>
                    <p className="font-medium">Developer</p>
                    <p>{property.developer}</p>
                  </div>
                  <div>
                    <p className="font-medium">Completion</p>
                    <p>{property.completionDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mt-3 text-muted-foreground text-xs">
                  <MapPin className="h-3 w-3" />
                  <span>{property.address.split(',').slice(-2).join(',').trim()}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="gap-1">
                  <Users className="h-3.5 w-3.5" />
                  Allocations
                </Button>
                <Button size="sm">
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property ID</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Developer</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enhancedProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">{property.id}</TableCell>
                    <TableCell>{property.address}</TableCell>
                    <TableCell>{property.type}</TableCell>
                    <TableCell>{property.developer}</TableCell>
                    <TableCell>{property.units}</TableCell>
                    <TableCell>₦{property.value.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(property.status)}>
                        {property.status === 'under-construction' ? 'Under Construction' : 
                         property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3.5 w-3.5" />
                          <span className="sr-only">View details</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="sr-only">View on map</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertyList;
