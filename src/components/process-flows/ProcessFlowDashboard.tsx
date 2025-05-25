
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Eye, Users, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { ProcessFlow } from '@/types/process-flow';
import { mockProcessMetrics } from '@/data/mockProcessFlows';

interface ProcessFlowDashboardProps {
  processes: ProcessFlow[];
  onProcessSelect: (process: ProcessFlow) => void;
}

const ProcessFlowDashboard: React.FC<ProcessFlowDashboardProps> = ({ 
  processes, 
  onProcessSelect 
}) => {
  const metrics = mockProcessMetrics;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'delayed': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mortgage': return '🏠';
      case 'finance': return '💰';
      case 'property': return '🏢';
      case 'document': return '📄';
      case 'customer': return '👥';
      default: return '⚙️';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Processes</p>
                <p className="text-2xl font-bold">{metrics.totalProcesses}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Processes</p>
                <p className="text-2xl font-bold">{metrics.activeProcesses}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
                <p className="text-2xl font-bold">{metrics.completedToday}</p>
              </div>
              <div className="p-2 bg-indigo-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delayed</p>
                <p className="text-2xl font-bold">{metrics.delayedProcesses}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Overall Performance</CardTitle>
          <CardDescription>System-wide process performance metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Performance Score</span>
              <span className="font-medium">{metrics.performanceScore}%</span>
            </div>
            <Progress value={metrics.performanceScore} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Avg Completion Time</span>
              <p className="font-medium">{metrics.averageCompletionTime} hours</p>
            </div>
            <div>
              <span className="text-muted-foreground">Efficiency Rate</span>
              <p className="font-medium">
                {Math.round((metrics.completedToday / metrics.activeProcesses) * 100)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process List */}
      <Card>
        <CardHeader>
          <CardTitle>Available Process Flows</CardTitle>
          <CardDescription>Click on any process to view its detailed workflow diagram</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {processes.map((process) => {
              const completedNodes = process.nodes.filter(node => node.status === 'completed').length;
              const totalNodes = process.nodes.length;
              const progressPercentage = (completedNodes / totalNodes) * 100;

              return (
                <Card key={process.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getCategoryIcon(process.category)}</span>
                          <div>
                            <h3 className="font-medium">{process.name}</h3>
                            <p className="text-sm text-muted-foreground">{process.description}</p>
                          </div>
                        </div>
                        <Badge variant={process.status === 'active' ? 'default' : 'secondary'}>
                          {process.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{completedNodes}/{totalNodes} steps</span>
                        </div>
                        <Progress value={progressPercentage} className="h-1" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>v{process.version}</span>
                          <span>{process.nodes.length} steps</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onProcessSelect(process)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Flow
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessFlowDashboard;
