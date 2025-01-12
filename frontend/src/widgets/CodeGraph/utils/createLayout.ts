import dagre from "@dagrejs/dagre"

import { CodeGraphEdge, CodeGraphNode } from "@/types/code-graph"

import { NODE_HEIGHT, NODE_WIDTH } from "../const/nodes"
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

export const createLayout = (nodes: CodeGraphNode[], edges: CodeGraphEdge[], direction = "TB"): {
    nodes: CodeGraphNode[]
    edges: CodeGraphEdge[]
} => {
    const isHorizontal = direction === "LR"
    dagreGraph.setGraph({ rankdir: direction })

    nodes.filter(node => node.type !== "taskNode").forEach((node) => {
        dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT })
    })

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target)
    })

    dagre.layout(dagreGraph)

    const newNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id)
        const newNode = {
            ...node,
            targetPosition: isHorizontal ? "left" : "top",
            sourcePosition: isHorizontal ? "right" : "bottom",
            // draggable: false,
            position: node.type !== "taskNode"
                ? {
                        x: nodeWithPosition.x - (node.originalWidth || NODE_WIDTH) / 2 + 10,
                        y: nodeWithPosition.y - NODE_HEIGHT / 2
                    }
                : node.position
        }

        return newNode
    })

    return { nodes: newNodes as CodeGraphNode[], edges }
}
