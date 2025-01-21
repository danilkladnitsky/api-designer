import { ID } from "shared/index"

import { EntityList, IDatabaseAdapter } from "../database.adapter"

import { MOCK_SOLUTIONS, MOCK_TASKS } from "./mock"

export const createLocalDatabase = async (): Promise<IDatabaseAdapter> => {
    const memory: Record<EntityList, any> = {
        task: MOCK_TASKS,
        solution: MOCK_SOLUTIONS
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
        },
        findEntityByProperty: async <TDatabaseEntity = any>(
            entityName: EntityList,
            property: string,
            value: any
        ) => {
            return memory[entityName].find(
                (entity: any) => entity[property] === value
            ) as TDatabaseEntity | null
        }
    }
}
