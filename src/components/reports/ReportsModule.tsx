
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  FileText, 
  ListFilter,
  Clock,
  PlusCircle,
  Calendar
} from 'lucide-react';
import StandardReports from './StandardReports';
import CustomReports from './CustomReports';
import ScheduledReports from './ScheduledReports';
import SavedReports from './SavedReports';

const ReportsModule = () => {
  const [activeTab, setActiveTab] = useState('standard');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const reportStats = [
    { title: "Reports Available", value: "42", icon: FileText, className: "text-blue-500" },
    { title: "Reports Generated (Month)", value: "156", icon: BarChart3, className: "text-green-500" },
    { title: "Scheduled Reports", value: "8", icon: Clock, className: "text-purple-500" },
    { title: "Saved Reports", value: "15", icon: Calendar, className: "text-amber-500" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {reportStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-center space-x-4">
              <div className={`rounded-full p-2 ${stat.className} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.className}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Reports Center</CardTitle>
          <CardDescription>
            Generate, customize, and schedule reports for various stakeholders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="standard">Standard Reports</TabsTrigger>
              <TabsTrigger value="custom">Custom Reports</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="saved">Saved Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="standard" className="space-y-4 mt-4">
              <StandardReports />
            </TabsContent>
            
            <TabsContent value="custom" className="space-y-4 mt-4">
              <CustomReports />
            </TabsContent>
            
            <TabsContent value="scheduled" className="space-y-4 mt-4">
              <ScheduledReports />
            </TabsContent>
            
            <TabsContent value="saved" className="space-y-4 mt-4">
              <SavedReports />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsModule;
