
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Camera,
  MapPin,
  User,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface PropertyValuationProps {
  searchQuery?: string;
}

const PropertyValuation: React.FC<PropertyValuationProps> = ({ searchQuery }) => {
  const [selectedProperty, setSelectedProperty] = useState<string>('');

  // Mock valuation data
  const valuationRequests = [
    {
      id: 'VAL-001',
      propertyId: 'PROP-001',
      propertyName: 'Sunset Villa Estate',
      location: 'Lagos, Victoria Island',
      requestDate: '2023-11-15',
      valuerId: 'VAL-USER-001',
      valuerName: 'Dr. Adebayo Ogundimu',
      status: 'completed',
      currentValue: 45000000,
      marketValue: 47500000,
      variancePercentage: 5.6,
      lastValuation: '2023-08-15',
    },
    {
      id: 'VAL-002',
      propertyId: 'PROP-002',
      propertyName: 'Green Valley Heights',
      location: 'Abuja, Gwarinpa',
      requestDate: '2023-11-14',
      valuerId: 'VAL-USER-002',
      valuerName: 'Engr. Fatima Abdullahi',
      status: 'in-progress',
      currentValue: 65000000,
      marketValue: null,
      variancePercentage: null,
      lastValuation: '2023-09-20',
    },
  ];

  // Mock inspection data
  const inspectionReports = [
    {
      id: 'INSP-001',
      propertyId: 'PROP-001',
      propertyName: 'Sunset Villa Estate',
      inspectorName: 'Arch. Mohammed Sani',
      inspectionDate: '2023-11-12',
      status: 'completed',
      score: 92,
      issues: 2,
      recommendations: 5,
      images: 15,
      structuralRating: 'Excellent',
      safetyRating: 'Good',
      complianceRating: 'Excellent',
    },
    {
      id: 'INSP-002',
      propertyId: 'PROP-003',
      propertyName: 'Harmony Towers',
      inspectorName: 'Engr. Khadijah Usman',
      inspectionDate: '2023-11-10',
      status: 'pending-review',
      score: 78,
      issues: 6,
      recommendations: 8,
      images: 22,
      structuralRating: 'Good',
      safetyRating: 'Fair',
      complianceRating: 'Good',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed': return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
      case 'in-progress': return (
        <Badge variant="outline" className="border-blue-500 text-blue-700">
          <Calendar className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      );
      case 'pending-review': return (
        <Badge variant="outline" className="border-orange-500 text-orange-700">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Pending Review
        </Badge>
      );
      default: return <Badge>{status}</Badge>;
    }
  };

  const getRatingBadge = (rating: string) => {
    const color = rating === 'Excellent' ? 'green' : rating === 'Good' ? 'blue' : 'orange';
    return (
      <Badge variant="outline" className={`border-${color}-500 text-${color}-700`}>
        {rating}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="valuations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="valuations">Property Valuations</TabsTrigger>
          <TabsTrigger value="inspections">Inspection Reports</TabsTrigger>
          <TabsTrigger value="new-request">New Request</TabsTrigger>
        </TabsList>

        <TabsContent value="valuations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Valuations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {valuationRequests.map((valuation) => (
                  <div key={valuation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold">{valuation.propertyName}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {valuation.location}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <User className="h-3 w-3" />
                          {valuation.valuerName}
                        </p>
                      </div>
                      {getStatusBadge(valuation.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Current Value</p>
                        <p className="text-sm font-semibold">₦{valuation.currentValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Market Value</p>
                        <p className="text-sm font-semibold">
                          {valuation.marketValue ? `₦${valuation.marketValue.toLocaleString()}` : 'Pending'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Variance</p>
                        <p className={`text-sm font-semibold ${valuation.variancePercentage ? 
                          (valuation.variancePercentage > 0 ? 'text-green-600' : 'text-red-600') : ''}`}>
                          {valuation.variancePercentage ? 
                            `${valuation.variancePercentage > 0 ? '+' : ''}${valuation.variancePercentage}%` : 
                            'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Last Valuation</p>
                        <p className="text-sm">
                          {new Date(valuation.lastValuation).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        Requested: {new Date(valuation.requestDate).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View Report
                        </Button>
                        {valuation.status === 'completed' && (
                          <Button size="sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Market Analysis
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inspection Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inspectionReports.map((inspection) => (
                  <div key={inspection.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold">{inspection.propertyName}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {inspection.inspectorName}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(inspection.inspectionDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getStatusBadge(inspection.status)}
                        <div className="text-right">
                          <p className="text-sm font-semibold">Score: {inspection.score}/100</p>
                          <Progress value={inspection.score} className="h-2 w-20" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Structural</p>
                        {getRatingBadge(inspection.structuralRating)}
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Safety</p>
                        {getRatingBadge(inspection.safetyRating)}
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Compliance</p>
                        {getRatingBadge(inspection.complianceRating)}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">{inspection.issues}</p>
                        <p className="text-xs text-muted-foreground">Issues Found</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{inspection.recommendations}</p>
                        <p className="text-xs text-muted-foreground">Recommendations</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{inspection.images}</p>
                        <p className="text-xs text-muted-foreground">Photos Captured</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-1" />
                        View Photos
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Full Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-request" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Request New Valuation/Inspection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="property-select">Select Property</Label>
                    <Input id="property-select" placeholder="Search property..." />
                  </div>
                  
                  <div>
                    <Label htmlFor="request-type">Request Type</Label>
                    <select className="w-full p-2 border rounded">
                      <option value="">Select type</option>
                      <option value="valuation">Property Valuation</option>
                      <option value="inspection">Property Inspection</option>
                      <option value="both">Both Valuation & Inspection</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="priority">Priority Level</Label>
                    <select className="w-full p-2 border rounded">
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="preferred-date">Preferred Date</Label>
                    <Input id="preferred-date" type="date" />
                  </div>
                  
                  <div>
                    <Label htmlFor="special-instructions">Special Instructions</Label>
                    <Textarea 
                      id="special-instructions" 
                      placeholder="Any special requirements or focus areas..."
                      rows={4}
                    />
                  </div>
                  
                  <Button className="w-full">
                    Submit Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyValuation;
