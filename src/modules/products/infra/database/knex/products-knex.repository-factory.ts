import type { Knex } from "knex";
import { UnitOfWork } from "ts-arch-kit/dist/database";

import {
    IBrandRepository,
    ICategoryRepository,
    IItemRepository,
    IMeasurementUnitRepository,
    IModelRepository,
    IRepositoryFactory,
    ISkuPriceRepository,
    ISkuRepository,
} from "@/modules/products/application/repositories";
import { getKnex } from "@/shared/infra/database/knex/knexconfig";
import { DefaultKnexRepository, KnexUnitOfWork } from "@/shared/infra/database/knex/repositories";
import { Tenant } from "@/system/domain/entities/tenant";

import * as mappers from "./mappers";
import { SkuPriceKnexRepository } from "./repositories";

export class ProductsKnexRepositoryFactory implements IRepositoryFactory {
    constructor(protected config: Knex.Config) {}

    createUnitOfWork(tenant?: Tenant): UnitOfWork {
        const pool = getKnex(this.config, tenant);
        return new KnexUnitOfWork(pool);
    }

    createBrandRepository(): IBrandRepository {
        return new DefaultKnexRepository("products_brands", new mappers.BrandKnexMapper());
    }

    createModelRepository(): IModelRepository {
        return new DefaultKnexRepository("products_models", new mappers.ModelKnexMapper());
    }

    createCategoryRepository(): ICategoryRepository {
        return new DefaultKnexRepository("products_categories", new mappers.CategoryKnexMapper());
    }

    createItemRepository(): IItemRepository {
        return new DefaultKnexRepository("products_items", new mappers.ItemKnexMapper());
    }

    createMeasurementUnitRepository(): IMeasurementUnitRepository {
        return new DefaultKnexRepository("products_measurement_units", new mappers.MeasurementUnitKnexMapper());
    }

    createSkuRepository(): ISkuRepository {
        return new DefaultKnexRepository("products_skus", new mappers.SkuKnexMapper());
    }

    createSkuPriceRepository(): ISkuPriceRepository {
        return new SkuPriceKnexRepository();
    }
}
