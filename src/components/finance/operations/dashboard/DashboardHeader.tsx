
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Filter, FileText, Download } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, description }) => {
  const { toast } = useToast();
  
  const handleExportData = () => {
    toast({
      title: "Export initiated",
      description: "Your financial data is being prepared for download",
    });
  };
  
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-nimms-primary">{title}</h2>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" size="sm" className="h-9" onClick={handleExportData}>
          <FileText className="h-4 w-4 mr-2" />
          Export Reports
        </Button>
        <Button size="sm" className="h-9 bg-nimms-primary hover:bg-nimms-primary/90">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
