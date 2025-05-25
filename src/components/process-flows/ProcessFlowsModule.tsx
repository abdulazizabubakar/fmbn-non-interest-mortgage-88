
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  BarChart3, 
  Eye, 
  Filter, 
  RefreshCw, 
  Settings, 
  Search, 
  SortAsc, 
  SortDesc,
  Play,
  Pause,
  Download,
  MoreHorizontal
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ProcessFlowDashboard from './ProcessFlowDashboard';
import ProcessFlowCanvas from './ProcessFlowCanvas';
import ProcessMetricsPanel from './ProcessMetricsPanel';
import ProcessInstancesTable from './ProcessInstancesTable';
import { mockProcessFlows } from '@/data/mockProcessFlows';
import { ProcessFlow } from '@/types/process-flow';
import { toast } from '@/hooks/use-toast';

const ProcessFlowsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProcess, setSelectedProcess] = useState<ProcessFlow | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'updated' | 'progress'>('updated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Advanced filtering and search
  const filteredProcesses = useMemo(() => {
    let filtered = mockProcessFlows.filter(process => {
      // Category filter
      if (selectedCategory !== 'all' && process.category !== selectedCategory) return false;
      
      // Status filter
      if (selectedStatus !== 'all' && process.status !== selectedStatus) return false;
      
      // Active only filter
      if (showOnlyActive && process.status !== 'active') return false;
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          process.name.toLowerCase().includes(query) ||
          process.description.toLowerCase().includes(query) ||
          process.nodes.some(node => 
            node.title.toLowerCase().includes(query) ||
            node.description?.toLowerCase().includes(query)
          )
        );
      }
      
      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'updated':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'progress':
          const aProgress = (a.nodes.filter(n => n.status === 'completed').length / a.nodes.length) * 100;
          const bProgress = (b.nodes.filter(n => n.status === 'completed').length / b.nodes.length) * 100;
          comparison = aProgress - bProgress;
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [selectedCategory, selectedStatus, searchQuery, sortBy, sortOrder, showOnlyActive]);

  const handleProcessSelect = (process: ProcessFlow) => {
    setSelectedProcess(process);
    setActiveTab('flow-diagram');
    toast({
      title: "Process Selected",
      description: `Now viewing: ${process.name}`,
    });
  };

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const handleSimulationToggle = () => {
    setIsSimulating(!isSimulating);
  };

  const handleRefresh = () => {
    toast({
      title: "Data Refreshed",
      description: "Process flow data has been updated",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Process flow data is being exported...",
    });
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSearchQuery('');
    setShowOnlyActive(false);
    setSortBy('updated');
    setSortOrder('desc');
  };

  // Auto-refresh effect
  React.useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      handleRefresh();
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getFilterSummary = () => {
    const total = mockProcessFlows.length;
    const filtered = filteredProcesses.length;
    return `${filtered} of ${total} processes`;
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Process Flows</h1>
          <p className="text-muted-foreground">
            Visualize and monitor business process workflows in real-time
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">{getFilterSummary()}</Badge>
            {isSimulating && (
              <Badge variant="default" className="bg-blue-500 animate-pulse">
                Simulation Active
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search processes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-64"
            />
          </div>

          {/* Quick Filters */}
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

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy('name')}>
                Sort by Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('updated')}>
                Sort by Updated
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('progress')}>
                Sort by Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={clearFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
            <Label htmlFor="auto-refresh" className="text-sm">Auto-refresh</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active-only"
              checked={showOnlyActive}
              onCheckedChange={setShowOnlyActive}
            />
            <Label htmlFor="active-only" className="text-sm">Active only</Label>
          </div>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="flow-diagram" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Flow Diagram
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="instances" className="flex items-center gap-2">
            {isSimulating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            Instances
          </TabsTrigger>
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
                  <Badge variant="outline">v{selectedProcess.version}</Badge>
                </div>
              </div>
              <ProcessFlowCanvas 
                processFlow={selectedProcess} 
                onNodeSelect={handleNodeSelect}
                isSimulating={isSimulating}
                onSimulationToggle={handleSimulationToggle}
              />
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
                  <Button 
                    className="mt-4" 
                    onClick={() => setActiveTab('overview')}
                  >
                    Go to Overview
                  </Button>
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
