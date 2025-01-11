import { Box } from "@gravity-ui/uikit"
import { Background, ReactFlow } from "@xyflow/react"

import "@xyflow/react/dist/style.css"

import styles from "./CodeGraph.module.scss"
import { RequestEdge } from "./Edges/RequestEdge/RequestEdge"
import { DEFAULT_EDGES, DEFAULT_NODES } from "./mock.data"
import { ClientNode } from "./Nodes/ClientNode/ClientNode"
import { DockerNode } from "./Nodes/DockerNode/DockerNode"
import { EndpointNode } from "./Nodes/EndpointNode/EndpointNode"
import { FirewallNode } from "./Nodes/FirewallNode/FirewallNode"
import { ServiceNode } from "./Nodes/ServiceNode/ServiceNode"
import { useNodes } from "./useNodes"

const nodeTypes = {
    serviceNode: ServiceNode,
    endpointNode: EndpointNode,
    clientNode: ClientNode,
    dockerNode: DockerNode,
    firewallNode: FirewallNode
}

const edgeTypes = {
    requestEdge: RequestEdge
}

export const CodeGraph = () => {
    const nodesControllers = useNodes({ nodes: DEFAULT_NODES, edges: DEFAULT_EDGES })

    return (
        <Box className={styles.codeGraph}>
            <ReactFlow
                {...nodesControllers}
                snapToGrid
                fitView
                attributionPosition="bottom-left"
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={{ type: "smoothstep", deletable: false }}
            >
                <Background />
            </ReactFlow>
        </Box>
    )
}
