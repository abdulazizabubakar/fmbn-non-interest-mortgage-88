
import React, { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Position,
  MarkerType,
  ConnectionMode,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ProcessFlow } from '@/types/process-flow';
import ProcessNodeComponent from './ProcessNodeComponent';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProcessFlowCanvasProps {
  processFlow: ProcessFlow;
  onNodeSelect?: (nodeId: string) => void;
  isSimulating?: boolean;
  onSimulationToggle?: () => void;
}

const nodeTypes = {
  processNode: ProcessNodeComponent,
};

const ProcessFlowCanvas: React.FC<ProcessFlowCanvasProps> = ({ 
  processFlow, 
  onNodeSelect,
  isSimulating = false,
  onSimulationToggle 
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Convert process flow data to React Flow format
  const initialNodes: Node[] = useMemo(() => {
    return processFlow.nodes.map((node, index) => {
      const x = (index % 4) * 280 + 100;
      const y = Math.floor(index / 4) * 180 + 50;
      
      return {
        id: node.id,
        type: 'processNode',
        position: { x, y },
        data: { 
          ...node,
          processFlow: processFlow.name,
          isSelected: selectedNodeId === node.id,
          isSimulating: isSimulating
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        dragHandle: '.drag-handle',
      };
    });
  }, [processFlow, selectedNodeId, isSimulating]);

  const initialEdges: Edge[] = useMemo(() => {
    return processFlow.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label || edge.condition,
      type: 'smoothstep',
      animated: edge.condition || isSimulating ? true : false,
      style: {
        stroke: edge.condition ? '#f59e0b' : isSimulating ? '#3b82f6' : '#6b7280',
        strokeWidth: isSimulating ? 3 : 2,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: edge.condition ? '#f59e0b' : isSimulating ? '#3b82f6' : '#6b7280',
      },
    }));
  }, [processFlow, isSimulating]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Node clicked:', node.data);
    setSelectedNodeId(node.id);
    onNodeSelect?.(node.id);
    
    // Show node details in toast
    toast({
      title: `${node.data.title}`,
      description: `Status: ${node.data.status} | Type: ${node.data.type}${node.data.assignedTo ? ` | Assigned to: ${node.data.assignedTo}` : ''}`,
    });
  }, [onNodeSelect]);

  const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
    // Zoom to node
    const reactFlowInstance = (event.target as any).closest('.react-flow');
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ 
        nodes: [node], 
        padding: 0.3,
        duration: 800 
      });
    }
  }, []);

  const handleSimulationToggle = useCallback(() => {
    onSimulationToggle?.();
    toast({
      title: isSimulating ? "Simulation Stopped" : "Simulation Started",
      description: isSimulating ? "Process flow simulation has been stopped" : "Process flow simulation is now running",
    });
  }, [isSimulating, onSimulationToggle]);

  const handleReset = useCallback(() => {
    setSelectedNodeId(null);
    setNodes(initialNodes);
    setEdges(initialEdges);
    toast({
      title: "View Reset",
      description: "Process flow view has been reset to original state",
    });
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  // Update nodes when selection or simulation state changes
  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isSelected: selectedNodeId === node.id,
          isSimulating: isSimulating,
        },
      }))
    );
  }, [selectedNodeId, isSimulating, setNodes]);

  const getProcessStats = () => {
    const total = processFlow.nodes.length;
    const completed = processFlow.nodes.filter(n => n.status === 'completed').length;
    const inProgress = processFlow.nodes.filter(n => n.status === 'in-progress').length;
    const delayed = processFlow.nodes.filter(n => n.status === 'delayed').length;
    const pending = processFlow.nodes.filter(n => n.status === 'pending').length;

    return { total, completed, inProgress, delayed, pending };
  };

  const stats = getProcessStats();

  return (
    <div className={`relative border rounded-lg bg-gray-50 transition-all duration-300 ${
      isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[700px]'
    }`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        attributionPosition="bottom-left"
        className="bg-white"
        proOptions={{ hideAttribution: true }}
      >
        <Background 
          color="#f1f5f9" 
          gap={20} 
          variant={BackgroundVariant.Dots}
          className={isSimulating ? 'animate-pulse' : ''} 
        />
        <Controls 
          showZoom={true}
          showFitView={true}
          showInteractive={true}
          position="bottom-right"
        />
        <MiniMap
          nodeColor={(node) => {
            if (node.id === selectedNodeId) return '#8b5cf6';
            switch (node.data.status) {
              case 'completed': return '#22c55e';
              case 'in-progress': return '#3b82f6';
              case 'delayed': return '#ef4444';
              case 'pending': return '#eab308';
              default: return '#6b7280';
            }
          }}
          className="bg-white border shadow-lg"
          zoomable
          pannable
        />
        
        {/* Control Panel */}
        <Panel position="top-left" className="space-y-2">
          <Card className="p-3 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Button
                size="sm"
                variant={isSimulating ? "destructive" : "default"}
                onClick={handleSimulationToggle}
              >
                {isSimulating ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
                {isSimulating ? "Stop" : "Simulate"}
              </Button>
              <Button size="sm" variant="outline" onClick={handleReset}>
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </Button>
              <Button size="sm" variant="outline" onClick={toggleFullscreen}>
                <Maximize2 className="h-3 w-3 mr-1" />
                {isFullscreen ? "Exit" : "Fullscreen"}
              </Button>
            </div>
            
            {/* Process Statistics */}
            <div className="flex gap-1 text-xs">
              <Badge variant="secondary">{stats.total} Total</Badge>
              <Badge variant="default" className="bg-green-500">{stats.completed} Done</Badge>
              <Badge variant="default" className="bg-blue-500">{stats.inProgress} Active</Badge>
              <Badge variant="default" className="bg-red-500">{stats.delayed} Delayed</Badge>
              <Badge variant="outline">{stats.pending} Pending</Badge>
            </div>
          </Card>
        </Panel>

        {/* Selected Node Info Panel */}
        {selectedNodeId && (
          <Panel position="top-right" className="w-72">
            <Card className="p-4 shadow-lg">
              <CardContent className="p-0">
                {(() => {
                  const selectedNode = processFlow.nodes.find(n => n.id === selectedNodeId);
                  if (!selectedNode) return null;
                  
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{selectedNode.title}</h4>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setSelectedNodeId(null)}
                        >
                          ×
                        </Button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge variant="outline">{selectedNode.status}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span>{selectedNode.type}</span>
                        </div>
                        {selectedNode.assignedTo && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Assigned:</span>
                            <span>{selectedNode.assignedTo}</span>
                          </div>
                        )}
                        {selectedNode.estimatedDuration && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Est. Duration:</span>
                            <span>{selectedNode.estimatedDuration}h</span>
                          </div>
                        )}
                        {selectedNode.description && (
                          <div>
                            <span className="text-muted-foreground">Description:</span>
                            <p className="text-xs mt-1">{selectedNode.description}</p>
                          </div>
                        )}
                        {selectedNode.metrics && (
                          <div className="pt-2 border-t">
                            <span className="text-muted-foreground text-xs">Performance Metrics:</span>
                            <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
                              <div>Completion: {selectedNode.metrics.completionRate}%</div>
                              <div>Avg Time: {selectedNode.metrics.averageTime}h</div>
                              <div>Delays: {selectedNode.metrics.delayCount}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

export default ProcessFlowCanvas;
