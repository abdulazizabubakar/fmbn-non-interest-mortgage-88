
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Home, MapPin, Plus, Search, FileText, BarChart, Package, Users, DollarSign, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PropertyDashboard from './PropertyDashboard';
import PropertyList from './PropertyList';
import PropertyInventory from './PropertyInventory';
import AllocationEngine from './AllocationEngine';
import PropertyValuation from './PropertyValuation';
import PropertyInspection from './PropertyInspection';
import DeveloperSubmissions from './DeveloperSubmissions';
import MaintenanceRequests from './MaintenanceRequests';
import PropertyReports from './PropertyReports';

const PropertyManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Property Management</h1>
          <p className="text-muted-foreground mt-1 md:text-lg">
            Comprehensive property management for Islamic mortgage financing
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Property
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search by property ID, address, or developer..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filters</Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid grid-cols-4 lg:grid-cols-9 w-full">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="allocation" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Allocation
          </TabsTrigger>
          <TabsTrigger value="valuation" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Valuation
          </TabsTrigger>
          <TabsTrigger value="properties" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Properties
          </TabsTrigger>
          <TabsTrigger value="inspections" className="flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4" />
            Inspections
          </TabsTrigger>
          <TabsTrigger value="developers" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Developers
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Reports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <PropertyDashboard searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="inventory">
          <PropertyInventory searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="allocation">
          <AllocationEngine searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="valuation">
          <PropertyValuation searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="properties">
          <PropertyList searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="inspections">
          <PropertyInspection searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="developers">
          <DeveloperSubmissions searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="maintenance">
          <MaintenanceRequests searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="reports">
          <PropertyReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyManagement;
