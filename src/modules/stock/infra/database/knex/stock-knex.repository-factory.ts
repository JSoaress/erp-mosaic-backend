import type { Knex } from "knex";
import { UnitOfWork } from "ts-arch-kit/dist/database";

import { IMeasurementUnitRepository, IRepositoryFactory } from "@/modules/stock/application/repositories";
import { getKnex } from "@/shared/infra/database/knex/knexconfig";
import { DefaultKnexRepository, KnexUnitOfWork } from "@/shared/infra/database/knex/repositories";
import { Tenant } from "@/system/domain/entities/tenant";

import * as mappers from "./mappers";

export class StockKnexRepositoryFactory implements IRepositoryFactory {
    constructor(protected config: Knex.Config) {}

    createUnitOfWork(tenant?: Tenant): UnitOfWork {
        const pool = getKnex(this.config, tenant);
        return new KnexUnitOfWork(pool);
    }

    createMeasurementUnitRepository(): IMeasurementUnitRepository {
        return new DefaultKnexRepository("stock_measurement_units", new mappers.MeasurementUnitKnexMapper());
    }
}
