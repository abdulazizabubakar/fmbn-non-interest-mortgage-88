
import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Position,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ProcessFlow } from '@/types/process-flow';
import ProcessNodeComponent from './ProcessNodeComponent';

interface ProcessFlowCanvasProps {
  processFlow: ProcessFlow;
}

const nodeTypes = {
  processNode: ProcessNodeComponent,
};

const ProcessFlowCanvas: React.FC<ProcessFlowCanvasProps> = ({ processFlow }) => {
  // Convert process flow data to React Flow format
  const initialNodes: Node[] = useMemo(() => {
    return processFlow.nodes.map((node, index) => {
      const x = (index % 3) * 300 + 100;
      const y = Math.floor(index / 3) * 150 + 50;
      
      return {
        id: node.id,
        type: 'processNode',
        position: { x, y },
        data: { 
          ...node,
          processFlow: processFlow.name 
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };
    });
  }, [processFlow]);

  const initialEdges: Edge[] = useMemo(() => {
    return processFlow.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label || edge.condition,
      type: 'smoothstep',
      animated: edge.condition ? true : false,
      style: {
        stroke: edge.condition ? '#f59e0b' : '#6b7280',
        strokeWidth: 2,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: edge.condition ? '#f59e0b' : '#6b7280',
      },
    }));
  }, [processFlow]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Node clicked:', node.data);
    // Here you could open a detail modal or navigate to task details
  }, []);

  return (
    <div className="h-[600px] border rounded-lg bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="bg-white"
      >
        <Background color="#f1f5f9" gap={20} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.data.status) {
              case 'completed': return '#22c55e';
              case 'in-progress': return '#3b82f6';
              case 'delayed': return '#ef4444';
              case 'pending': return '#eab308';
              default: return '#6b7280';
            }
          }}
          className="bg-white border"
        />
      </ReactFlow>
    </div>
  );
};

export default ProcessFlowCanvas;
