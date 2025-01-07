import {
    Insertable,
    Kysely,
    PostgresDialect
} from "kysely"
import { Pool } from "pg"
import { ID } from "shared"

import { EntityList, IDatabaseAdapter } from "../database.adapter"

import { PgDatabase } from "./pg.dialect"

const pgPool = new Pool({
    database: "test",
    host: "localhost",
    user: "admin",
    port: 5434,
    max: 10
})

const dialect = new PostgresDialect({
    pool: pgPool
})

const db = new Kysely<PgDatabase>({
    dialect
})

type Entity = PgDatabase["task"] | PgDatabase["task"]

export const createPgDatabase = async (): Promise<IDatabaseAdapter> => {
    return {
        connect: async () => {
            await pgPool.connect()
        },
        close: async () => {
            await pgPool.end()
        },
        getEntities: async <TEntity>(tableName: EntityList) => {
            return (await db
                .selectFrom(tableName)
                .selectAll()
                .execute()) as TEntity[]
        },
        // @ts-ignore
        saveEntity: async <TEntity, TOperationResult>(
            tableName: EntityList,
            entity: Insertable<Entity>
        ) => {
            return (await db
                .insertInto(tableName)
                .values(entity)
                .returningAll()
                .executeTakeFirst()) as TOperationResult
        },
        findEntityById: async <TEntity>(tableName: EntityList, id: ID) => {
            return (await db
                .selectFrom(tableName)
                .selectAll()
                .where("id", "=", id)
                .executeTakeFirst()) as TEntity
        },
        deleteEntityById: async <TResult>(tableName: EntityList, id: ID) => {
            return (await db
                .deleteFrom(tableName)
                .where("id", "=", id)
                .returningAll()
                .executeTakeFirst()) as TResult
        }
    }
}
