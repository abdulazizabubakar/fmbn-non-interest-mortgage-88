
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { 
  FileText, 
  Download, 
  Send, 
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Filter
} from 'lucide-react';

const RegulatoryReporting = () => {
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date>();

  const regulatoryReports = [
    {
      id: 'CBN-001',
      title: 'CBN Mortgage Lending Statistics',
      regulator: 'CBN',
      frequency: 'Monthly',
      dueDate: '2024-01-15',
      status: 'completed',
      lastGenerated: '2024-01-12',
      nextDue: '2024-02-15'
    },
    {
      id: 'CBN-002',
      title: 'Risk Assessment Report',
      regulator: 'CBN',
      frequency: 'Quarterly',
      dueDate: '2024-01-31',
      status: 'pending',
      lastGenerated: '2023-10-30',
      nextDue: '2024-01-31'
    },
    {
      id: 'NDIC-001',
      title: 'Deposit Insurance Coverage Report',
      regulator: 'NDIC',
      frequency: 'Monthly',
      dueDate: '2024-01-20',
      status: 'overdue',
      lastGenerated: '2023-12-15',
      nextDue: '2024-01-20'
    },
    {
      id: 'NDIC-002',
      title: 'Risk Profile Assessment',
      regulator: 'NDIC',
      frequency: 'Quarterly',
      dueDate: '2024-02-15',
      status: 'draft',
      lastGenerated: null,
      nextDue: '2024-02-15'
    },
    {
      id: 'INT-001',
      title: 'Management Dashboard Report',
      regulator: 'Internal',
      frequency: 'Weekly',
      dueDate: '2024-01-08',
      status: 'completed',
      lastGenerated: '2024-01-05',
      nextDue: '2024-01-15'
    },
    {
      id: 'INT-002',
      title: 'Board Presentation Report',
      regulator: 'Internal',
      frequency: 'Monthly',
      dueDate: '2024-01-25',
      status: 'in-progress',
      lastGenerated: '2023-12-20',
      nextDue: '2024-01-25'
    }
  ];

  const reportTemplates = [
    {
      name: 'CBN Mortgage Statistics Template',
      description: 'Standard CBN format for mortgage lending data',
      regulator: 'CBN',
      format: 'Excel'
    },
    {
      name: 'NDIC Risk Assessment Template',
      description: 'NDIC compliance and risk assessment format',
      regulator: 'NDIC',
      format: 'PDF'
    },
    {
      name: 'Management Dashboard Template',
      description: 'Internal management reporting template',
      regulator: 'Internal',
      format: 'PowerPoint'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'overdue':
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Overdue</Badge>;
      case 'draft':
        return <Badge variant="outline"><FileText className="h-3 w-3 mr-1" />Draft</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />In Progress</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredReports = regulatoryReports.filter(report => {
    const matchesType = selectedReportType === 'all' || report.regulator.toLowerCase() === selectedReportType;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    return matchesType && matchesStatus;
  });

  const reportStats = [
    { title: "Total Reports", value: regulatoryReports.length, color: "blue" },
    { title: "Completed", value: regulatoryReports.filter(r => r.status === 'completed').length, color: "green" },
    { title: "Pending", value: regulatoryReports.filter(r => r.status === 'pending').length, color: "yellow" },
    { title: "Overdue", value: regulatoryReports.filter(r => r.status === 'overdue').length, color: "red" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reportStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'yellow' ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}>
                  <FileText className={`h-6 w-6 ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'yellow' ? 'text-yellow-600' :
                    'text-red-600'
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <Select value={selectedReportType} onValueChange={setSelectedReportType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Regulators" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regulators</SelectItem>
              <SelectItem value="cbn">CBN</SelectItem>
              <SelectItem value="ndic">NDIC</SelectItem>
              <SelectItem value="internal">Internal</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[140px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Regulatory Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div key={report.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {report.regulator} • {report.frequency} • Due: {report.dueDate}
                      </p>
                    </div>
                    {getStatusBadge(report.status)}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {report.lastGenerated ? `Last generated: ${report.lastGenerated}` : 'Not generated yet'}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>                     
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm">
                        <Send className="h-3 w-3 mr-1" />
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Templates & Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reportTemplates.map((template, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-sm">{template.name}</h5>
                      <Badge variant="outline" className="text-xs">
                        {template.format}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {template.description}
                    </p>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" className="text-xs h-7">
                        Use Template
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Schedule Batch Reports
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Send className="h-4 w-4 mr-2" />
                  Submit All Pending
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export All Reports
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegulatoryReporting;
