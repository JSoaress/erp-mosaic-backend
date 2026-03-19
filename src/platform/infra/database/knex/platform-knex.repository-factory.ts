import { BaseKnexRepositoryFactory } from "@/core/infra/database/knex";
import { DefaultKnexRepository } from "@/core/infra/database/knex/repositories";
import { ISubscriberRepository, ITenantRepository } from "@/platform/application/repositories";
import { IRepositoryFactory } from "@/platform/application/repositories/repository-factory";

import * as mappers from "./mappers";
import * as repos from "./repositories";

export class PlatformKnexRepositoryFactory extends BaseKnexRepositoryFactory implements IRepositoryFactory {
    createSubscriberRepository(): ISubscriberRepository {
        return new DefaultKnexRepository("subscribers", new mappers.SubscriberKnexMapper());
    }

    createTenantRepository(): ITenantRepository {
        return new repos.TenantKnexRepository();
    }
}
