import { IBaseRepositoryFactory } from "@/shared/infra/database";

import { ISubscriberRepository } from "./subscriber.repository";
import { ITenantRepository } from "./tenant.repository";

export interface IRepositoryFactory extends IBaseRepositoryFactory {
    createSubscriberRepository(): ISubscriberRepository;
    createTenantRepository(): ITenantRepository;
}
