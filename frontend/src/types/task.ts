import { TaskConfig } from "shared/task"

export interface ITaskConfig extends TaskConfig {
    version?: number
}

export interface ITaskSolutionStatus {
    completed: boolean
    message?: string
}
