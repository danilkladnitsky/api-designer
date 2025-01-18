import { ID } from "shared/index"
import { Task } from "shared/task"

import { IDatabaseAdapter } from "@/adapters/database/database.adapter"

import { CreateTaskDto } from "./task-module.dto"

export interface ITaskModuleConstructor {
    database: IDatabaseAdapter
}

export interface ITaskModule {
    getTaskById: (id: ID) => Promise<Task | null>
    createTask: (task: CreateTaskDto) => Promise<Task>
    getTasks: () => Promise<Task[]>
    deleteTask: (id: ID) => Promise<void>
}

export const createTaskModule = ({
    database
}: ITaskModuleConstructor): ITaskModule => ({
    getTasks: async () => {
        const tasks = await database.getEntities<Task>("task")

        return tasks
    },
    getTaskById: async (id: ID) => {
        const task = await database.findEntityById<Task>("task", id)

        return task
    },
    createTask: async (dto: CreateTaskDto) => {
        const createdTask = await database.saveEntity<CreateTaskDto, Task>(
            "task",
            dto
        )

        return createdTask
    },
    deleteTask: async (id: ID) => {
        await database.deleteEntityById("task", id)
    }
})
