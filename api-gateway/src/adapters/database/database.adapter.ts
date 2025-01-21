import { ID } from "shared/index"

import { IServiceInstance } from "@/common/services"

export type DatabaseEntity = Record<string, unknown>

export type EntityList = "task" | "solution"

export interface IDatabaseAdapter extends IServiceInstance {
    connect: () => Promise<void>
    getEntities: <TDatabaseEntity = any>(
        entityName: EntityList
    ) => Promise<TDatabaseEntity[]>
    saveEntity: <TDatabaseEntity = any, TOperationResult = any>(
        entityName: EntityList,
        entity: TDatabaseEntity
    ) => Promise<TOperationResult>
    findEntityById: <TDatabaseEntity = any>(
        entityName: EntityList,
        id: ID
    ) => Promise<TDatabaseEntity | null>
    deleteEntityById: <TOperationResult = any>(
        entityName: EntityList,
        id: ID
    ) => Promise<void>
    findEntityByProperty: <TDatabaseEntity = any>(
        entityName: EntityList,
        property: string,
        value: any
    ) => Promise<TDatabaseEntity | null>
}
