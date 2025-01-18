import { ID } from "shared/index"

import { EntityList, IDatabaseAdapter } from "../database.adapter"

export const createLocalDatabase = async (): Promise<IDatabaseAdapter> => {
    const memory: Record<EntityList, any[]> = {
        task: [
            {
                id: "1",
                name: "task 1",
                description: "description 1",
                userSolution: {
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
                },
                answer: {
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
                },
                createdAt: new Date().toString(),
                updatedAt: new Date().toString()

            }
        ]
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
