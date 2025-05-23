
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { UserRole } from '@/types/user';
import { toast } from 'sonner';
import { Download, FileText, Calendar, Mail } from 'lucide-react';

interface DataExportPanelProps {
  activeTab: string;
  role: UserRole | null;
  region: string;
}

const DataExportPanel: React.FC<DataExportPanelProps> = ({ 
  activeTab, 
  role, 
  region 
}) => {
  const [exportFormat, setExportFormat] = useState<'excel' | 'csv' | 'pdf'>('excel');
  const [includeCharts, setIncludeCharts] = useState<boolean>(true);
  const [scheduleType, setScheduleType] = useState<'once' | 'daily' | 'weekly' | 'monthly'>('once');
  const [recipients, setRecipients] = useState<string>('');
  
  // Get export title based on active tab
  const getExportTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Dashboard Overview';
      case 'applications':
        return 'Mortgage Applications';
      case 'mortgages':
        return 'Active Mortgages';
      case 'properties':
        return 'Property Inventory';
      case 'payments':
        return 'Payment Collections';
      case 'reports':
        return 'System Reports';
      default:
        return 'Dashboard Data';
    }
  };
  
  const handleExport = () => {
    toast.success(`Exporting ${getExportTitle()} as ${exportFormat.toUpperCase()}`);
    console.log('Export requested', {
      format: exportFormat,
      includeCharts,
      tab: activeTab,
      role,
      region
    });
  };
  
  const handleScheduleExport = () => {
    if (scheduleType === 'once') {
      toast.success(`Export scheduled for delivery`);
    } else {
      toast.success(`Recurring ${scheduleType} export scheduled`);
    }
    
    console.log('Schedule export requested', {
      format: exportFormat,
      includeCharts,
      tab: activeTab,
      role,
      region,
      scheduleType,
      recipients
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-base">Export Options</h4>
          
          <div className="space-y-2">
            <Label>Export Format</Label>
            <RadioGroup 
              value={exportFormat} 
              onValueChange={(value) => setExportFormat(value as 'excel' | 'csv' | 'pdf')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel">Excel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv">CSV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf">PDF</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeCharts" 
              checked={includeCharts}
              onCheckedChange={(checked) => setIncludeCharts(!!checked)}
              disabled={exportFormat === 'csv'}
            />
            <Label htmlFor="includeCharts" className={exportFormat === 'csv' ? 'text-muted-foreground' : ''}>
              Include charts and visualizations
            </Label>
          </div>
          
          <Button onClick={handleExport} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Export {getExportTitle()}
          </Button>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-base">Schedule Export</h4>
          
          <div className="space-y-2">
            <Label htmlFor="scheduleType">Frequency</Label>
            <Select
              value={scheduleType}
              onValueChange={(value) => setScheduleType(value as 'once' | 'daily' | 'weekly' | 'monthly')}
            >
              <SelectTrigger id="scheduleType">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="once">One-time</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="recipients">Email Recipients</Label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                id="recipients"
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter email addresses, separated by commas"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">Enter one or more email addresses</p>
          </div>
          
          <Button onClick={handleScheduleExport} variant="outline" className="w-full">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Export
          </Button>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center">
          <FileText className="h-4 w-4 text-muted-foreground mr-2" />
          <p className="text-sm text-muted-foreground">
            Exporting data from <span className="font-medium">{getExportTitle()}</span> {region !== 'All Regions' ? `for ${region}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataExportPanel;
