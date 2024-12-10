import { ID } from "shared";

export type DatabaseEntity = Record<string, unknown>;

export type EntityList = "task";

export interface IDatabaseAdapter {
  connect: () => Promise<void>;
  close: () => Promise<any>;
  getEntities: <TDatabaseEntity = any>(
    entityName: EntityList
  ) => Promise<TDatabaseEntity[]>;
  saveEntity: <TDatabaseEntity = any, TOperationResult = any>(
    entityName: EntityList,
    entity: TDatabaseEntity
  ) => Promise<TOperationResult>;
  findEntityById: <TDatabaseEntity = any>(
    entityName: EntityList,
    id: ID
  ) => Promise<TDatabaseEntity | null>;
  deleteEntityById: <TOperationResult = any>(
    entityName: EntityList,
    id: ID
  ) => Promise<void>;
}
