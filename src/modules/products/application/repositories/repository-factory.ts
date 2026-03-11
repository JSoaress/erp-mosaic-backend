import { IBaseRepositoryFactory } from "@/shared/infra/database";

import { IBrandRepository } from "./brand.repository";
import { ICategoryRepository } from "./category.repository";
import { IModelRepository } from "./model.repository";

export interface IRepositoryFactory extends IBaseRepositoryFactory {
    createBrandRepository(): IBrandRepository;
    createModelRepository(): IModelRepository;
    createCategoryRepository(): ICategoryRepository;
}
