
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText, Download, Eye, Trash, Calendar, User } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { mockSavedReports } from '@/data/mockReports';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SavedReports = () => {
  const [savedReports, setSavedReports] = useState(mockSavedReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const filteredReports = savedReports.filter(report => {
    return (
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const viewReport = (report: any) => {
    setSelectedReport(report);
    setIsPreviewOpen(true);
  };

  const downloadReport = (report: any) => {
    toast({
      description: `Downloading ${report.name}`,
    });
  };

  const deleteReport = (id: string) => {
    setSavedReports(savedReports.filter(report => report.id !== id));
    toast({
      description: "Report deleted successfully",
    });
  };

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-10 w-10 text-red-500" />;
      case 'excel':
        return <FileText className="h-10 w-10 text-green-500" />;
      case 'csv':
        return <FileText className="h-10 w-10 text-blue-500" />;
      default:
        return <FileText className="h-10 w-10 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search saved reports..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredReports.length > 0 ? (
          filteredReports.map(report => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="p-2 bg-muted rounded-md mr-4">
                    {getFormatIcon(report.format)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium truncate">{report.name}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {report.description}
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        <span>{new Date(report.createdAt).toLocaleDateString()} at {new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-3.5 w-3.5 mr-1.5" />
                        <span>Created by: {report.createdBy}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-3.5 w-3.5 mr-1.5" />
                        <span>{report.format} • {report.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => viewReport(report)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => downloadReport(report)}
                  >
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Report</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{report.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteReport(report.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8 bg-muted rounded-md">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium">No saved reports found</h4>
            <p className="text-muted-foreground">
              {savedReports.length > 0 
                ? 'Try adjusting your search terms' 
                : 'Generate and save reports to access them later'}
            </p>
          </div>
        )}
      </div>
      
      {selectedReport && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedReport.name}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Created: {new Date(selectedReport.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>By: {selectedReport.createdBy}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>{selectedReport.format} • {selectedReport.size}</span>
                  </div>
                </div>
                <Button variant="outline" onClick={() => downloadReport(selectedReport)}>
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>
              
              <div className="bg-muted rounded-md p-4">
                <p className="text-sm mb-4">{selectedReport.description}</p>
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

export default SavedReports;
