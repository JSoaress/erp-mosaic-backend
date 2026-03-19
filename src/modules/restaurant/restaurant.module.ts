import path from "node:path";

import { ERPModuleDefinition } from "@/core/module/erp-module.interface";

import { RestaurantUseCaseFactory } from "./application/factories";
import { RestaurantKnexRepositoryFactory } from "./infra/database/knex";
import { createRouter } from "./infra/http";

export function buildRestaurantModule(): ERPModuleDefinition {
    return {
        metadata: { name: "restaurant" },
        migrations: path.resolve(__dirname, "infra", "database", "knex", "migrations"),
        build: async (ctx) => {
            const knex = ctx.get("db");
            const repositoryFactory = new RestaurantKnexRepositoryFactory(knex);
            const useCaseFactory = new RestaurantUseCaseFactory(repositoryFactory, ctx);
            const router = createRouter(useCaseFactory);
            return {
                httpModule: {
                    prefix: "restaurant",
                    privateRouter: router,
                },
            };
        },
    };
}
