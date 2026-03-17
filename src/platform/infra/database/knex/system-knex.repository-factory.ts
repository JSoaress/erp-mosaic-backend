import type { Knex } from "knex";
import { UnitOfWork } from "ts-arch-kit/dist/database";

import { getKnex } from "@/shared/infra/database/knex/knexconfig";
import { DefaultKnexRepository, KnexUnitOfWork } from "@/shared/infra/database/knex/repositories";
import { ISubscriberRepository, ITenantRepository } from "@/platform/application/repositories";
import { IRepositoryFactory } from "@/platform/application/repositories/repository-factory";
import { Tenant } from "@/system/domain/entities/tenant";

import * as mappers from "./mappers";
import * as repos from "./repositories";

export class PlatformKnexRepositoryFactory implements IRepositoryFactory {
    constructor(protected config: Knex.Config) {}

    createUnitOfWork(tenant?: Tenant): UnitOfWork {
        const pool = getKnex(this.config, tenant);
        return new KnexUnitOfWork(pool);
    }

    createSubscriberRepository(): ISubscriberRepository {
        return new DefaultKnexRepository("subscribers", new mappers.SubscriberKnexMapper());
    }

    createTenantRepository(): ITenantRepository {
        return new repos.TenantKnexRepository();
    }
}
