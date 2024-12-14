import { ID } from "shared"

import { EntityList, IDatabaseAdapter } from "../database.adapter"

export const createLocalDatabase = async (): Promise<IDatabaseAdapter> => {
    const memory: Record<EntityList, any> = {
        task: []
    }

    return {
        name: "local database",
        connect: async () => {
            console.log("connect to local db")
        },
        close: async () => {
            console.info("close local db")

            return `local db closed at ${new Date().toDateString()}`
        },
        getEntities: async <TDatabaseEntity = any>(entityName: EntityList) => {
            console.log(entityName)
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
            ) as TOperationResult
        }
    }
}
