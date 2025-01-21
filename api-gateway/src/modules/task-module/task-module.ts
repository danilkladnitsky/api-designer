import { CheckTaskUserSolutionDto, CheckTaskUserSolutionResponseDto } from "shared/dtos"
import { ID } from "shared/index"
import { Task, TaskSolution } from "shared/task"

import { IDatabaseAdapter } from "@/adapters/database/database.adapter"

import { CreateTaskDto } from "./task-module.dto"
import { compareTaskConfigs } from "./utils"

export interface ITaskModuleConstructor {
    database: IDatabaseAdapter
}

export interface ITaskModule {
    getTaskById: (id: ID) => Promise<Task | null>
    createTask: (task: CreateTaskDto) => Promise<Task>
    getTasks: () => Promise<Task[]>
    deleteTask: (id: ID) => Promise<void>
    checkTask: (task: CheckTaskUserSolutionDto) => Promise<CheckTaskUserSolutionResponseDto>
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
    },

    checkTask: async ({ taskId, userSolutionConfig }: CheckTaskUserSolutionDto): Promise<CheckTaskUserSolutionResponseDto> => {
        const originalTask = await database.findEntityById<Task>("task", taskId)

        if (!originalTask) {
            return {
                completed: false,
                message: "Task not found"
            }
        }

        const taskAnswer = await database.findEntityByProperty<TaskSolution>("solution", "taskId", taskId)

        if (!taskAnswer) {
            return {
                completed: false,
                message: "Task solution not found"
            }
        }

        return compareTaskConfigs(taskAnswer.answer, userSolutionConfig)
    }
})
