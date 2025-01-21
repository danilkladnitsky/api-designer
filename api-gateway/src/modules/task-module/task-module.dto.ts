import { Task } from "shared/task"

export type CreateTaskDto = Omit<Task, "id">
