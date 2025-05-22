
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { mockMortgageApplications } from '@/data/mockMortgageApplications';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Search, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ApplicationsList from '@/components/mortgage/ApplicationsList';
import { MortgageApplicationStatus } from '@/types/mortgage-application';

const MortgageApplications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Filter applications based on search term, status, and type
  const filteredApplications = mockMortgageApplications.filter(application => {
    // Search filter
    const matchesSearch = 
      application.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    
    // Type filter (customer type)
    const matchesType = typeFilter === 'all' || application.customerType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Count applications by status
  const countByStatus = (status: MortgageApplicationStatus) => {
    return mockMortgageApplications.filter(app => app.status === status).length;
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mortgage Applications</h1>
            <p className="text-muted-foreground mt-1">
              Process and manage Islamic housing finance applications
            </p>
          </div>
          <Button className="sm:self-start">
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by application number, customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex space-x-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="offer_sent">Offer Sent</SelectItem>
                <SelectItem value="lease_activated">Lease Activated</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Customer Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="nhf_contributor">NHF Contributor</SelectItem>
                <SelectItem value="government_worker">Government Worker</SelectItem>
                <SelectItem value="private_sector">Private Sector</SelectItem>
                <SelectItem value="diaspora">Diaspora</SelectItem>
                <SelectItem value="cooperative">Cooperative</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="pending">
              Pending Review ({countByStatus('submitted')})
            </TabsTrigger>
            <TabsTrigger value="inprocess">
              In Process ({countByStatus('in_review')})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({countByStatus('approved')})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({countByStatus('rejected')})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <ApplicationsList applications={filteredApplications} />
          </TabsContent>
          
          <TabsContent value="pending">
            <ApplicationsList 
              applications={filteredApplications.filter(app => app.status === 'submitted')} 
            />
          </TabsContent>
          
          <TabsContent value="inprocess">
            <ApplicationsList 
              applications={filteredApplications.filter(app => 
                app.status === 'in_review' || 
                app.status === 'credit_assessment' ||
                app.status === 'legal_review' ||
                app.status === 'shariah_review' ||
                app.status === 'management_approval' ||
                app.status === 'board_approval'
              )} 
            />
          </TabsContent>
          
          <TabsContent value="approved">
            <ApplicationsList 
              applications={filteredApplications.filter(app => 
                app.status === 'approved' || 
                app.status === 'offer_sent' ||
                app.status === 'offer_accepted' ||
                app.status === 'contract_generated' ||
                app.status === 'contract_signed' ||
                app.status === 'lease_activated'
              )} 
            />
          </TabsContent>
          
          <TabsContent value="rejected">
            <ApplicationsList 
              applications={filteredApplications.filter(app => 
                app.status === 'rejected' || 
                app.status === 'offer_rejected' ||
                app.status === 'cancelled'
              )} 
            />
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center text-center">
            <FileText className="h-6 w-6 mb-2" />
            <span className="font-medium">Export Applications Report</span>
            <span className="text-xs text-muted-foreground mt-1">Download as Excel or PDF</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center text-center">
            <Filter className="h-6 w-6 mb-2" />
            <span className="font-medium">Advanced Filtering</span>
            <span className="text-xs text-muted-foreground mt-1">Sort and filter by multiple criteria</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center text-center">
            <svg className="h-6 w-6 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span className="font-medium">Eligibility Calculator</span>
            <span className="text-xs text-muted-foreground mt-1">Estimate financing terms</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center text-center">
            <svg className="h-6 w-6 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M7 8h10M7 12h10M7 16h4"/>
            </svg>
            <span className="font-medium">Ijarah Contract Templates</span>
            <span className="text-xs text-muted-foreground mt-1">Create or edit templates</span>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default MortgageApplications;
