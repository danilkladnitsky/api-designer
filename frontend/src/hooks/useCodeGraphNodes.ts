import { useMemo, useState } from "react"
import { TaskConfig, TaskEndpoint, TaskService } from "shared/task"

import { ITaskConfig } from "@/types/task"
import { convertTaskConfigInProcessToCodeGraph } from "@/utils/convertTaskConfigToCodeGraph"
import { useSocket } from "@/ws/useSocket"

export const useCodeGraphNodes = (defaultTaskConfig: TaskConfig) => {
    const [taskConfig, setTaskConfig] = useState<ITaskConfig>(defaultTaskConfig)

    const graph = useMemo(() => convertTaskConfigInProcessToCodeGraph(taskConfig), [taskConfig])

    const onCodeGraphGenerate = (endpoints: Omit<TaskEndpoint, "id">[]) => {
        setTaskConfig((prevConfig) => {
            const service = prevConfig.services[0]
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
        })
    }

    const { isConnected } = useSocket({ onCodeGraphGenerate })

    return {
        nodes: graph.nodes, edges: graph.edges, taskConfig, isLive: isConnected
    }
}
