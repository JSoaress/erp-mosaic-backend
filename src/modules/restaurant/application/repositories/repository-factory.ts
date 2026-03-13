import { IBaseRepositoryFactory } from "@/shared/infra/database";

import { ITableRepository } from "./table.repository";

export interface IRepositoryFactory extends IBaseRepositoryFactory {
    createTableRepository(): ITableRepository;
}
