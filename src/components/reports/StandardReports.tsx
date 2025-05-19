
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, FileText, Calendar, Download, Eye, Filter, ArrowDownWideNarrow } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { mockStandardReports } from '@/data/mockReports';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const StandardReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredReports = mockStandardReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const generateReport = (report: any) => {
    toast({
      title: "Generating Report",
      description: `Please wait while we generate "${report.name}"`,
    });
    
    // Simulate report generation time
    setTimeout(() => {
      toast({
        title: "Report Generated",
        description: "The report is ready for viewing or download",
      });
    }, 1500);
  };

  const viewReport = (report: any) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const downloadReport = (report: any, format: string) => {
    toast({
      title: "Downloading Report",
      description: `Downloading "${report.name}" as ${format.toUpperCase()}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Label htmlFor="category-filter" className="sr-only">Filter by Category</Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger id="category-filter" className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="customers">Customers</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <ArrowDownWideNarrow className="h-4 w-4 mr-2" />
            Sort By
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Last Generated</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="font-medium">{report.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-muted">
                      {report.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{report.lastGenerated || 'Never'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="truncate text-sm">{report.description}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => viewReport(report)}
                      >
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => generateReport(report)}
                      >
                        <FileText className="h-4 w-4 mr-1" /> Generate
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32">
                  <div className="flex flex-col items-center justify-center">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <h3 className="mt-2 font-semibold">No reports found</h3>
                    <p className="text-muted-foreground text-sm">Try changing your search or filter criteria</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {selectedReport && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedReport.name}</DialogTitle>
              <DialogDescription>
                {selectedReport.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Category: {selectedReport.category}</p>
                  {selectedReport.lastGenerated && (
                    <p className="text-sm text-muted-foreground">
                      Last Generated: {selectedReport.lastGenerated}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => downloadReport(selectedReport, 'pdf')}>
                    <Download className="h-4 w-4 mr-2" /> PDF
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => downloadReport(selectedReport, 'excel')}>
                    <Download className="h-4 w-4 mr-2" /> Excel
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-semibold mb-4">Report Preview</h3>
                <div className="bg-muted h-[400px] rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Report preview would be displayed here
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StandardReports;
