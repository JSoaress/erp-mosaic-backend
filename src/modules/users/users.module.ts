import path from "node:path";

import { ERPModule } from "@/core/module/erp-module.interface";
import knexConfig from "@/shared/infra/database/knex/knexfile";

import { UsersUseCaseFactory } from "./application/factories";
import { UsersKnexRepositoryFactory } from "./infra/database/knex";
import { createUsersRouter } from "./infra/http";

export function buildUsersModule() {
    const repositoryFactory = new UsersKnexRepositoryFactory(knexConfig.development);
    const useCaseFactory = new UsersUseCaseFactory(repositoryFactory);
    const router = createUsersRouter(useCaseFactory);
    const module = new ERPModule(
        { name: "users" },
        path.resolve(__dirname, "infra", "database", "knex", "migrations"),
        [],
        // [],
        { prefix: "users", router },
    );
    return module;
}
