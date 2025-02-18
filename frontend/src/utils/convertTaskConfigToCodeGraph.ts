import { TaskConfig } from "shared/task"

import { CodeGraphEdge, CodeGraphNode } from "@/types/code-graph"

export const convertTaskConfigToCodeGraph = (taskConfig: TaskConfig): [CodeGraphNode[], CodeGraphEdge[]] => {
    const nodes: CodeGraphNode[] = []
    const edges: CodeGraphEdge[] = []

    nodes.push({
        id: taskConfig.id,
        type: "taskNode",
        data: {
            name: taskConfig.name,
            description: taskConfig.description.content
        },
        position: {
            x: -100,
            y: -150
        },
        draggable: false
    })

    nodes.push({
        id: taskConfig.container.id,
        type: "dockerNode",
        data: {
            name: taskConfig.container.name
        },
        style: {
            width: 950,
            height: taskConfig.services.length * 300
        },
        draggable: false
    })

    nodes.push({
        id: taskConfig.router.id,
        type: "routerNode",
        data: {
            name: taskConfig.router.name
        },
        parentId: taskConfig.container.id,
        extent: "parent"
    })

    taskConfig.services.forEach((service) => {
        const serviceId = service.id

        nodes.push({
            id: serviceId,
            type: "serviceNode",
            data: {
                name: service.name
            },
            parentId: taskConfig.container.id,
            extent: "parent"
        })

        edges.push({
            id: `${taskConfig.router.id}-${service.id}`,
            source: taskConfig.router.id,
            target: service.id,
            type: "requestEdge"
        })

        service.endpoints?.forEach((endpoint) => {
            edges.push({
                id: `${serviceId}-${endpoint.id}`,
                source: serviceId,
                target: endpoint.id,
                type: "requestEdge"
            })

            nodes.push({
                id: endpoint.id,
                type: "endpointNode",
                data: {
                    name: endpoint.url,
                    description: endpoint.method
                },
                parentId: taskConfig.container.id,
                extent: "parent"
            })
        })
    })

    taskConfig.clients.forEach((client) => {
        nodes.push({
            id: client.id,
            type: "clientNode",
            data: {
                name: client.name
            }
        })

        edges.push({
            id: `${client.id}-${taskConfig.container.id}`,
            source: client.id,
            target: taskConfig.container.id,
            type: "requestEdge"
        })
    })

    return [nodes, edges]
}

export const convertTaskConfigInProcessToCodeGraph = (taskConfig: TaskConfig) => {
    const nodes: CodeGraphNode[] = []
    const edges: CodeGraphEdge[] = []

    if (taskConfig.container) {
        nodes.push({
            id: taskConfig.container.id,
            type: "dockerNode",
            data: {
                name: taskConfig.container.name
            },
            style: {
                width: 950,
                height: taskConfig.services.length * 300
            },
            draggable: false
        })

        if (taskConfig.container.type === "docker") {
            nodes.push({
                id: taskConfig.container.id + "-router",
                type: "routerNode",
                data: {
                    name: "docker ports",
                    description: taskConfig.container.ports.join(" -> ")
                },
                parentId: taskConfig.container.id,
                extent: "parent"
            })
        }
    }

    if (taskConfig.router) {
        nodes.push({
            id: taskConfig.router.id,
            type: "routerNode",
            data: {
                name: taskConfig.router.name
            },
            parentId: taskConfig.container?.id,
            extent: "parent"
        })
    }

    taskConfig.services.forEach((service) => {
        const serviceId = service.id

        nodes.push({
            id: serviceId,
            type: "serviceNode",
            data: {
                name: service.name
            },
            parentId: taskConfig.container?.id,
            extent: "parent"
        })

        if (taskConfig.router) {
            edges.push({
                id: `${taskConfig.router.id}-${service.id}`,
                source: taskConfig.router.id,
                target: service.id,
                type: "requestEdge"
            })
        }
        else if (taskConfig.container?.type === "docker") {
            edges.push({
                id: `${taskConfig.container.id}-router-${service.id}`,
                source: taskConfig.container.id + "-router",
                target: service.id,
                type: "requestEdge"
            })
        }

        service.endpoints?.forEach((endpoint) => {
            edges.push({
                id: `${serviceId}-${endpoint.id}`,
                source: serviceId,
                target: endpoint.id,
                type: "requestEdge"
            })

            nodes.push({
                id: endpoint.id,
                type: "endpointNode",
                data: {
                    name: endpoint.url,
                    description: endpoint.method
                },
                parentId: taskConfig.container?.id,
                extent: "parent"
            })
        })
    })

    taskConfig.clients.forEach((client) => {
        nodes.push({
            id: client.id,
            type: "clientNode",
            data: {
                name: client.name
            }
        })

        if (taskConfig.container) {
            edges.push({
                id: `${client.id}-${taskConfig.container.id}`,
                source: client.id,
                target: taskConfig.container.id,
                type: "requestEdge"
            })
        }
        else if (taskConfig.services[0]) {
            edges.push({
                id: `${client.id}-${taskConfig.services[0].id}`,
                source: client.id,
                target: taskConfig.services[0].id,
                type: "requestEdge"
            })
        }
    })

    return { nodes, edges }
}
