
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, FileText, Check, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  errorMessage?: string;
}

export const DocumentUpload = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  
  // Required document types
  const requiredDocuments = [
    { type: 'id_card', label: 'National ID Card', description: 'NIN card, Passport, or Driver\'s License' },
    { type: 'payslip', label: 'Recent Payslip', description: 'Last 3 months payslip' },
    { type: 'employment_letter', label: 'Employment Confirmation', description: 'Letter from your employer' },
    { type: 'utility_bill', label: 'Utility Bill', description: 'For address verification (not older than 3 months)' }
  ];
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }
    
    // Check file type (pdf, jpg, png)
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Only PDF, JPEG, and PNG are supported.');
      return;
    }
    
    // Create new document
    const newDocument: Document = {
      id: Date.now().toString(),
      name: file.name,
      type: docType,
      status: 'uploading',
      progress: 0
    };
    
    // Add to documents list
    setDocuments([...documents, newDocument]);
    
    // Simulate upload progress
    simulateUpload(newDocument.id);
  };
  
  const simulateUpload = (docId: string) => {
    const interval = setInterval(() => {
      setDocuments(prev => {
        const updatedDocs = prev.map(doc => {
          if (doc.id === docId) {
            const newProgress = Math.min(doc.progress + 10, 100);
            
            // When upload completes
            if (newProgress === 100) {
              clearInterval(interval);
              
              // Simulate processing
              setTimeout(() => {
                setDocuments(current => {
                  return current.map(d => {
                    if (d.id === docId) {
                      return { ...d, status: 'processing' };
                    }
                    return d;
                  });
                });
                
                // Simulate completion
                setTimeout(() => {
                  setDocuments(current => {
                    const updated = current.map(d => {
                      if (d.id === docId) {
                        // Randomly succeed or fail for demonstration
                        const success = Math.random() > 0.2;
                        return { 
                          ...d, 
                          status: success ? 'completed' : 'error',
                          errorMessage: success ? undefined : 'File validation failed'
                        } as Document; // Add type assertion here
                      }
                      return d;
                    });
                    
                    if (updated.find(d => d.id === docId)?.status === 'completed') {
                      toast.success('Document uploaded successfully');
                    } else {
                      toast.error('Document upload failed');
                    }
                    
                    return updated;
                  });
                }, 1000);
              }, 1000);
            }
            
            return { ...doc, progress: newProgress };
          }
          return doc;
        });
        return updatedDocs;
      });
    }, 200);
  };
  
  const removeDocument = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
  };
  
  // Get documents of a specific type
  const getDocumentsOfType = (type: string) => {
    return documents.filter(doc => doc.type === type);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Upload Required Documents</h2>
        <p className="text-sm text-muted-foreground">
          Please upload the following documents to proceed with your application
        </p>
      </div>
      
      <div className="space-y-4">
        {requiredDocuments.map(doc => {
          const typeDocs = getDocumentsOfType(doc.type);
          const hasCompletedDoc = typeDocs.some(d => d.status === 'completed');
          
          return (
            <Card key={doc.type} className={`border ${hasCompletedDoc ? 'border-green-500' : 'border-border'}`}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      {doc.label}
                      {hasCompletedDoc && (
                        <Check className="h-4 w-4 text-green-500 ml-2" />
                      )}
                    </h3>
                    <p className="text-xs text-muted-foreground">{doc.description}</p>
                  </div>
                  
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={typeDocs.some(d => d.status === 'uploading' || d.status === 'processing')}
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.pdf,.png,.jpg,.jpeg';
                        input.onchange = (e) => {
                          // Cast the event to the correct type
                          const inputEvent = e as React.ChangeEvent<HTMLInputElement>;
                          handleFileChange(inputEvent, doc.type);
                        };
                        input.click();
                      }}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {hasCompletedDoc ? 'Replace' : 'Upload'}
                    </Button>
                  </div>
                </div>
                
                {typeDocs.length > 0 && (
                  <div className="space-y-2">
                    {typeDocs.map(uploadedDoc => (
                      <div 
                        key={uploadedDoc.id} 
                        className="text-xs bg-muted p-2 rounded flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2 overflow-hidden">
                          <FileText className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{uploadedDoc.name}</span>
                          
                          {uploadedDoc.status === 'error' && (
                            <div className="flex items-center text-destructive">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              <span>{uploadedDoc.errorMessage}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {(uploadedDoc.status === 'uploading' || uploadedDoc.status === 'processing') && (
                            <div className="flex items-center space-x-2 w-24">
                              <Progress value={uploadedDoc.progress} className="h-1" />
                              <span className="text-muted-foreground">
                                {uploadedDoc.status === 'processing' ? 'Processing' : `${uploadedDoc.progress}%`}
                              </span>
                            </div>
                          )}
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => removeDocument(uploadedDoc.id)}
                            disabled={uploadedDoc.status === 'uploading' || uploadedDoc.status === 'processing'}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
