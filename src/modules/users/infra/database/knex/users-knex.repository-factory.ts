import type { Knex } from "knex";
import { UnitOfWork } from "ts-arch-kit/dist/database";

import { IRepositoryFactory, IUserRepository } from "@/modules/users/application/repositories";
import { getKnex } from "@/shared/infra/database/knex/knexconfig";
import { DefaultKnexRepository, KnexUnitOfWork } from "@/shared/infra/database/knex/repositories";
import { Tenant } from "@/system/domain/entities/tenant";

import * as mappers from "./mappers";

export class UsersKnexRepositoryFactory implements IRepositoryFactory {
    constructor(protected config: Knex.Config) {}

    createUnitOfWork(tenant?: Tenant): UnitOfWork {
        const pool = getKnex(this.config, tenant);
        return new KnexUnitOfWork(pool);
    }

    createUserRepository(): IUserRepository {
        return new DefaultKnexRepository("users_users", new mappers.UserKnexMapper());
    }
}
