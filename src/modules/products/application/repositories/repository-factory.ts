import { IBaseRepositoryFactory } from "@/shared/infra/database";

import { IBrandRepository } from "./brand.repository";
import { ICategoryRepository } from "./category.repository";
import { IItemRepository } from "./item.repository";
import { IMeasurementUnitRepository } from "./measurement-unit.repository";
import { IModelRepository } from "./model.repository";
import { ISkuRepository } from "./sku.repository";

export interface IRepositoryFactory extends IBaseRepositoryFactory {
    createBrandRepository(): IBrandRepository;
    createModelRepository(): IModelRepository;
    createCategoryRepository(): ICategoryRepository;
    createItemRepository(): IItemRepository;
    createMeasurementUnitRepository(): IMeasurementUnitRepository;
    createSkuRepository(): ISkuRepository;
}
