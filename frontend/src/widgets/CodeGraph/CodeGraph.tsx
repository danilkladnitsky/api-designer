import { Box } from "@gravity-ui/uikit"
import { Background, ReactFlow } from "@xyflow/react"

import "@xyflow/react/dist/style.css"

import { useMemo } from "react"
import { TaskConfig } from "shared/task"

import { cn } from "@/utils/cn"
import { convertTaskConfigInProcessToCodeGraph } from "@/utils/convertTaskConfigToCodeGraph"

import styles from "./CodeGraph.module.scss"
import { RequestEdge } from "./Edges/RequestEdge/RequestEdge"
import { ClientNode } from "./Nodes/ClientNode/ClientNode"
import { DockerNode } from "./Nodes/DockerNode/DockerNode"
import { EndpointNode } from "./Nodes/EndpointNode/EndpointNode"
import { RouterNode } from "./Nodes/RouterNode/RouterNode"
import { ServiceNode } from "./Nodes/ServiceNode/ServiceNode"
import { TaskNode } from "./Nodes/TaskNode/TaskNode"
import { createLayout } from "./utils/createLayout"

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

interface Props {
    taskConfig: TaskConfig
    isLoading?: boolean
}

export const CodeGraph = ({ taskConfig, isLoading }: Props) => {
    const { edges, nodes } = useMemo(() => {
        const data = convertTaskConfigInProcessToCodeGraph(taskConfig)
        return createLayout(data.nodes.map(n => ({ ...n, data: { ...n.data, loading: isLoading } })), data.edges)
    }, [taskConfig, isLoading])

    return (
        <Box className={cn(styles.codeGraph)}>
            <ReactFlow
                edges={edges}
                nodes={nodes}
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
