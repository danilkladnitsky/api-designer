import { Task } from "@/domain/tasks";

export type CreateTaskDto = Omit<Task, "id">;
