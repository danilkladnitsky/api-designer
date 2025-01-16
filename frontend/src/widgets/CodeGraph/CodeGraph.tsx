import { Box } from "@gravity-ui/uikit"
import { Background, ReactFlow } from "@xyflow/react"

import "@xyflow/react/dist/style.css"

import { cn } from "@/utils/cn"

import styles from "./CodeGraph.module.scss"
import { CodeGraphContextProvider, ICodeGraphContextProviderProps, useCodeGraphContext } from "./context/CodeGraph.context"
import { RequestEdge } from "./Edges/RequestEdge/RequestEdge"
import { ClientNode } from "./Nodes/ClientNode/ClientNode"
import { DockerNode } from "./Nodes/DockerNode/DockerNode"
import { EndpointNode } from "./Nodes/EndpointNode/EndpointNode"
import { RouterNode } from "./Nodes/RouterNode/RouterNode"
import { ServiceNode } from "./Nodes/ServiceNode/ServiceNode"
import { TaskNode } from "./Nodes/TaskNode/TaskNode"

const nodeTypes = {
    serviceNode: ServiceNode,
    endpointNode: EndpointNode,
    clientNode: ClientNode,
    dockerNode: DockerNode,
    routerNode: RouterNode,
    taskNode: TaskNode
}

const edgeTypes = {
    requestEdge: RequestEdge
}

const CodeGraphContent = () => {
    const { edges, nodes, className, onEdgesChange, onNodesChange } = useCodeGraphContext()
    return (
        <Box className={cn(styles.codeGraph, className)}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                snapToGrid
                fitView
                attributionPosition="bottom-left"
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={{ type: "smoothstep", deletable: false }}
            >
                <Background bgColor="#1B1B1B" />
            </ReactFlow>
        </Box>
    )
}

export const CodeGraph = (contextProps: ICodeGraphContextProviderProps) => {
    return (
        <CodeGraphContextProvider {...contextProps}>
            <CodeGraphContent />
        </CodeGraphContextProvider>
    )
}
