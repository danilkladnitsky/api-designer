import { ITaskModule } from "@/modules/task-module/task-module"
import { createHttpHandler } from "@/common/utils"
import { IControllerConstructor } from "@/common/controllers"

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
        createHttpHandler(getTasks).setPath("/tasks").setMethod("get").build()
    ]

    return { httpHandlers }
}
