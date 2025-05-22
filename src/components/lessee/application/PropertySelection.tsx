
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProperties } from '@/data/mockData';

export const PropertySelection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  
  // Filter properties based on search term and selected state
  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = !searchTerm || 
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = !selectedState || property.state === selectedState;
    
    return matchesSearch && matchesState;
  });
  
  // Get unique states from properties
  const uniqueStates = Array.from(new Set(mockProperties.map(p => p.state)));
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Select Property</h2>
        <p className="text-sm text-muted-foreground">
          Browse available properties or select from our partnered estates
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Input
            placeholder="Search by property name or address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All States</SelectItem>
              {uniqueStates.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-4">
        <RadioGroup value={selectedProperty} onValueChange={setSelectedProperty}>
          {filteredProperties.map(property => (
            <Card 
              key={property.id}
              className={`border ${selectedProperty === property.id ? 'border-primary' : 'border-border'}`}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <RadioGroupItem value={property.id} id={property.id} />
                <Label htmlFor={property.id} className="flex-1 cursor-pointer">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="md:col-span-2">
                      <h3 className="font-medium">{property.name}</h3>
                      <p className="text-sm text-muted-foreground">{property.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₦{property.value.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        {property.type} • {property.area}m<sup>2</sup>
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">
                      Features: {property.features.join(', ')}
                    </p>
                  </div>
                </Label>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
        
        {filteredProperties.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No properties found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};
