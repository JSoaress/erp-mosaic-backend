import type { Knex } from "knex";
import { UnitOfWork } from "ts-arch-kit/dist/database";

import { IBrandRepository, IModelRepository, IRepositoryFactory } from "@/modules/inventory/application/repositories";
import { getKnex } from "@/shared/infra/database/knex/knexconfig";
import { DefaultKnexRepository, KnexUnitOfWork } from "@/shared/infra/database/knex/repositories";
import { Tenant } from "@/system/domain/entities/tenant";

import * as mappers from "./mappers";

export class InventoryKnexRepositoryFactory implements IRepositoryFactory {
    constructor(protected config: Knex.Config) {}

    createUnitOfWork(tenant?: Tenant): UnitOfWork {
        const pool = getKnex(this.config, tenant);
        return new KnexUnitOfWork(pool);
    }

    createBrandRepository(): IBrandRepository {
        return new DefaultKnexRepository("inventory_brands", new mappers.BrandKnexMapper());
    }

    createModelRepository(): IModelRepository {
        return new DefaultKnexRepository("inventory_models", new mappers.ModelKnexMapper());
    }
}
