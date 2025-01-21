import { CheckTaskUserSolutionDto } from "shared/dtos"
import { ID } from "shared/index"

import { IControllerConstructor } from "@/common/controllers"
import { IHttpPayload } from "@/common/services"
import { createHttpHandler } from "@/common/utils"
import { ITaskModule } from "@/modules/task-module/task-module"

export interface ITaskController {
    taskModule: ITaskModule
}

export const createTaskController = ({
    taskModule
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

    const httpHandlers = [
        createHttpHandler(getTasks).setPath("/tasks").setMethod("GET").build(),
        createHttpHandler(getTaskById).setPath("/tasks/:id").setMethod("GET").build(),
        createHttpHandler(checkTask).setPath("/tasks/check").setMethod("POST").build()
    ]

    return { httpHandlers }
}
