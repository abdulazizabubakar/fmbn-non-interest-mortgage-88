
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Play, 
  Square,
  Circle,
  Diamond,
  Octagon,
  User,
  Timer,
  BarChart3
} from 'lucide-react';
import { ProcessNode } from '@/types/process-flow';
import { cn } from '@/lib/utils';

interface ProcessNodeComponentProps {
  data: ProcessNode & { 
    processFlow?: string;
    isSelected?: boolean;
    isSimulating?: boolean;
  };
}

const ProcessNodeComponent: React.FC<ProcessNodeComponentProps> = ({ data }) => {
  const getStatusIcon = () => {
    switch (data.status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Play className="h-4 w-4 text-blue-600" />;
      case 'delayed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-700" />;
      case 'skipped':
        return <Circle className="h-4 w-4 text-gray-400" />;
      default:
        return <Circle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    const baseClasses = 'transition-all duration-200 hover:shadow-lg';
    const selectedClasses = data.isSelected ? 'ring-2 ring-purple-500 ring-offset-2' : '';
    const simulatingClasses = data.isSimulating ? 'animate-pulse' : '';
    
    switch (data.status) {
      case 'completed': 
        return cn('border-green-500 bg-green-50 hover:bg-green-100', baseClasses, selectedClasses, simulatingClasses);
      case 'in-progress': 
        return cn('border-blue-500 bg-blue-50 hover:bg-blue-100', baseClasses, selectedClasses, simulatingClasses);
      case 'delayed': 
        return cn('border-red-500 bg-red-50 hover:bg-red-100', baseClasses, selectedClasses, simulatingClasses);
      case 'pending': 
        return cn('border-yellow-500 bg-yellow-50 hover:bg-yellow-100', baseClasses, selectedClasses, simulatingClasses);
      case 'failed': 
        return cn('border-red-700 bg-red-100 hover:bg-red-150', baseClasses, selectedClasses, simulatingClasses);
      case 'skipped': 
        return cn('border-gray-400 bg-gray-50 hover:bg-gray-100', baseClasses, selectedClasses, simulatingClasses);
      default: 
        return cn('border-gray-300 bg-gray-50 hover:bg-gray-100', baseClasses, selectedClasses, simulatingClasses);
    }
  };

  const getNodeShape = () => {
    switch (data.type) {
      case 'start':
        return 'rounded-full border-4';
      case 'end':
        return 'rounded-full border-4';
      case 'decision':
        return 'rounded-lg rotate-45 border-4';
      case 'gateway':
        return 'rounded-lg transform rotate-45 border-4';
      default:
        return 'rounded-lg border-2';
    }
  };

  const getTypeIcon = () => {
    switch (data.type) {
      case 'start': return <Circle className="h-3 w-3 text-green-600" />;
      case 'end': return <Octagon className="h-3 w-3 text-red-600" />;
      case 'decision': return <Diamond className="h-3 w-3 text-yellow-600" />;
      case 'gateway': return <Diamond className="h-3 w-3 text-purple-600" />;
      case 'task': return <Square className="h-3 w-3 text-blue-600" />;
      default: return <Square className="h-3 w-3 text-gray-600" />;
    }
  };

  const getProgressPercentage = () => {
    if (data.status === 'completed') return 100;
    if (data.status === 'in-progress') return 60;
    if (data.status === 'delayed') return 30;
    return 0;
  };

  const isDecisionNode = data.type === 'decision' || data.type === 'gateway';

  return (
    <div className="relative group">
      <Handle 
        type="target" 
        position={Position.Left} 
        className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-400 border-2 border-white" 
        style={{ left: -8 }}
      />
      
      <Card className={cn(
        `w-56 min-h-[120px] cursor-pointer select-none drag-handle ${getStatusColor()} ${getNodeShape()}`,
        isDecisionNode && "w-40 h-40 flex items-center justify-center",
        data.isSelected && "shadow-xl scale-105"
      )}>
        <CardContent className={cn(
          "p-4 space-y-3 h-full flex flex-col",
          isDecisionNode && "transform -rotate-45 text-center items-center justify-center"
        )}>
          {/* Header with type and status */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {getTypeIcon()}
              <Badge variant="outline" className="text-xs px-2 py-1">
                {data.type}
              </Badge>
            </div>
            <div className="flex flex-col items-end gap-1">
              {getStatusIcon()}
              {data.isSimulating && (
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              )}
            </div>
          </div>
          
          {/* Title and description */}
          <div className="flex-1">
            <h4 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">
              {data.title}
            </h4>
            {data.description && !isDecisionNode && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {data.description}
              </p>
            )}
          </div>

          {/* Additional info for non-decision nodes */}
          {!isDecisionNode && (
            <div className="space-y-2">
              {/* Assignee */}
              {data.assignedTo && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span className="truncate">{data.assignedTo}</span>
                </div>
              )}

              {/* Duration */}
              {data.estimatedDuration && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Timer className="h-3 w-3" />
                  <span>{data.estimatedDuration}h est.</span>
                  {data.actualDuration && (
                    <span className="text-blue-600">({data.actualDuration}h actual)</span>
                  )}
                </div>
              )}

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    data.status === 'completed' && "bg-green-500",
                    data.status === 'in-progress' && "bg-blue-500",
                    data.status === 'delayed' && "bg-red-500",
                    data.status === 'pending' && "bg-yellow-500"
                  )}
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>

              {/* Metrics */}
              {data.metrics && (
                <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200">
                  <div className="flex items-center gap-1 text-green-600">
                    <BarChart3 className="h-3 w-3" />
                    <span>{data.metrics.completionRate}%</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <Timer className="h-3 w-3" />
                    <span>{data.metrics.averageTime}h</span>
                  </div>
                  {data.metrics.delayCount > 0 && (
                    <div className="flex items-center gap-1 text-red-600">
                      <AlertTriangle className="h-3 w-3" />
                      <span>{data.metrics.delayCount}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Handle 
        type="source" 
        position={Position.Right} 
        className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-400 border-2 border-white" 
        style={{ right: -8 }}
      />
      
      {/* Hover tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
        Double-click to focus • Click for details
      </div>
    </div>
  );
};

export default ProcessNodeComponent;
