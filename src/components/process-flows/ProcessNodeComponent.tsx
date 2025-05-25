
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
  Octagon
} from 'lucide-react';
import { ProcessNode } from '@/types/process-flow';

interface ProcessNodeComponentProps {
  data: ProcessNode & { processFlow?: string };
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
      default:
        return <Circle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (data.status) {
      case 'completed': return 'border-green-500 bg-green-50';
      case 'in-progress': return 'border-blue-500 bg-blue-50';
      case 'delayed': return 'border-red-500 bg-red-50';
      case 'pending': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getNodeShape = () => {
    switch (data.type) {
      case 'start':
        return 'rounded-full';
      case 'end':
        return 'rounded-full';
      case 'decision':
        return 'transform rotate-45';
      default:
        return 'rounded-lg';
    }
  };

  const getTypeIcon = () => {
    switch (data.type) {
      case 'start': return <Circle className="h-3 w-3" />;
      case 'end': return <Octagon className="h-3 w-3" />;
      case 'decision': return <Diamond className="h-3 w-3" />;
      default: return <Square className="h-3 w-3" />;
    }
  };

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="opacity-0" />
      
      <Card className={`w-48 min-h-[100px] ${getStatusColor()} border-2 ${getNodeShape()} shadow-sm hover:shadow-md transition-shadow`}>
        <CardContent className="p-3 space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1">
              {getTypeIcon()}
              <Badge variant="outline" className="text-xs">
                {data.type}
              </Badge>
            </div>
            {getStatusIcon()}
          </div>
          
          <div>
            <h4 className="font-medium text-sm leading-tight">{data.title}</h4>
            {data.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {data.description}
              </p>
            )}
          </div>

          {data.assignedTo && (
            <div className="text-xs text-muted-foreground">
              👤 {data.assignedTo}
            </div>
          )}

          {data.metrics && (
            <div className="flex justify-between text-xs">
              <span className="text-green-600">
                {data.metrics.completionRate}% ✓
              </span>
              <span className="text-blue-600">
                {data.metrics.averageTime}h ⏱
              </span>
              {data.metrics.delayCount > 0 && (
                <span className="text-red-600">
                  {data.metrics.delayCount} ⚠
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Handle type="source" position={Position.Right} className="opacity-0" />
    </div>
  );
};

export default ProcessNodeComponent;
