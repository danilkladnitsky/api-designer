import {
    Generated,
    Insertable,
    Selectable,
    Updateable
} from "kysely"
import { ID } from "shared/index"

export interface PgDatabase {
    task: TaskTable
}

export interface TaskTable {
    id: Generated<ID>
    name: string
    description: string
    code: string
    answer: string
    createdAt: Date
    updatedAt: Date
}

export type TaskEntity = Selectable<TaskTable>
export type NewTaskEntity = Insertable<TaskTable>
export type UpdateTaskEntity = Updateable<TaskTable>
