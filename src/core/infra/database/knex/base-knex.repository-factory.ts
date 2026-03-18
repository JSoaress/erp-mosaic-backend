import type { Knex } from "knex";
import { UnitOfWork } from "ts-arch-kit/dist/database";

import { IBaseRepositoryFactory } from "@/shared/database";

import { KnexUnitOfWork } from "./repositories";

export abstract class BaseKnexRepositoryFactory implements IBaseRepositoryFactory {
    constructor(protected pool: Knex) {}

    createUnitOfWork(): UnitOfWork {
        return new KnexUnitOfWork(this.pool);
    }
}
