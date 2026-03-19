import path from "node:path";

import { ERPModuleDefinition } from "@/core/module/erp-module.interface";

import { ProductsContract } from "./application/contracts";
import { ProductsUseCaseFactory } from "./application/factories";
import { ProductsKnexRepositoryFactory } from "./infra/database/knex";
import { createRouter } from "./infra/http";

export function buildProductsModule(): ERPModuleDefinition {
    return {
        metadata: { name: "products" },
        migrations: path.resolve(__dirname, "infra", "database", "knex", "migrations"),
        build: async (ctx) => {
            const knex = ctx.get("db");
            const repositoryFactory = new ProductsKnexRepositoryFactory(knex);
            const productsContracts = new ProductsContract(repositoryFactory);
            ctx.get("contractsRegistry").register("products", productsContracts);
            const useCaseFactory = new ProductsUseCaseFactory(repositoryFactory, ctx);
            const router = createRouter(useCaseFactory);
            return {
                httpModule: {
                    prefix: "products",
                    privateRouter: router,
                },
            };
        },
    };
}
