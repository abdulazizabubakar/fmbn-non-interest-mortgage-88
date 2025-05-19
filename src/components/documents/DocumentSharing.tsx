
import React, { useState } from 'react';
import { Share, Mail, Users, Link, Clock, Shield, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { mockDocuments } from '@/data/mockDocuments';
import { Document, DocumentType } from '@/types/documents';

const DocumentSharing = () => {
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);
  const [recipients, setRecipients] = useState('');
  const [message, setMessage] = useState('');
  const [expiry, setExpiry] = useState('never');
  const [permissions, setPermissions] = useState({
    canView: true,
    canDownload: false,
    canComment: false,
    canEdit: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSharing, setIsSharing] = useState(false);

  const searchDocuments = (term: string) => {
    if (!term) return [];
    
    return mockDocuments.filter(doc => 
      doc.title.toLowerCase().includes(term.toLowerCase()) ||
      doc.description.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 5);
  };
  
  const handleAddDocument = (doc: Document) => {
    if (!selectedDocuments.some(d => d.id === doc.id)) {
      setSelectedDocuments([...selectedDocuments, doc]);
    }
    setSearchTerm('');
  };
  
  const handleRemoveDocument = (docId: string) => {
    setSelectedDocuments(selectedDocuments.filter(doc => doc.id !== docId));
  };
  
  const handleShare = () => {
    if (selectedDocuments.length === 0) {
      toast({
        title: "No documents selected",
        description: "Please select at least one document to share",
        variant: "destructive"
      });
      return;
    }
    
    if (!recipients) {
      toast({
        title: "No recipients added",
        description: "Please add at least one recipient email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSharing(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log({
        documents: selectedDocuments,
        recipients: recipients.split(',').map(r => r.trim()),
        message,
        expiry,
        permissions
      });
      
      toast({
        title: "Documents shared successfully",
        description: `Shared ${selectedDocuments.length} document(s) with ${recipients.split(',').length} recipient(s)`
      });
      
      setSelectedDocuments([]);
      setRecipients('');
      setMessage('');
      setExpiry('never');
      setPermissions({
        canView: true,
        canDownload: false,
        canComment: false,
        canEdit: false
      });
      
      setIsSharing(false);
    }, 1500);
  };
  
  const getDocumentIcon = (type: DocumentType) => {
    switch (type) {
      case 'pdf':
        return "PDF";
      case 'image':
        return "IMG";
      case 'spreadsheet':
        return "XLS";
      case 'document':
        return "DOC";
      default:
        return "FILE";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="document-search">Select Documents to Share</Label>
        <div className="relative">
          <Input
            id="document-search"
            placeholder="Search for documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          {searchTerm && searchDocuments(searchTerm).length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg overflow-hidden">
              {searchDocuments(searchTerm).map(doc => (
                <button
                  key={doc.id}
                  className="w-full p-3 flex items-center text-left hover:bg-accent transition-colors"
                  onClick={() => handleAddDocument(doc)}
                >
                  <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center text-xs font-medium text-primary mr-3">
                    {getDocumentIcon(doc.type)}
                  </div>
                  <div>
                    <p className="font-medium">{doc.title}</p>
                    <p className="text-xs text-muted-foreground">{doc.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {selectedDocuments.length > 0 && (
        <div className="space-y-2">
          <Label>Selected Documents ({selectedDocuments.length})</Label>
          <div className="space-y-2 max-h-36 overflow-y-auto">
            {selectedDocuments.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 bg-primary/10 rounded flex items-center justify-center text-xs font-medium text-primary">
                    {getDocumentIcon(doc.type)}
                  </div>
                  <span className="text-sm font-medium truncate max-w-[250px]">{doc.title}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveDocument(doc.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="recipients">Recipient Email Addresses</Label>
        <div className="flex space-x-2">
          <div className="relative w-full">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="recipients"
              placeholder="Enter email addresses, separated by commas"
              className="pl-10"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Address Book
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Enter multiple email addresses separated by commas</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          placeholder="Add a message to the recipients"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Link Expiry</Label>
          <Select value={expiry} onValueChange={setExpiry}>
            <SelectTrigger id="expiry" className="w-full">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Select expiry time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1day">24 Hours</SelectItem>
              <SelectItem value="7days">7 Days</SelectItem>
              <SelectItem value="30days">30 Days</SelectItem>
              <SelectItem value="never">No Expiry</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="security">Security Level</Label>
          <Select defaultValue="standard">
            <SelectTrigger id="security" className="w-full">
              <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Select security level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="restricted">Restricted Access</SelectItem>
              <SelectItem value="confidential">Confidential</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Recipient Permissions</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="can-view" className="cursor-pointer">View documents</Label>
            <Switch 
              id="can-view" 
              checked={permissions.canView} 
              onCheckedChange={(checked) => setPermissions({...permissions, canView: checked})}
              disabled={true}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="can-download" className="cursor-pointer">Download documents</Label>
            <Switch 
              id="can-download" 
              checked={permissions.canDownload} 
              onCheckedChange={(checked) => setPermissions({...permissions, canDownload: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="can-comment" className="cursor-pointer">Add comments</Label>
            <Switch 
              id="can-comment" 
              checked={permissions.canComment} 
              onCheckedChange={(checked) => setPermissions({...permissions, canComment: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="can-edit" className="cursor-pointer">Edit documents</Label>
            <Switch 
              id="can-edit" 
              checked={permissions.canEdit} 
              onCheckedChange={(checked) => setPermissions({...permissions, canEdit: checked})}
            />
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4 flex items-center justify-between">
        <div className="flex items-center text-amber-500">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <span className="text-xs">Remember that shared documents may contain sensitive information</span>
        </div>
        <Button 
          className="flex items-center"
          onClick={handleShare}
          disabled={isSharing || selectedDocuments.length === 0 || !recipients}
        >
          <Share className="h-4 w-4 mr-2" />
          {isSharing ? 'Sharing...' : 'Share Documents'}
        </Button>
      </div>
    </div>
  );
};

export default DocumentSharing;
