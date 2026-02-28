import type { Knex } from "knex";
import knex from "knex";
import { UnitOfWork } from "ts-arch-kit/dist/database";

import { DefaultKnexRepository, KnexUnitOfWork } from "@/shared/infra/database/knex/repositories";
import { ISubscriberRepository, ITenantRepository } from "@/system/application/repositories";
import { IRepositoryFactory } from "@/system/application/repositories/repository-factory";

import * as mappers from "../mappers";
import * as repos from "./repositories";

export class KnexRepositoryFactory implements IRepositoryFactory {
    constructor(protected config: Knex.Config) {}

    createUnitOfWork(): UnitOfWork {
        return new KnexUnitOfWork(knex(this.config));
    }

    createSubscriberRepository(): ISubscriberRepository {
        return new DefaultKnexRepository("subscribers", new mappers.SubscriberKnexMapper());
    }

    createTenantRepository(): ITenantRepository {
        return new repos.TenantKnexRepository();
    }
}
