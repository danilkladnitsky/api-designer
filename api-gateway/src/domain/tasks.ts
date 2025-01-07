import { ID, Timestamp } from "shared"

import { Code } from "./code"

export type TaskResult = {
    answer: Record<string, string>
}

export type Task = {
    id: ID
    name: string
    description: string
    code: Code
    answer: TaskResult
    createdAt: Timestamp
    updatedAt: Timestamp
}
