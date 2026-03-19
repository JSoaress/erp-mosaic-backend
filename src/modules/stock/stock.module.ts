import path from "node:path";

import { ERPModuleDefinition } from "@/core/module/erp-module.interface";

import { StockUseCaseFactory } from "./application/factories";
import { StockKnexRepositoryFactory } from "./infra/database/knex";
import { createRouter } from "./infra/http";

export function buildStockModule(): ERPModuleDefinition {
    return {
        metadata: { name: "stock" },
        migrations: path.resolve(__dirname, "infra", "database", "knex", "migrations"),
        build: async (ctx) => {
            const knex = ctx.get("db");
            const repositoryFactory = new StockKnexRepositoryFactory(knex);
            const useCaseFactory = new StockUseCaseFactory(repositoryFactory, ctx);
            const router = createRouter(useCaseFactory);
            return {
                httpModule: {
                    prefix: "stock",
                    privateRouter: router,
                },
            };
        },
    };
}
