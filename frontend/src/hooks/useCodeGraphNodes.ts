import { useState } from "react"
import { TaskConfig, TaskContainer, TaskEndpoint, TaskRouter, TaskService } from "shared/task"
import { WsEvents } from "shared/ws"

import { convertTaskConfigInProcessToCodeGraph } from "@/utils/convertTaskConfigToCodeGraph"
import { useSocket } from "@/ws/useSocket"

type GeneratedEndpoint = Omit<TaskEndpoint, "id">
type GeneratedContainer = Omit<TaskContainer, "id">

interface Props {
    taskConfig: TaskConfig
    setTaskConfig: (taskConfig: TaskConfig) => void
}

const counter = 0

export const useCodeGraphNodes = ({ taskConfig, setTaskConfig }: Props) => {
    const [graph, setGraph] = useState(convertTaskConfigInProcessToCodeGraph(taskConfig))

    const onCodeGraphGenerate = (type: WsEvents, data: GeneratedEndpoint[] | GeneratedContainer) => {
        const prevConfig = taskConfig

        const getConfig = () => {
            const service = prevConfig.services[0]

            if (type === "generate-endpoints") {
                const endpoints = data as GeneratedEndpoint[]

                const updatedService: TaskService = {
                    ...service,
                    endpoints: endpoints.map(endpoint => ({
                        ...endpoint,
                        id: Math.random().toString(36).substring(2, 9)
                    }))
                }

                return {
                    ...prevConfig,
                    version: counter + 1,
                    services: [updatedService]
                }
            }
            else if (type === "generate-docker") {
                const container = data as GeneratedContainer

                const newContainer: TaskContainer = {
                    ...prevConfig.container,
                    id: Math.random().toString(36).substring(2, 9),
                    name: container.name,
                    ports: container.ports,
                    type: container.type
                }

                const router: TaskRouter = {
                    id: Math.random().toString(36).substring(2, 9),
                    name: container.name,
                    type: "docker"
                }

                return {
                    ...prevConfig,
                    version: counter + 1,
                    container: newContainer,
                    router
                }
            }

            return prevConfig
        }

        const result = getConfig()

        setTaskConfig(result)
        setGraph(convertTaskConfigInProcessToCodeGraph(result))
    }

    const { isConnected } = useSocket({ onCodeGraphGenerate })

    return {
        nodes: graph.nodes, edges: graph.edges, taskConfig, isLive: isConnected
    }
}
