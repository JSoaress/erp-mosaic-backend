import path from "node:path";

import { ERPModuleDefinition } from "@/core/module/erp-module.interface";

import { UsersUseCaseFactory } from "./application/factories";
import { UsersKnexRepositoryFactory } from "./infra/database/knex";
import { createRouter } from "./infra/http";
import { authorization } from "./infra/http/middlewares";

export function buildUsersModule(): ERPModuleDefinition {
    const module: ERPModuleDefinition = {
        metadata: { name: "users" },
        migrations: path.resolve(__dirname, "infra", "database", "knex", "migrations"),
        build: async (ctx) => {
            const knex = ctx.get("db");
            const repositoryFactory = new UsersKnexRepositoryFactory(knex);
            const useCaseFactory = new UsersUseCaseFactory(repositoryFactory, ctx);
            const router = createRouter(useCaseFactory);
            return {
                httpModule: {
                    prefix: "users",
                    publicRouter: router,
                },
                middlewares: {
                    authorization: authorization(useCaseFactory.checkAuthenticatedUserUseCase()),
                },
            };
        },
    };
    return module;
}
