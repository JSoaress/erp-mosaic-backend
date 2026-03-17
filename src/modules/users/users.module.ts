import path from "node:path";

import knexConfig from "@/core/infra/database/knex/knexfile";
import { ResourceRegistry } from "@/core/module";
import { ERPModule } from "@/core/module/erp-module.interface";

import { UsersUseCaseFactory } from "./application/factories";
import { UsersKnexRepositoryFactory } from "./infra/database/knex";
import { createRouter } from "./infra/http";
import { authorization } from "./infra/http/middlewares";

export function buildUsersModule(resourceRegistry: ResourceRegistry) {
    const repositoryFactory = new UsersKnexRepositoryFactory(knexConfig.development);
    const useCaseFactory = new UsersUseCaseFactory(repositoryFactory, resourceRegistry);
    const router = createRouter(useCaseFactory);
    const module = new ERPModule(
        { name: "users" },
        path.resolve(__dirname, "infra", "database", "knex", "migrations"),
        [],
        // [],
        { prefix: "users", publicRouter: router },
    );
    return { module, authorizationMiddleware: authorization(useCaseFactory.checkAuthenticatedUserUseCase()) };
}
