
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, FileEdit } from 'lucide-react';

const RestructuringView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('all');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Mortgage Restructuring</h2>
          <p className="text-muted-foreground">Manage mortgage term adjustments and payment restructuring</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Restructuring Request
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Restructuring Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by mortgage #, customer, or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="implemented">Implemented</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileEdit className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium">Restructuring Module</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              This module will display a list of restructuring requests, 
              allowing you to manage term adjustments and payment restructuring for mortgages.
            </p>
            <p className="text-sm mt-6">Coming in the next sprint</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestructuringView;
