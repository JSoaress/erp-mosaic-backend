import type { Knex } from "knex";
import { UnitOfWork } from "ts-arch-kit/dist/database";

import { IBaseRepositoryFactory } from "@/shared/database";
import { Tenant } from "@/system/domain/entities/tenant";

import { getKnex } from "./knexconfig";
import { KnexUnitOfWork } from "./repositories";

export abstract class BaseKnexRepositoryFactory implements IBaseRepositoryFactory {
    constructor(protected config: Knex.Config) {}

    createUnitOfWork(tenant?: Tenant): UnitOfWork {
        const pool = getKnex(this.config, tenant);
        return new KnexUnitOfWork(pool);
    }
}
