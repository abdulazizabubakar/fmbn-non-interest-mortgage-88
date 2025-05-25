
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Eye, Play, Pause, RotateCcw } from 'lucide-react';
import { mockProcessInstances } from '@/data/mockProcessFlows';

const ProcessInstancesTable: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'default';
      case 'completed': return 'secondary';
      case 'failed': return 'destructive';
      case 'paused': return 'outline';
      default: return 'secondary';
    }
  };

  const formatDuration = (startDate: Date) => {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ${hours % 24}h`;
    }
    return `${hours}h`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Process Instances</CardTitle>
        <CardDescription>Real-time monitoring of running process instances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockProcessInstances.map((instance) => (
            <div 
              key={instance.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="font-medium">{instance.id}</h4>
                  <Badge variant={getStatusColor(instance.status)}>
                    {instance.status}
                  </Badge>
                  {instance.entityId && (
                    <span className="text-sm text-muted-foreground">
                      {instance.entityType}: {instance.entityId}
                    </span>
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{instance.progress}%</span>
                  </div>
                  <Progress value={instance.progress} className="h-2" />
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Current: {instance.currentNodeId}</span>
                  <span>Duration: {formatDuration(instance.startedAt)}</span>
                  <span>Started: {instance.startedAt.toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <Button size="sm" variant="outline">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                {instance.status === 'running' && (
                  <Button size="sm" variant="outline">
                    <Pause className="h-3 w-3 mr-1" />
                    Pause
                  </Button>
                )}
                {instance.status === 'paused' && (
                  <Button size="sm" variant="outline">
                    <Play className="h-3 w-3 mr-1" />
                    Resume
                  </Button>
                )}
                {instance.status === 'failed' && (
                  <Button size="sm" variant="outline">
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Retry
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessInstancesTable;
