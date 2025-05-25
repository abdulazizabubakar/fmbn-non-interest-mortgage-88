
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  CalendarDays, 
  Filter, 
  X, 
  Search,
  SlidersHorizontal,
  Save,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface AdvancedFiltersPanelProps {
  userRole: string;
  userRegion: string;
  onFiltersChange: (filters: any) => void;
}

const AdvancedFiltersPanel: React.FC<AdvancedFiltersPanelProps> = ({
  userRole,
  userRegion,
  onFiltersChange
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [includeArchived, setIncludeArchived] = useState(false);
  const [realTimeOnly, setRealTimeOnly] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'on-hold', label: 'On Hold' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'finance', label: 'Finance' },
    { value: 'legal', label: 'Legal' },
    { value: 'operations', label: 'Operations' },
    { value: 'risk', label: 'Risk Management' },
    { value: 'customer-service', label: 'Customer Service' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const handleFilterChange = () => {
    const filters = {
      dateRange,
      searchTerm,
      selectedStatus,
      selectedDepartment,
      selectedPriority,
      amountRange,
      includeArchived,
      realTimeOnly
    };
    
    // Calculate active filters
    const active = [];
    if (dateRange?.from) active.push('Date Range');
    if (searchTerm) active.push('Search');
    if (selectedStatus !== 'all') active.push('Status');
    if (selectedDepartment !== 'all') active.push('Department');
    if (selectedPriority !== 'all') active.push('Priority');
    if (amountRange.min || amountRange.max) active.push('Amount');
    if (includeArchived) active.push('Include Archived');
    if (realTimeOnly) active.push('Real-time Only');
    
    setActiveFilters(active);
    onFiltersChange(filters);
  };

  const clearAllFilters = () => {
    setDateRange(undefined);
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedDepartment('all');
    setSelectedPriority('all');
    setAmountRange({ min: '', max: '' });
    setIncludeArchived(false);
    setRealTimeOnly(false);
    setActiveFilters([]);
    onFiltersChange({});
  };

  const removeFilter = (filterName: string) => {
    switch (filterName) {
      case 'Date Range':
        setDateRange(undefined);
        break;
      case 'Search':
        setSearchTerm('');
        break;
      case 'Status':
        setSelectedStatus('all');
        break;
      case 'Department':
        setSelectedDepartment('all');
        break;
      case 'Priority':
        setSelectedPriority('all');
        break;
      case 'Amount':
        setAmountRange({ min: '', max: '' });
        break;
      case 'Include Archived':
        setIncludeArchived(false);
        break;
      case 'Real-time Only':
        setRealTimeOnly(false);
        break;
    }
    handleFilterChange();
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Filter Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Advanced Filters</h3>
              {activeFilters.length > 0 && (
                <Badge variant="secondary">
                  {activeFilters.length} active
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                <RotateCcw className="h-3 w-3 mr-1" />
                Clear All
              </Button>
              <Button size="sm" onClick={handleFilterChange}>
                <Filter className="h-3 w-3 mr-1" />
                Apply
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge 
                  key={filter} 
                  variant="secondary" 
                  className="flex items-center gap-1 pr-1"
                >
                  {filter}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeFilter(filter)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Department Filter */}
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departmentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority Filter */}
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount Range */}
            <div className="space-y-2">
              <Label>Amount Range</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Min"
                  value={amountRange.min}
                  onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-20"
                />
                <Input
                  placeholder="Max"
                  value={amountRange.max}
                  onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-20"
                />
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="flex items-center space-x-6 pt-2 border-t">
            <div className="flex items-center space-x-2">
              <Switch
                id="archived"
                checked={includeArchived}
                onCheckedChange={setIncludeArchived}
              />
              <Label htmlFor="archived" className="text-sm">Include Archived</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="realtime"
                checked={realTimeOnly}
                onCheckedChange={setRealTimeOnly}
              />
              <Label htmlFor="realtime" className="text-sm">Real-time Data Only</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedFiltersPanel;
