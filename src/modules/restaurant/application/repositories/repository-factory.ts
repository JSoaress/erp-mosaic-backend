import { IBaseRepositoryFactory } from "@/shared/database";

import { IOrderRepository } from "./order.repository";
import { ITableRepository } from "./table.repository";

export interface IRepositoryFactory extends IBaseRepositoryFactory {
    createTableRepository(): ITableRepository;
    createOrderRepository(): IOrderRepository;
}
