
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const PropertySelection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Select a Property</h2>
        <p className="text-muted-foreground">Browse available properties or select from pre-approved options</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Property Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="location">Preferred Location</Label>
              <Select>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="abuja">Abuja</SelectItem>
                    <SelectItem value="lagos">Lagos</SelectItem>
                    <SelectItem value="kano">Kano</SelectItem>
                    <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select>
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                    <SelectItem value="bungalow">Bungalow</SelectItem>
                    <SelectItem value="terrace">Terrace</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="bedrooms">Number of Bedrooms</Label>
              <Select>
                <SelectTrigger id="bedrooms">
                  <SelectValue placeholder="Select number of bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">1 Bedroom</SelectItem>
                    <SelectItem value="2">2 Bedrooms</SelectItem>
                    <SelectItem value="3">3 Bedrooms</SelectItem>
                    <SelectItem value="4">4 Bedrooms</SelectItem>
                    <SelectItem value="5+">5+ Bedrooms</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Select>
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="5-10">₦5M - ₦10M</SelectItem>
                    <SelectItem value="10-15">₦10M - ₦15M</SelectItem>
                    <SelectItem value="15-20">₦15M - ₦20M</SelectItem>
                    <SelectItem value="20-30">₦20M - ₦30M</SelectItem>
                    <SelectItem value="30+">Above ₦30M</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="secondary">Browse Properties</Button>
            <Button>Continue</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertySelection;
