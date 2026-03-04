import knex from "knex";
import type { Knex } from "knex";

import { Tenant } from "@/system/domain/entities/tenant";

export function createKnexConfig(config: Knex.Config, tenant?: Tenant): Knex.Config {
    if (config.client === "pg" && tenant) {
        return {
            ...config,
            searchPath: tenant.getName(),
        };
    }
    return config;
}

const knexPool = new Map<string, Knex>();

export function getKnex(config: Knex.Config, tenant?: Tenant): Knex {
    const key = `${config.client}:${tenant ?? "default"}`;
    if (!knexPool.has(key)) {
        const knexConfig = createKnexConfig(config, tenant);
        knexPool.set(key, knex(knexConfig));
    }
    return knexPool.get(key) as Knex;
}
