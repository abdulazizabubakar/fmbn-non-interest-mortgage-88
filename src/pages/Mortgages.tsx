
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { mockMortgages } from '@/data/mockData';
import { Mortgage } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, Plus, ChevronRight, Settings, FileText } from 'lucide-react';
import { format } from 'date-fns';

const Mortgages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const getStatusBadgeVariant = (status: Mortgage['status']) => {
    switch (status) {
      case 'approved':
        return 'outline';
      case 'active':
        return 'default';
      case 'draft':
        return 'secondary';
      case 'pending-review':
        return 'secondary';
      case 'under-assessment':
        return 'outline';
      case 'completed':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredMortgages = mockMortgages.filter((mortgage) => {
    const matchesSearch = 
      mortgage.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mortgage.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mortgage.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || mortgage.status === statusFilter;
    const matchesType = typeFilter === 'all' || mortgage.financingType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="nimms-heading">Mortgages</h1>
            <p className="text-muted-foreground mt-1">
              Manage all non-interest mortgage applications and active financings
            </p>
          </div>
          <Button className="sm:self-start">
            <Plus className="h-4 w-4 mr-2" />
            New Mortgage
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="col-span-1 md:col-span-3">
            <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Settings className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Mortgage Management Module</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced tools for mortgage servicing, payment tracking, and ownership transfers
                  </p>
                </div>
              </div>
              <Link to="/mortgage-management">
                <Button>
                  Access Module <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, customer name, or property address..."
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
                <SelectItem value="pending-review">Pending Review</SelectItem>
                <SelectItem value="under-assessment">Under Assessment</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="murabaha">Murabaha</SelectItem>
                <SelectItem value="ijara">Ijara</SelectItem>
                <SelectItem value="musharaka">Musharaka</SelectItem>
                <SelectItem value="istisna">Istisna</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredMortgages.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Filter className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No mortgages found</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredMortgages.map((mortgage) => (
              <Card key={mortgage.id} className="overflow-hidden hover:shadow transition-shadow">
                <CardContent className="p-0">
                  <div className="p-4 border-l-4 border-nimms-primary flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between md:justify-start md:space-x-4">
                        <h3 className="font-semibold">{mortgage.id}</h3>
                        <Badge variant={getStatusBadgeVariant(mortgage.status)} className="capitalize">
                          {mortgage.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm mt-1">{mortgage.customerName}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{mortgage.propertyAddress}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Type:</span>{' '}
                          <span className="font-medium capitalize">{mortgage.financingType}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Amount:</span>{' '}
                          <span className="font-medium">{formatCurrency(mortgage.amount)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Term:</span>{' '}
                          <span className="font-medium">{mortgage.tenor / 12} years</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Created:</span>{' '}
                          <span className="font-medium">{format(new Date(mortgage.createdAt), 'MMM dd, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 self-start md:self-center">
                      <Button variant="ghost" size="sm">
                        <span>View Details</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Mortgage Applications</h3>
                <p className="text-sm text-muted-foreground">
                  Process and approve new applications
                </p>
                <Link to="/mortgage-applications" className="text-sm text-blue-600 hover:underline mt-1 inline-block">
                  View Applications →
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Payment Schedules</h3>
                <p className="text-sm text-muted-foreground">
                  View and manage repayment schedules
                </p>
                <Link to="/mortgage-management" className="text-sm text-blue-600 hover:underline mt-1 inline-block">
                  View Schedules →
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium">Default Management</h3>
                <p className="text-sm text-muted-foreground">
                  Handle overdue payments and defaults
                </p>
                <Link to="/mortgage-management" className="text-sm text-blue-600 hover:underline mt-1 inline-block">
                  View Defaults →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

// Import this since it's not included in our limited icon set
const AlertTriangle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

export default Mortgages;
