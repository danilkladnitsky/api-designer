import { CodeGraphEdge, CodeGraphNode } from "@/types/code-graph"

export const DEFAULT_NODES: CodeGraphNode[] = [
    {
        data: {
            name: "Docker"
        },
        id: "0",
        type: "dockerNode",
        style: {
            width: 950,
            height: 300
        }

    },
    {
        data: {
            name: "FastAPI service",
            description: "192.168.1:3000"
        },
        id: "1",
        type: "serviceNode",
        parentId: "0",
        extent: "parent",
        draggable: false,
        originalWidth: 250
    },
    {
        data: {
            name: "/users/{userId}",
            description: "GET",
            loading: true
        },
        id: "2",
        type: "endpointNode",
        parentId: "0",
        extent: "parent"
    },
    {
        data: {
            name: "/users",
            description: "POST"
        },
        id: "3",
        type: "endpointNode",
        parentId: "0",
        extent: "parent"

    },
    {
        data: {
            name: "Users"
        },
        id: "4",
        type: "clientNode"

    },
    {
        data: {
            name: "Port Policy"
        },
        id: "5",
        type: "firewallNode",
        parentId: "0",
        extent: "parent",
        draggable: false,
        originalWidth: 100

    }
]

export const DEFAULT_EDGES: CodeGraphEdge[] = [
    { id: "e1-2", source: "1", target: "2", type: "requestEdge" },
    { id: "e1-3", source: "1", target: "3", type: "requestEdge" },
    { id: "e2-4", source: "4", target: "0", type: "requestEdge" },
    { id: "e2-5", source: "5", target: "1", type: "requestEdge" }

]
