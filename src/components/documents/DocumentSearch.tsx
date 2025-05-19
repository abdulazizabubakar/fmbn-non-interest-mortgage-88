
import React, { useState } from 'react';
import { Search, FileText, File, Calendar, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockDocuments } from '@/data/mockDocuments';
import { Document, DocumentCategory, DocumentType } from '@/types/documents';

const DocumentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Document[]>([]);
  const [advancedSearch, setAdvancedSearch] = useState({
    category: 'all' as DocumentCategory | 'all',
    type: 'all' as DocumentType | 'all',
    dateFrom: '',
    dateTo: '',
    owner: '',
  });

  const handleSearch = () => {
    if (searchTerm.trim() === '' && advancedSearch.category === 'all' && 
        advancedSearch.type === 'all' && !advancedSearch.dateFrom && 
        !advancedSearch.dateTo && !advancedSearch.owner) {
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      let results = [...mockDocuments];
      
      // Filter by search term
      if (searchTerm.trim() !== '') {
        results = results.filter(doc => 
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      // Filter by category
      if (advancedSearch.category !== 'all') {
        results = results.filter(doc => doc.category === advancedSearch.category);
      }
      
      // Filter by type
      if (advancedSearch.type !== 'all') {
        results = results.filter(doc => doc.type === advancedSearch.type);
      }
      
      // Filter by date range
      if (advancedSearch.dateFrom) {
        results = results.filter(doc => 
          new Date(doc.uploadDate) >= new Date(advancedSearch.dateFrom)
        );
      }
      
      if (advancedSearch.dateTo) {
        results = results.filter(doc => 
          new Date(doc.uploadDate) <= new Date(advancedSearch.dateTo)
        );
      }
      
      // Filter by owner
      if (advancedSearch.owner) {
        results = results.filter(doc => 
          doc.owner.toLowerCase().includes(advancedSearch.owner.toLowerCase())
        );
      }
      
      setSearchResults(results);
      setIsSearching(false);
    }, 800);
  };
  
  const getDocumentIcon = (type: DocumentType) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'image':
        return <File className="h-5 w-5 text-purple-500" />;
      case 'spreadsheet':
        return <File className="h-5 w-5 text-green-500" />;
      case 'document':
        return <File className="h-5 w-5 text-blue-500" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by document title, content or tags..."
          className="pl-10 pr-32"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button 
          className="absolute right-0 rounded-l-none"
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </div>
      
      <Accordion type="single" collapsible>
        <AccordionItem value="advanced-search">
          <AccordionTrigger className="text-sm">Advanced Search Options</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="document-category">Document Category</Label>
                <Select 
                  value={advancedSearch.category} 
                  onValueChange={(value) => setAdvancedSearch({...advancedSearch, category: value as DocumentCategory | 'all'})}
                >
                  <SelectTrigger id="document-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="kyc">KYC</SelectItem>
                    <SelectItem value="property">Property</SelectItem>
                    <SelectItem value="shariah">Shariah</SelectItem>
                    <SelectItem value="application">Application</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="document-type">Document Type</Label>
                <Select 
                  value={advancedSearch.type} 
                  onValueChange={(value) => setAdvancedSearch({...advancedSearch, type: value as DocumentType | 'all'})}
                >
                  <SelectTrigger id="document-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="spreadsheet">Spreadsheet</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date-from">Date From</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="date-from" 
                    type="date" 
                    className="pl-10"
                    value={advancedSearch.dateFrom}
                    onChange={(e) => setAdvancedSearch({...advancedSearch, dateFrom: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date-to">Date To</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="date-to" 
                    type="date" 
                    className="pl-10"
                    value={advancedSearch.dateTo}
                    onChange={(e) => setAdvancedSearch({...advancedSearch, dateTo: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="owner">Document Owner</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="owner" 
                    placeholder="Enter owner name"
                    className="pl-10"
                    value={advancedSearch.owner}
                    onChange={(e) => setAdvancedSearch({...advancedSearch, owner: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                size="sm"
                className="mr-2"
                onClick={() => setAdvancedSearch({
                  category: 'all',
                  type: 'all',
                  dateFrom: '',
                  dateTo: '',
                  owner: '',
                })}
              >
                Clear Filters
              </Button>
              <Button 
                size="sm"
                onClick={handleSearch}
                disabled={isSearching}
              >
                Apply Filters
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {isSearching && (
        <div className="flex justify-center my-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      )}
      
      {!isSearching && searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Search Results ({searchResults.length})</h3>
          <div className="space-y-2">
            {searchResults.map((doc) => (
              <div key={doc.id} className="p-4 border rounded-md flex items-center space-x-4 hover:bg-accent transition-colors">
                {getDocumentIcon(doc.type)}
                <div className="flex-1">
                  <h4 className="font-medium">{doc.title}</h4>
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{doc.owner}</span>
                    {doc.tags.length > 0 && (
                      <>
                        <span className="mx-2">•</span>
                        <span>Tags: {doc.tags.join(', ')}</span>
                      </>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!isSearching && searchTerm && searchResults.length === 0 && (
        <div className="text-center py-10">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No documents found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default DocumentSearch;
