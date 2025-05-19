
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { mockProperties } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Home, MapPin, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Properties = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Property Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage properties for Islamic mortgage financing
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
            <Input type="search" placeholder="Search properties..." className="pl-8" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Filters</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Properties</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="financed">Under Financing</TabsTrigger>
            <TabsTrigger value="valuation">Pending Valuation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockProperties.map(property => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="aspect-video relative bg-muted">
                    <img 
                      src={property.images[0]} 
                      alt={property.address}
                      className="object-cover w-full h-full" 
                    />
                    <Badge className="absolute top-2 right-2 bg-primary">
                      {property.type}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{property.address}</CardTitle>
                    <CardDescription>ID: {property.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="font-medium">Value</p>
                        <p>₦{property.value.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="font-medium">Area</p>
                        <p>{property.area} sqm</p>
                      </div>
                      <div>
                        <p className="font-medium">Build Year</p>
                        <p>{property.buildYear}</p>
                      </div>
                      <div>
                        <p className="font-medium">Features</p>
                        <p>{property.features.length} amenities</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {property.features.slice(0, 3).map(feature => (
                        <Badge key={feature} variant="outline" className="bg-muted/50">
                          {feature}
                        </Badge>
                      ))}
                      {property.features.length > 3 && (
                        <Badge variant="outline" className="bg-muted/50">
                          +{property.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      Map
                    </Button>
                    <Button size="sm">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Properties</CardTitle>
                <CardDescription>Properties available for financing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockProperties.slice(0, 2).map(property => (
                    <Card key={property.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{property.address}</CardTitle>
                        <CardDescription>{property.type}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 pb-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Value:</span>
                          <span className="font-medium">₦{property.value.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Area:</span>
                          <span>{property.area} sqm</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Build Year:</span>
                          <span>{property.buildYear}</span>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button size="sm">Apply for Finance</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Properties Under Financing</CardTitle>
                <CardDescription>Properties with active mortgages</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Displaying properties currently being financed through Islamic mortgage products.</p>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Property</th>
                      <th className="text-left py-3 px-2">Financing Type</th>
                      <th className="text-left py-3 px-2">Customer</th>
                      <th className="text-left py-3 px-2">Amount</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-2">25 Ahmadu Bello Way, Abuja</td>
                      <td className="py-3 px-2 capitalize">murabaha</td>
                      <td className="py-3 px-2">Ibrahim Ahmed</td>
                      <td className="py-3 px-2">₦25,000,000</td>
                      <td className="py-3 px-2">
                        <Button variant="outline" size="sm">View</Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">7 Ibrahim Babangida Boulevard, Kano</td>
                      <td className="py-3 px-2 capitalize">ijara</td>
                      <td className="py-3 px-2">Fatima Usman</td>
                      <td className="py-3 px-2">₦18,500,000</td>
                      <td className="py-3 px-2">
                        <Button variant="outline" size="sm">View</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="valuation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Valuation</CardTitle>
                <CardDescription>Properties awaiting valuation assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">No properties currently pending valuation.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Property Types</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-muted-foreground">Apartments</dt>
                  <dd className="text-sm font-medium">2</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-muted-foreground">Duplexes</dt>
                  <dd className="text-sm font-medium">2</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-muted-foreground">Bungalows</dt>
                  <dd className="text-sm font-medium">1</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Valuation Stats</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-muted-foreground">Average Value</dt>
                  <dd className="text-sm font-medium">₦29.6M</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-muted-foreground">Lowest Value</dt>
                  <dd className="text-sm font-medium">₦18M</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-muted-foreground">Highest Value</dt>
                  <dd className="text-sm font-medium">₦40M</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Property Locations</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-muted-foreground">Abuja</dt>
                  <dd className="text-sm font-medium">1</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-muted-foreground">Lagos</dt>
                  <dd className="text-sm font-medium">1</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-muted-foreground">Kano</dt>
                  <dd className="text-sm font-medium">1</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Properties;
