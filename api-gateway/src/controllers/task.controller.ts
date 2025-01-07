import { ID } from "shared"

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

    const httpHandlers = [
        createHttpHandler(getTasks).setPath("/tasks").setMethod("GET").build(),
        createHttpHandler(getTaskById).setPath("/tasks/:id").setMethod("GET").build()
    ]

    return { httpHandlers }
}
