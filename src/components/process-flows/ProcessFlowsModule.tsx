
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Eye, Filter, RefreshCw, Settings } from 'lucide-react';
import ProcessFlowDashboard from './ProcessFlowDashboard';
import ProcessFlowCanvas from './ProcessFlowCanvas';
import ProcessMetricsPanel from './ProcessMetricsPanel';
import ProcessInstancesTable from './ProcessInstancesTable';
import { mockProcessFlows } from '@/data/mockProcessFlows';
import { ProcessFlow } from '@/types/process-flow';

const ProcessFlowsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProcess, setSelectedProcess] = useState<ProcessFlow | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProcesses = mockProcessFlows.filter(process => 
    selectedCategory === 'all' || process.category === selectedCategory
  );

  const handleProcessSelect = (process: ProcessFlow) => {
    setSelectedProcess(process);
    setActiveTab('flow-diagram');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Process Flows</h1>
          <p className="text-muted-foreground">
            Visualize and monitor business process workflows in real-time
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="mortgage">Mortgage</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="property">Property</SelectItem>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="flow-diagram">Flow Diagram</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="instances">Active Instances</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <ProcessFlowDashboard 
            processes={filteredProcesses}
            onProcessSelect={handleProcessSelect}
          />
        </TabsContent>

        <TabsContent value="flow-diagram" className="mt-6">
          {selectedProcess ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{selectedProcess.name}</h2>
                  <p className="text-muted-foreground">{selectedProcess.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{selectedProcess.category}</Badge>
                  <Badge variant={selectedProcess.status === 'active' ? 'default' : 'secondary'}>
                    {selectedProcess.status}
                  </Badge>
                </div>
              </div>
              <ProcessFlowCanvas processFlow={selectedProcess} />
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Eye className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Select a Process Flow</h3>
                  <p className="text-muted-foreground">
                    Choose a process from the overview to visualize its workflow
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <ProcessMetricsPanel selectedCategory={selectedCategory} />
        </TabsContent>

        <TabsContent value="instances" className="mt-6">
          <ProcessInstancesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProcessFlowsModule;
