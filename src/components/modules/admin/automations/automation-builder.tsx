"use client";

import '@xyflow/react/dist/style.css';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  NodeTypes,
  Edge,
  Node,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Connection,
  useReactFlow,
} from '@xyflow/react';
import { useAutomationBuilder } from './automation-builder-provider';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/shared/spinner';
import useGetAutomationQuery from '@/domain/automation/use-get-automation-query';
import useUpdateAutomationMutation from '@/domain/automation/use-update-automation-mutation';
import { DragEvent, ForwardedRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import AutomationNodeTypes from './automation-node-types';
import { cn, createId } from '@/utils/helpers';
import Badge from '@/components/ui/badge';

interface AutomationBuilderProps { 
  automationId: string;
  innerRef?: ForwardedRef<{ 
    isValid: () => Promise<{
      isValid: boolean,
      message?: string
    }>,
    save(): Promise<void>,
  }>
}

export default function AutomationBuilder({ automationId, innerRef }: AutomationBuilderProps) {
  const router = useRouter();
  const { isValidBuilder } = useAutomationBuilder();
  const { data: automationData, isLoading } = useGetAutomationQuery(automationId);
  const updateAutomation = useUpdateAutomationMutation();
  const {} = useAutomationBuilder();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useState<string | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((oldEdges) => addEdge(connection, oldEdges));
    },
    [setEdges],
  );
  const onDragOver = useCallback((event: unknown) => {
    (event as { preventDefault: () => void }).preventDefault();
    (event as { dataTransfer: { dropEffect: string } }).dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      // check if the dropped element is valid
      if (!type) {
        return;
      }
      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: createId(),
        type,
        position,
        data: {},
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );
  
  useImperativeHandle(innerRef, () => ({
    async isValid() {
      const triggerIndex = nodes.findIndex(n => n.type?.includes("trigger"));
      if (triggerIndex === -1 || triggerIndex > 0) return {
        isValid: false,
        message: "Invalid nodes, there must be a trigger node and it should be the first node",
      };
      function validateEdgesForNodes(nodes: Node[], edges: Edge[]) {
        return nodes.every((node, index) => {
          // Get edges connected to the current node
          const connectedEdges = edges.filter(
            (edge) => edge.source === node.id || edge.target === node.id
          );
      
          // Check if node is the last node (assuming linear flow)
          const isLastNode = index === nodes.length - 1;
      
          if (node.type && ["resourceTrigger"].includes(node.type)) {
            // Trigger node should have exactly 1 edge
            return connectedEdges.length === 1;
          } else {
            // Non-trigger nodes should have 1 or more edges, except the last node
            return isLastNode ? true : connectedEdges.length >= 1;
          }
        });
      }
      const isValid = validateEdgesForNodes(nodes, edges);
      if (!isValid) return {
        isValid,
        message: "Invalid edges, each node must have an edge connected to or from",
      };
      return {
        isValid: await isValidBuilder(),
      };
    },
    async save() {
      await updateAutomation.mutateAsync({
        id: automationId,
        flow: {
          nodes,
          edges
        }
      })
    }
  }), [isValidBuilder, nodes, edges])

  useEffect(() => {
    if (!automationData) return;
    setNodes((automationData.flow?.nodes || []) as Node[]);
    setEdges((automationData.flow?.edges || []) as Edge[]);
  }, [automationData])

  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  const nodeTypes = useMemo(() => ({ 
    resource_trigger: (args: { id: string; data: Record<string, unknown> }) => (
      <AutomationNodeTypes
        type='trigger'
        title="Resource"
        onDelete={() => setNodes(values => values.filter(item => item.id !== args.id))}
      >
        <AutomationNodeTypes.ResourceTrigger {...args} onChange={(data) => setNodes(values => values.map(v => v.id === args.id ? ({...v, data}) : v) as Node[])} />
      </AutomationNodeTypes>
    ),
    email_action: (args: { id: string; data: Record<string, unknown> }) => (
      <AutomationNodeTypes
        title="Email"
        onDelete={() => setNodes(values => values.filter(item => item.id !== args.id))}
      >
        <AutomationNodeTypes.EmailAction {...args} onChange={(data) => setNodes(values => values.map(v => v.id === args.id ? ({...v, data}) : v) as Node[])} />
      </AutomationNodeTypes>
    ),
    google_meet_action: (args: { id: string; data: Record<string, unknown> }) => (
      <AutomationNodeTypes
        title="Google Meet"
        onDelete={() => setNodes(values => values.filter(item => item.id !== args.id))}
      >
        <AutomationNodeTypes.GoogleMeetAction {...args} onChange={(data) => setNodes(values => values.map(v => v.id === args.id ? ({...v, data}) : v) as Node[])} />
      </AutomationNodeTypes>
    ),
  }), []);
  if (isLoading) return (
    <div className="py-10">
      <Spinner fixed={false} size="md" variant="secondary" showTitle className="gap-3" />
    </div>
  )
  return (
    <div className='flex-1 flex items-start'>
      <ReactFlow
        nodes={nodes} 
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes as unknown as NodeTypes}
        className='p-5'
        proOptions={{
          hideAttribution: true
        }}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>

      <aside className='py-3 px-5 w-full max-w-[270px] bg-background-secondary h-auto self-stretch'>
        <div className='w-full grid grid-cols-2 gap-5'>
          {Object.keys(nodeTypes).map(key => (
            <div key={key} className={cn("flex flex-col gap-2 justify-center items-center text-center border border-border rounded-md py-5 px-3 cursor-pointer transition hover:bg-foreground/10 capitalize", {
            })} onDragStart={(event) => onDragStart(event, key)} draggable>
              {key?.includes("trigger") && <Badge className='bg-warning'>Trigger</Badge>}
              {!key?.includes("trigger") && <Badge>Action</Badge>}
              {key?.split("_")?.slice(0, -1).join(" ")}
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}