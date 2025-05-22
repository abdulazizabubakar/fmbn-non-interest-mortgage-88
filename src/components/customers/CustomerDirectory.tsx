
import React, { useState, useMemo } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Eye, 
  Download,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Clock 
} from 'lucide-react';
import { Customer, CustomerTag, CustomerStatus } from '@/types/customer';
import { mockCustomerLeases } from '@/data/mockCustomerData';

interface CustomerDirectoryProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
}

const CustomerDirectory: React.FC<CustomerDirectoryProps> = ({ customers, onSelectCustomer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterState, setFilterState] = useState<string>('all');
  
  // Get unique states for filtering
  const states = useMemo(() => {
    const uniqueStates = [...new Set(customers.map(c => c.state))];
    return uniqueStates.sort();
  }, [customers]);
  
  // Filtered customers
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      // Search term filter
      const matchesSearch = 
        searchTerm === '' || 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.customerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm);
      
      // Customer type filter
      const matchesType = 
        filterType === 'all' || 
        customer.customerType === filterType;
      
      // Status filter
      const matchesStatus = 
        filterStatus === 'all' || 
        customer.status === filterStatus;
      
      // State filter
      const matchesState = 
        filterState === 'all' || 
        customer.state === filterState;
      
      return matchesSearch && matchesType && matchesStatus && matchesState;
    });
  }, [customers, searchTerm, filterType, filterStatus, filterState]);
  
  // Get customer lease status
  const getLeaseStatus = (customerId: string) => {
    const lease = mockCustomerLeases.find(lease => lease.customerId === customerId);
    return lease ? lease.status : 'none';
  };

  // Render status badge
  const renderStatusBadge = (status: CustomerStatus) => {
    switch(status) {
      case 'active':
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case 'pending_verification':
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'suspended':
        return (
          <Badge className="bg-orange-50 text-orange-700 border-orange-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Suspended
          </Badge>
        );
      case 'blacklisted':
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Blacklisted
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-50 text-gray-700 border-gray-200">
            Unknown
          </Badge>
        );
    }
  };

  // Render tag badges
  const renderTagBadges = (tags: CustomerTag[]) => {
    if (!tags.length) return null;
    
    return (
      <div className="flex flex-wrap gap-1">
        {tags.map(tag => {
          switch(tag) {
            case 'high_risk':
              return (
                <Badge key={tag} variant="outline" className="border-red-200 text-red-700 text-xs">
                  High Risk
                </Badge>
              );
            case 'eligible_for_ownership':
              return (
                <Badge key={tag} variant="outline" className="border-green-200 text-green-700 text-xs">
                  Eligible
                </Badge>
              );
            case 'in_arrears':
              return (
                <Badge key={tag} variant="outline" className="border-amber-200 text-amber-700 text-xs">
                  Arrears
                </Badge>
              );
            case 'defaulting':
              return (
                <Badge key={tag} variant="outline" className="border-red-200 text-red-700 text-xs">
                  Defaulting
                </Badge>
              );
            case 'good_standing':
              return (
                <Badge key={tag} variant="outline" className="border-blue-200 text-blue-700 text-xs">
                  Good Standing
                </Badge>
              );
            case 'needs_review':
              return (
                <Badge key={tag} variant="outline" className="border-purple-200 text-purple-700 text-xs">
                  Review
                </Badge>
              );
            default:
              return (
                <Badge key={tag} variant="outline" className="text-xs">
                  {(tag as string).replace(/_/g, ' ')}
                </Badge>
              );
          }
        })}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Customer Directory</CardTitle>
        <CardDescription>
          Manage and search through customer profiles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search field */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, ID, email, or phone..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2">
              <Filter className="text-muted-foreground h-4 w-4" />
              <select
                className="bg-background border rounded px-2 py-2 text-sm focus:outline-none focus:ring-1"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="new_applicant">New Applicant</option>
                <option value="nhf_contributor">NHF Contributor</option>
                <option value="diaspora">Diaspora</option>
                <option value="government_worker">Government Worker</option>
                <option value="private_sector">Private Sector</option>
                <option value="cooperative">Cooperative</option>
              </select>
              
              <select
                className="bg-background border rounded px-2 py-2 text-sm focus:outline-none focus:ring-1"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending_verification">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="blacklisted">Blacklisted</option>
                <option value="completed">Completed</option>
              </select>
              
              <select
                className="bg-background border rounded px-2 py-2 text-sm focus:outline-none focus:ring-1"
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
              >
                <option value="all">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Export Button */}
          <Button variant="outline" className="shrink-0 gap-1">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
        
        {/* Customers Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Customer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Type</TableHead>
                <TableHead className="hidden lg:table-cell">State</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.customerNumber}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>
                        <div className="text-xs text-muted-foreground">{customer.email}</div>
                        <div>{customer.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell capitalize">
                      {customer.customerType.replace(/_/g, ' ')}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{customer.state}</TableCell>
                    <TableCell>
                      {renderStatusBadge(customer.status)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {renderTagBadges(customer.tags)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => onSelectCustomer(customer)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No customers match your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredCustomers.length}</strong> of <strong>{customers.length}</strong> customers
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerDirectory;
