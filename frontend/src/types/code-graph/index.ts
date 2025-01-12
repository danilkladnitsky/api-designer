import { Edge, NodeProps, Position } from "@xyflow/react"
import { CSSProperties } from "react"

export const NODE_TYPES = {
    serviceNode: "serviceNode",
    endpointNode: "endpointNode",
    clientNode: "clientNode",
    dockerNode: "dockerNode",
    routerNode: "routerNode",
    taskNode: "taskNode"
} as const

export type NodeTypes = keyof typeof NODE_TYPES

type BaseNodeData = {
    name: string
    description?: string
    loading?: boolean
}

export interface CodeGraphNode<NodeData extends BaseNodeData = BaseNodeData> extends Omit<Partial<NodeProps>, "data" | "targetPosition" | "sourcePosition"> {
    id: string
    type: NodeTypes
    position?: {
        x?: number
        y?: number
    }
    originalWidth?: number
    targetPosition?: Position
    sourcePosition?: Position
    data: NodeData
    extent?: "parent"
    style?: CSSProperties
}

export interface CodeGraphNodeProps<NodeData extends BaseNodeData = BaseNodeData> extends Omit<NodeProps, "data"> {
    data: NodeData
}

export interface CodeGraphEdge extends Edge {
    id: string
    source: string
    target: string

}
