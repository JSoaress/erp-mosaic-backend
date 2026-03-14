import path from "node:path";

import { ERPModule } from "@/core/module/erp-module.interface";
import { ICache, IJwt } from "@/shared/application/adapters";
import knexConfig from "@/shared/infra/database/knex/knexfile";

import { UsersUseCaseFactory } from "./application/factories";
import { UsersKnexRepositoryFactory } from "./infra/database/knex";
import { createRouter } from "./infra/http";
import { authorization } from "./infra/http/middlewares";

export function buildUsersModule(cache: ICache, jwtService: IJwt) {
    const repositoryFactory = new UsersKnexRepositoryFactory(knexConfig.development);
    const useCaseFactory = new UsersUseCaseFactory(repositoryFactory, jwtService, cache);
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
