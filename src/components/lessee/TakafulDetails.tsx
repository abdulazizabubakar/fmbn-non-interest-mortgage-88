
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Calendar, Download, AlertTriangle, FileText, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TakafulDetails = () => {
  // Mock data - in a real app, this would come from an API
  const takafulData = {
    policyNumber: 'TKF-12345-FMBN',
    provider: 'Jaiz Takaful Insurance',
    coverageAmount: 30000000,
    premium: 150000,
    startDate: '2025-04-01',
    endDate: '2026-04-01',
    status: 'active',
    type: 'property',
    renewalReminder: 30, // days
    claimProcess: [
      'Complete the claim form available in the documents section',
      'Attach supporting evidence and documentation',
      'Submit through the portal or directly to the provider',
      'Track claim status through the portal'
    ],
    claims: [
      // Empty array - no claims yet
    ],
    documents: [
      {
        id: 'doc1',
        name: 'Takaful Policy Certificate',
        type: 'pdf',
        url: '#',
        uploadDate: '2025-04-05'
      },
      {
        id: 'doc2',
        name: 'Takaful Terms & Conditions',
        type: 'pdf',
        url: '#',
        uploadDate: '2025-04-05'
      },
      {
        id: 'doc3',
        name: 'Claim Procedure Guide',
        type: 'pdf',
        url: '#',
        uploadDate: '2025-04-05'
      }
    ],
    coverage: [
      'Property damage from natural disasters',
      'Fire and flood damage',
      'Structural damage',
      'Third party liability',
      'Repair and reconstruction costs'
    ],
    exclusions: [
      'Wear and tear',
      'Pre-existing damages',
      'Intentional damage',
      'War and terrorism',
      'Pollution'
    ]
  };
  
  const { 
    policyNumber, 
    provider, 
    coverageAmount, 
    premium, 
    startDate, 
    endDate, 
    status,
    type,
    documents,
    claims,
    claimProcess,
    coverage,
    exclusions
  } = takafulData;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Calculate days until expiry
  const daysUntilExpiry = () => {
    const today = new Date();
    const expiry = new Date(endDate);
    const diffTime = Math.abs(expiry.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Takaful Insurance</CardTitle>
          <CardDescription>
            Your Islamic insurance coverage details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status summary */}
          <div className="bg-muted p-4 rounded-md flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-background p-3 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Policy Status</h3>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={status === 'active' ? 'outline' : 'destructive'}
                    className={status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                  >
                    {status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Renews in {daysUntilExpiry()} days
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Certificate
              </Button>
            </div>
          </div>
          
          {/* Policy details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="text-sm font-medium">Policy Number</h3>
              <p className="mt-1">{policyNumber}</p>
              <p className="text-xs text-muted-foreground">Reference for all queries</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium">Provider</h3>
              <p className="mt-1">{provider}</p>
              <p className="text-xs text-muted-foreground">Takaful insurance company</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium">Coverage Period</h3>
              <div className="mt-1 flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Annual renewal required</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium">Coverage Type</h3>
              <p className="mt-1 capitalize">{type}</p>
              <p className="text-xs text-muted-foreground">Islamic compliant insurance</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium">Coverage Amount</h3>
              <p className="text-xl font-bold mt-1">₦{coverageAmount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Maximum claim value</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium">Annual Premium</h3>
              <p className="text-xl font-bold mt-1">₦{premium.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Paid annually in advance</p>
            </div>
          </div>
          
          <Separator />
          
          {/* Coverage details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">What's Covered</h3>
              <ul className="space-y-2">
                {coverage.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Exclusions</h3>
              <ul className="space-y-2">
                {exclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Claims Management */}
      <Card>
        <CardHeader>
          <CardTitle>Claims Management</CardTitle>
          <CardDescription>
            Submit and track Takaful insurance claims
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Claim Process */}
            <div className="space-y-4">
              <h3 className="font-medium">How to Make a Claim</h3>
              
              <div className="space-y-3">
                {claimProcess.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Claims History */}
            <div className="space-y-4">
              <h3 className="font-medium">Claims History</h3>
              
              {claims.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Date Filed</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {claims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell>{claim.reference}</TableCell>
                        <TableCell>{formatDate(claim.dateSubmitted)}</TableCell>
                        <TableCell>{claim.reason}</TableCell>
                        <TableCell>₦{claim.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={
                            claim.status === 'approved' ? 'outline' :
                            claim.status === 'pending' ? 'secondary' :
                            claim.status === 'rejected' ? 'destructive' : 'default'
                          }>
                            {claim.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12 border rounded-md">
                  <div className="flex justify-center">
                    <div className="bg-muted p-3 rounded-full">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-sm font-medium">No Claims History</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You haven't filed any claims yet
                  </p>
                  <Button className="mt-4" variant="outline">
                    File New Claim
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Takaful Documents</CardTitle>
          <CardDescription>
            Important documents related to your Takaful coverage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="bg-background">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <FileText className="h-8 w-8 text-primary" />
                    <span className="text-xs bg-muted px-2 py-1 rounded-md uppercase">
                      {doc.type}
                    </span>
                  </div>
                  <h3 className="font-medium mt-3">{doc.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Uploaded on {formatDate(doc.uploadDate)}
                  </p>
                </CardContent>
                <CardFooter className="border-t p-2">
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Renewal Reminder */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-700 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-yellow-900">Renewal Reminder</h3>
              <p className="text-sm text-yellow-800 mt-1">
                Your Takaful policy will need renewal on {formatDate(endDate)}. 
                We'll send you a reminder 30 days before expiry.
              </p>
              <div className="flex items-center mt-3 text-yellow-900">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">{daysUntilExpiry()} days remaining</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TakafulDetails;
