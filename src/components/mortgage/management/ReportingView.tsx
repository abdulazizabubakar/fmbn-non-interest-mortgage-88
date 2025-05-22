
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRange } from 'react-day-picker';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Search, FileDown, Download, BarChart, AlertTriangle as AlertTriangleIcon, FileCheck as FileCheckIcon } from 'lucide-react';

const ReportingView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Mortgage Reporting</h2>
          <p className="text-muted-foreground">Generate and export mortgage analytics and reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <FileDown className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Active Mortgages</p>
                <p className="text-2xl font-bold">782</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <BarChart className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">In Default</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangleIcon className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">158</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <FileCheckIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="risk">Risk</SelectItem>
                </SelectContent>
              </Select>
              
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>
          </div>
          
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileDown className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium">Reporting Module</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              This module will provide a comprehensive set of reporting options
              for mortgage portfolio management, risk assessment, and financial analysis.
            </p>
            <p className="text-sm mt-6">Coming in the next sprint</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportingView;
