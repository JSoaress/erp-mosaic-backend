import { BaseKnexRepositoryFactory } from "@/core/infra/database/knex";
import { DefaultKnexRepository } from "@/core/infra/database/knex/repositories";
import { IRepositoryFactory, IUserRepository } from "@/modules/users/application/repositories";

import * as mappers from "./mappers";

export class UsersKnexRepositoryFactory extends BaseKnexRepositoryFactory implements IRepositoryFactory {
    createUserRepository(): IUserRepository {
        return new DefaultKnexRepository("users_users", new mappers.UserKnexMapper());
    }
}
