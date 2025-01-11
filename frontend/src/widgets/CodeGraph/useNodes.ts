import { useEdgesState, useNodesState } from "@xyflow/react"

import { CodeGraphEdge, CodeGraphNode } from "@/types/code-graph"

import { createLayout } from "./utils/createLayout"

interface Props {
    nodes: CodeGraphNode[]
    edges: CodeGraphEdge[]
}

export const useNodes = (props: Props) => {
    const processedProps = createLayout(props.nodes, props.edges, "LR")

    const [nodes, setNodes, onNodesChange] = useNodesState<CodeGraphNode>(processedProps.nodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(processedProps.edges)

    return {
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange
    }
}
