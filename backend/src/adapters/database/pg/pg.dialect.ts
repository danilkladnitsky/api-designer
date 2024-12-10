import { Task } from "@/domain/tasks";
import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";
import { ID } from "shared";

export interface PgDatabase {
  task: TaskTable;
}

export interface TaskTable {
  id: Generated<ID>;
  name: string;
  description: string;
  code: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskEntity = Selectable<TaskTable>;
export type NewTaskEntity = Insertable<TaskTable>;
export type UpdateTaskEntity = Updateable<TaskTable>;
