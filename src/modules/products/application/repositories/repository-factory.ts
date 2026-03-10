import { IBaseRepositoryFactory } from "@/shared/infra/database";

import { IBrandRepository } from "./brand.repository";

export interface IRepositoryFactory extends IBaseRepositoryFactory {
    createBrandRepository(): IBrandRepository;
}
