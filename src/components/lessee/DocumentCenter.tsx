
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, FileText, Upload, Search, Download, Eye, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Document {
  id: string;
  title: string;
  type: string;
  uploadDate: string;
  status: 'pending' | 'verified' | 'rejected';
  category: 'kyc' | 'contract' | 'property' | 'application';
  url?: string;
  expiryDate?: string;
  fileSize?: number;
  notes?: string;
}

const DocumentCenter = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock document data - in a real app, this would come from an API
  const documents: Document[] = [
    {
      id: '1',
      title: 'National ID Card',
      type: 'pdf',
      uploadDate: '2025-04-15',
      status: 'verified',
      category: 'kyc',
      url: '#',
      fileSize: 1200000
    },
    {
      id: '2',
      title: 'Payslip - March 2025',
      type: 'pdf',
      uploadDate: '2025-04-15',
      status: 'verified',
      category: 'kyc',
      url: '#',
      fileSize: 850000
    },
    {
      id: '3',
      title: 'Utility Bill',
      type: 'pdf',
      uploadDate: '2025-04-15',
      status: 'verified',
      category: 'kyc',
      url: '#',
      fileSize: 950000
    },
    {
      id: '4',
      title: 'Employment Letter',
      type: 'pdf',
      uploadDate: '2025-04-15',
      status: 'verified',
      category: 'kyc',
      url: '#',
      fileSize: 1100000
    },
    {
      id: '5',
      title: 'Ijarah Lease Contract',
      type: 'pdf',
      uploadDate: '2025-04-20',
      status: 'verified',
      category: 'contract',
      url: '#',
      fileSize: 2500000
    },
    {
      id: '6',
      title: 'Property Inspection Report',
      type: 'pdf',
      uploadDate: '2025-04-18',
      status: 'verified',
      category: 'property',
      url: '#',
      fileSize: 3200000
    },
    {
      id: '7',
      title: 'Takaful Certificate',
      type: 'pdf',
      uploadDate: '2025-04-22',
      status: 'verified',
      category: 'contract',
      url: '#',
      fileSize: 1800000,
      expiryDate: '2026-04-22'
    },
    {
      id: '8',
      title: 'Application Form',
      type: 'pdf',
      uploadDate: '2025-04-10',
      status: 'verified',
      category: 'application',
      url: '#',
      fileSize: 1500000
    },
    {
      id: '9',
      title: 'Employer Undertaking',
      type: 'pdf',
      uploadDate: '2025-04-25',
      status: 'pending',
      category: 'kyc',
      url: '#',
      fileSize: 950000
    }
  ];
  
  // Filter documents based on tab and search
  const filteredDocuments = documents.filter(doc => {
    const matchesTab = activeTab === 'all' || doc.category === activeTab;
    const matchesSearch = searchTerm === '' || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Verified</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown';
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Check for expiring documents (within 30 days)
  const hasExpiringDocuments = documents.some(doc => {
    if (!doc.expiryDate) return false;
    
    const today = new Date();
    const expiry = new Date(doc.expiryDate);
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
  });
  
  // Count pending documents
  const pendingDocuments = documents.filter(doc => doc.status === 'pending').length;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Document Center</CardTitle>
          <CardDescription>
            Manage all your documents securely in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Warnings and alerts */}
          <div className="space-y-4 mb-6">
            {pendingDocuments > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  You have {pendingDocuments} document(s) pending verification.
                </AlertDescription>
              </Alert>
            )}
            
            {hasExpiringDocuments && (
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  Some of your documents are approaching expiration. Please check and renew them.
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload New Document
            </Button>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="kyc">KYC Documents</TabsTrigger>
              <TabsTrigger value="contract">Contracts</TabsTrigger>
              <TabsTrigger value="property">Property</TabsTrigger>
              <TabsTrigger value="application">Application</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className="mr-2 bg-muted rounded p-2">
                              <FileText className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                              <h3 className="font-medium text-sm">{doc.title}</h3>
                              <p className="text-xs text-muted-foreground">
                                Uploaded on {formatDate(doc.uploadDate)}
                              </p>
                            </div>
                          </div>
                          <div>
                            {getStatusBadge(doc.status)}
                          </div>
                        </div>
                        
                        {doc.expiryDate && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            <span className="font-medium">Expires:</span> {formatDate(doc.expiryDate)}
                          </div>
                        )}
                        
                        <div className="mt-2 text-xs text-muted-foreground">
                          <span className="font-medium">Size:</span> {formatFileSize(doc.fileSize)}
                        </div>
                      </div>
                      
                      <div className="flex border-t">
                        <Button variant="ghost" className="flex-1 rounded-none h-10 text-xs" asChild>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </a>
                        </Button>
                        <div className="border-r h-10" />
                        <Button variant="ghost" className="flex-1 rounded-none h-10 text-xs" asChild>
                          <a href={doc.url} download>
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredDocuments.length === 0 && (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No documents found matching your criteria.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentCenter;
