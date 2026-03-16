import { IBaseRepositoryFactory } from "@/shared/database";

import { ISubscriberRepository } from "./subscriber.repository";
import { ITenantRepository } from "./tenant.repository";

export interface IRepositoryFactory extends IBaseRepositoryFactory {
    createSubscriberRepository(): ISubscriberRepository;
    createTenantRepository(): ITenantRepository;
}
