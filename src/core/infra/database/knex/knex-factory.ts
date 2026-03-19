import knex from "knex";
import type { Knex } from "knex";
import { PoolClient } from "pg";

import { IAppConfig } from "@/shared/config";
import { Tenant } from "@/shared/domain";

export class KnexFactory {
    private knexPool = new Map<string, Knex>();

    constructor(private appConfig: IAppConfig) {}

    getKnex(tenant?: Tenant) {
        const key = tenant ? tenant.getName() : "default";
        if (!this.knexPool.has(key)) {
            this.knexPool.set(
                key,
                knex({
                    client: "pg",
                    connection: {
                        host: this.appConfig.DB_HOST,
                        port: this.appConfig.DB_PORT,
                        database: this.appConfig.DB_DATABASE,
                        user: this.appConfig.DB_USER,
                        password: this.appConfig.DB_PASSWORD,
                    },
                    searchPath: tenant?.getName(),
                    pool: {
                        min: this.appConfig.DB_POOL_MIN,
                        max: this.appConfig.DB_POOL_MAX,
                        idleTimeoutMillis: 10000,
                        afterCreate: (conn: PoolClient, done: (err: Error | null, conn: PoolClient) => void) => {
                            conn.query("SET timezone='America/Sao_Paulo'", (err: Error | null) => {
                                done(err, conn);
                            });
                        },
                    },
                    migrations: {
                        extension: "ts",
                        stub: "migration.stub",
                        tableName: "knex_migrations",
                    },
                }),
            );
        }
        return this.knexPool.get(key) as Knex;
    }
}
