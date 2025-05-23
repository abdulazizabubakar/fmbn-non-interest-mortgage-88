
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { DateRange } from '@/components/ui/date-range-picker';
import { UserRole } from '@/types/user';
import { Search, CalendarDays } from 'lucide-react';

interface FilterParams {
  dateRange?: { from: Date; to: Date } | undefined;
  state?: string;
  status?: string;
  propertyType?: string;
  customerType?: string;
  includeArchived: boolean;
  searchTerm: string;
}

interface DashboardFiltersProps {
  role: UserRole | null;
  region: string;
  onFilterApplied: (filters: FilterParams) => void;
}

const states = [
  'All States',
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara'
];

const statuses = ['All', 'Pending', 'Approved', 'Rejected', 'In Review', 'Completed'];
const propertyTypes = ['All Types', 'Apartment', 'Duplex', 'Bungalow', 'Terrace', 'Semi-Detached'];
const customerTypes = ['All Types', 'Individual', 'Corporate', 'Government', 'Non-Profit'];

const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  role,
  region,
  onFilterApplied
}) => {
  const [filters, setFilters] = useState<FilterParams>({
    dateRange: undefined,
    state: 'All States',
    status: 'All',
    propertyType: 'All Types',
    customerType: 'All Types',
    includeArchived: false,
    searchTerm: '',
  });

  const handleFilterChange = (name: keyof FilterParams, value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    onFilterApplied(filters);
  };

  const handleResetFilters = () => {
    setFilters({
      dateRange: undefined,
      state: 'All States',
      status: 'All',
      propertyType: 'All Types',
      customerType: 'All Types',
      includeArchived: false,
      searchTerm: '',
    });
    onFilterApplied({
      dateRange: undefined,
      state: 'All States',
      status: 'All',
      propertyType: 'All Types',
      customerType: 'All Types',
      includeArchived: false,
      searchTerm: '',
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search Term */}
        <div>
          <Label htmlFor="searchTerm">Search</Label>
          <div className="relative mt-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="searchTerm"
              placeholder="Search by name, ID, or keyword..."
              className="pl-9"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
          </div>
        </div>

        {/* Date Range */}
        <div>
          <Label>Date Range</Label>
          <div className="mt-1">
            <DateRange
              value={filters.dateRange}
              onValueChange={(value) => handleFilterChange('dateRange', value)}
            />
          </div>
        </div>

        {/* State/Location */}
        <div>
          <Label htmlFor="state">State</Label>
          <Select
            value={filters.state}
            onValueChange={(value) => handleFilterChange('state', value)}
          >
            <SelectTrigger id="state" className="mt-1">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger id="status" className="mt-1">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div>
          <Label htmlFor="propertyType">Property Type</Label>
          <Select
            value={filters.propertyType}
            onValueChange={(value) => handleFilterChange('propertyType', value)}
          >
            <SelectTrigger id="propertyType" className="mt-1">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Customer Type */}
        <div>
          <Label htmlFor="customerType">Customer Type</Label>
          <Select
            value={filters.customerType}
            onValueChange={(value) => handleFilterChange('customerType', value)}
          >
            <SelectTrigger id="customerType" className="mt-1">
              <SelectValue placeholder="Select customer type" />
            </SelectTrigger>
            <SelectContent>
              {customerTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-3 pt-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="includeArchived"
            checked={filters.includeArchived}
            onCheckedChange={(checked) => handleFilterChange('includeArchived', checked)}
          />
          <Label htmlFor="includeArchived">Include archived records</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" onClick={handleResetFilters}>
          Reset Filters
        </Button>
        <Button onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default DashboardFilters;
