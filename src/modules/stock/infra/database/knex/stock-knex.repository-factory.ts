import { BaseKnexRepositoryFactory } from "@/core/infra/database/knex";
import { DefaultKnexRepository } from "@/core/infra/database/knex/repositories";
import { IMeasurementUnitRepository, IRepositoryFactory } from "@/modules/stock/application/repositories";

import * as mappers from "./mappers";

export class StockKnexRepositoryFactory extends BaseKnexRepositoryFactory implements IRepositoryFactory {
    createMeasurementUnitRepository(): IMeasurementUnitRepository {
        return new DefaultKnexRepository("stock_measurement_units", new mappers.MeasurementUnitKnexMapper());
    }
}
