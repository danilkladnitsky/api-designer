import { ID } from "shared/index"

import { EntityList, IDatabaseAdapter } from "../database.adapter"

const TASKS = [
    {
        id: "1",
        name: "Task 1",
        description: "Description 1",
        files: [{
            fileName: "main.py",
            extension: "py",
            content: "print('Hello World!')",
            language: "python"
        },
        {
            fileName: "docker-compose.yml",
            extension: "yml",
            content: "version: 3.8",
            language: "yaml"
        }],
        config: {
            clients: [],
            services: [{
                id: "sample-service",
                name: "FastApi service",
                type: "fastapi",
                endpoints: [{
                    id: "sample-endpoint",
                    url: "/hello-world",
                    method: "GET"
                }]
            }],
            container: null,
            router: null
        }
    }
]

export const createLocalDatabase = async (): Promise<IDatabaseAdapter> => {
    const memory: Record<EntityList, any> = {
        task: TASKS
    }

    return {
        name: "local database",
        connect: async () => {
            console.log("connect to local db")
        },
        close: async () => {
            return `local db closed at ${new Date().toDateString()}`
        },
        getEntities: async <TDatabaseEntity = any>(entityName: EntityList) => {
            return memory[entityName] as TDatabaseEntity
        },
        saveEntity: async <TDatabaseEntity = any, TOperationResult = any>(
            entityName: EntityList,
            entity: TDatabaseEntity
        ) => {
            memory[entityName].push(entity)

            return memory[entityName] as TOperationResult
        },
        findEntityById: async <TDatabaseEntity = any>(
            entityName: EntityList,
            id: string
        ) => {
            return memory[entityName].find(
                (entity: { id: ID }) => entity.id === id
            ) as TDatabaseEntity | null
        },
        deleteEntityById: async <TOperationResult = any>(
            entityName: EntityList,
            id: string
        ) => {
            memory[entityName] = memory[entityName].filter(
                (entity: { id: ID }) => entity.id !== id
            )
        }
    }
}
