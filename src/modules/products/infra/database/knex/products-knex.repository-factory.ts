import { BaseKnexRepositoryFactory } from "@/core/infra/database/knex";
import { DefaultKnexRepository } from "@/core/infra/database/knex/repositories";
import {
    IBrandRepository,
    ICategoryRepository,
    IItemRepository,
    IModelRepository,
    IRepositoryFactory,
    ISkuPriceRepository,
    ISkuRepository,
} from "@/modules/products/application/repositories";

import * as mappers from "./mappers";
import { SkuPriceKnexRepository } from "./repositories";

export class ProductsKnexRepositoryFactory extends BaseKnexRepositoryFactory implements IRepositoryFactory {
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

    createSkuRepository(): ISkuRepository {
        return new DefaultKnexRepository("products_skus", new mappers.SkuKnexMapper());
    }

    createSkuPriceRepository(): ISkuPriceRepository {
        return new SkuPriceKnexRepository();
    }
}
