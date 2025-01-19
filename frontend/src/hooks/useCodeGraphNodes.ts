import { useMemo, useState } from "react"
import { TaskConfig, TaskContainer, TaskEndpoint, TaskService } from "shared/task"

import { ITaskConfig } from "@/types/task"
import { convertTaskConfigInProcessToCodeGraph } from "@/utils/convertTaskConfigToCodeGraph"
import { useSocket } from "@/ws/useSocket"

type GeneratedEndpoint = Omit<TaskEndpoint, "id">
type GeneratedContainer = Omit<TaskContainer, "id">

export const useCodeGraphNodes = (defaultTaskConfig: TaskConfig) => {
    const [taskConfig, setTaskConfig] = useState<ITaskConfig>(defaultTaskConfig)

    const graph = useMemo(() => convertTaskConfigInProcessToCodeGraph(taskConfig), [taskConfig])

    const onCodeGraphGenerate = (type: string, data: GeneratedEndpoint[] | GeneratedContainer) => {
        setTaskConfig((prevConfig) => {
            const service = prevConfig.services[0]

            const hasEndpoints = Array.isArray(data)

            console.log(data, hasEndpoints)

            if (hasEndpoints) {
                const endpoints = data
                const updatedService: TaskService = {
                    ...service,
                    endpoints: endpoints.map(endpoint => ({
                        ...endpoint,
                        id: Math.random().toString(36).substring(2, 9)
                    }))
                }

                return {
                    ...prevConfig,
                    version: prevConfig.version ? prevConfig.version + 1 : 1,
                    services: [updatedService]
                }
            }

            const newContainer: TaskContainer = {
                ...prevConfig.container,
                id: Math.random().toString(36).substring(2, 9),
                name: data.name,
                ports: data.ports,
                type: data.type
            }

            return {
                ...prevConfig,
                version: prevConfig.version ? prevConfig.version + 1 : 1,
                container: newContainer
            }
        })
    }

    const { isConnected } = useSocket({ onCodeGraphGenerate })

    return {
        nodes: graph.nodes, edges: graph.edges, taskConfig, isLive: isConnected
    }
}
