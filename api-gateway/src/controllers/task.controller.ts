import { CheckTaskUserSolutionDto } from "shared/dtos"
import { ID } from "shared/index"

import { IControllerConstructor } from "@/common/controllers"
import { IHttpPayload } from "@/common/services"
import { createHttpHandler } from "@/common/utils"
import { ILLMModule } from "@/modules/llm-module/llm-module"
import { ITaskModule } from "@/modules/task-module/task-module"

export interface ITaskController {
    taskModule: ITaskModule
    llmModule: ILLMModule
}

export const createTaskController = ({
    taskModule, llmModule
}: ITaskController): IControllerConstructor => {
    const getTasks = async () => {
        return await taskModule.getTasks()
    }

    const getTaskById = async ({ params }: IHttpPayload<{ id: ID }>) => {
        return await taskModule.getTaskById(params.id)
    }

    const checkTask = async ({ body }: IHttpPayload<CheckTaskUserSolutionDto>) => {
        return await taskModule.checkTask(body)
    }

    const generateTaskLinks = async ({ params }: IHttpPayload<{ id: ID }>) => {
        const relatedTask = await taskModule.getTaskById(params.id)

        if (!relatedTask) {
            return
        }

        const topics: string[] = []

        relatedTask.config.services.forEach((c) => {
            topics.push(c.type)
        })

        if (relatedTask.config.container) {
            topics.push(relatedTask.config.container.type)
        }

        return await llmModule.suggestEducationLinks(topics)
    }

    const httpHandlers = [
        createHttpHandler(getTasks).setPath("/tasks").setMethod("GET").build(),
        createHttpHandler(getTaskById).setPath("/tasks/:id").setMethod("GET").build(),
        createHttpHandler(checkTask).setPath("/tasks/check").setMethod("POST").build(),
        createHttpHandler(generateTaskLinks).setPath("/tasks/links/:id").setMethod("GET").build()
    ]

    return { httpHandlers }
}
