import { IControllerConstructor } from "@/common/controllers"
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

    const httpHandlers = [
        createHttpHandler(getTasks).setPath("/tasks").setMethod("GET").build()
    ]

    return { httpHandlers }
}
