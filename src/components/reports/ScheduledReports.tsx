
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Mail, FileText, Download, Plus, Trash, Check, X, Edit } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { mockScheduledReports } from '@/data/mockReports';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ScheduledReports = () => {
  const [scheduledReports, setScheduledReports] = useState(mockScheduledReports);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<any>(null);
  const [newSchedule, setNewSchedule] = useState({
    reportName: '',
    frequency: 'monthly',
    nextRun: '',
    recipients: '',
    format: 'pdf',
    active: true
  });

  const toggleActive = (id: string) => {
    setScheduledReports(
      scheduledReports.map(report => 
        report.id === id 
          ? { ...report, active: !report.active } 
          : report
      )
    );

    const report = scheduledReports.find(r => r.id === id);
    if (report) {
      toast({
        description: `${report.reportName} schedule ${report.active ? 'deactivated' : 'activated'}`,
      });
    }
  };

  const deleteSchedule = (id: string) => {
    const report = scheduledReports.find(r => r.id === id);
    setScheduledReports(scheduledReports.filter(report => report.id !== id));
    
    if (report) {
      toast({
        description: `${report.reportName} schedule deleted`,
      });
    }
  };

  const editSchedule = (report: any) => {
    setEditingReport(report);
    setNewSchedule({
      reportName: report.reportName,
      frequency: report.frequency.toLowerCase(),
      nextRun: new Date(report.nextRun).toISOString().split('T')[0],
      recipients: report.recipients.join(', '),
      format: report.format.toLowerCase(),
      active: report.active
    });
    setIsDialogOpen(true);
  };

  const addNewSchedule = () => {
    setEditingReport(null);
    setNewSchedule({
      reportName: '',
      frequency: 'monthly',
      nextRun: '',
      recipients: '',
      format: 'pdf',
      active: true
    });
    setIsDialogOpen(true);
  };

  const handleSaveSchedule = () => {
    if (!newSchedule.reportName || !newSchedule.nextRun || !newSchedule.recipients) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (editingReport) {
      // Update existing schedule
      setScheduledReports(
        scheduledReports.map(report => 
          report.id === editingReport.id
            ? {
                ...report,
                reportName: newSchedule.reportName,
                frequency: newSchedule.frequency.charAt(0).toUpperCase() + newSchedule.frequency.slice(1),
                nextRun: newSchedule.nextRun + ' 00:00:00',
                recipients: newSchedule.recipients.split(',').map(r => r.trim()),
                format: newSchedule.format.charAt(0).toUpperCase() + newSchedule.format.slice(1),
                active: newSchedule.active
              }
            : report
        )
      );
      
      toast({
        description: `Schedule for ${newSchedule.reportName} updated`,
      });
    } else {
      // Add new schedule
      const newId = `sched-${Date.now()}`;
      setScheduledReports([
        ...scheduledReports,
        {
          id: newId,
          reportName: newSchedule.reportName,
          frequency: newSchedule.frequency.charAt(0).toUpperCase() + newSchedule.frequency.slice(1),
          nextRun: newSchedule.nextRun + ' 00:00:00',
          recipients: newSchedule.recipients.split(',').map(r => r.trim()),
          format: newSchedule.format.charAt(0).toUpperCase() + newSchedule.format.slice(1),
          active: newSchedule.active
        }
      ]);
      
      toast({
        description: `New schedule created for ${newSchedule.reportName}`,
      });
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Scheduled Reports</h3>
        <Button onClick={addNewSchedule}>
          <Plus className="h-4 w-4 mr-2" /> Add Schedule
        </Button>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {scheduledReports.map(report => (
          <Card key={report.id} className="overflow-hidden">
            <div className={`h-1 w-full ${report.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{report.reportName}</h4>
                  <div className="flex items-center space-x-1 mt-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{report.frequency}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Next run: {new Date(report.nextRun).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{report.recipients.length} recipient(s)</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Format: {report.format}</span>
                  </div>
                </div>
                <Switch 
                  checked={report.active} 
                  onCheckedChange={() => toggleActive(report.id)}
                />
              </div>
              
              <div className="flex justify-end space-x-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => editSchedule(report)}
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500"
                  onClick={() => deleteSchedule(report.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {scheduledReports.length === 0 && (
          <div className="col-span-full text-center py-8 bg-muted rounded-md">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium">No scheduled reports</h4>
            <p className="text-muted-foreground">
              Set up automated report generation and delivery
            </p>
            <Button className="mt-4" onClick={addNewSchedule}>
              <Plus className="h-4 w-4 mr-2" /> Add Your First Schedule
            </Button>
          </div>
        )}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingReport ? 'Edit Report Schedule' : 'Create New Report Schedule'}
            </DialogTitle>
            <DialogDescription>
              Set up automated generation and delivery of reports
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="report-name">Report Name *</Label>
              <Input 
                id="report-name" 
                placeholder="e.g., Monthly Performance Report" 
                value={newSchedule.reportName}
                onChange={(e) => setNewSchedule({ ...newSchedule, reportName: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select 
                value={newSchedule.frequency} 
                onValueChange={(value) => setNewSchedule({ ...newSchedule, frequency: value })}
              >
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="next-run">Next Run Date *</Label>
              <Input 
                id="next-run" 
                type="date" 
                value={newSchedule.nextRun}
                onChange={(e) => setNewSchedule({ ...newSchedule, nextRun: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipients">Recipients *</Label>
              <Input 
                id="recipients" 
                placeholder="Email addresses (comma separated)" 
                value={newSchedule.recipients}
                onChange={(e) => setNewSchedule({ ...newSchedule, recipients: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Enter multiple email addresses separated by commas
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="format">Report Format</Label>
              <Select 
                value={newSchedule.format} 
                onValueChange={(value) => setNewSchedule({ ...newSchedule, format: value })}
              >
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="active" 
                checked={newSchedule.active}
                onCheckedChange={(checked) => setNewSchedule({ ...newSchedule, active: checked })}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSchedule}>
              {editingReport ? 'Update Schedule' : 'Create Schedule'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduledReports;
