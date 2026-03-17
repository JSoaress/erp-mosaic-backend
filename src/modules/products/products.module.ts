import path from "node:path";

import knexConfig from "@/core/infra/database/knex/knexfile";
import { ResourceRegistry } from "@/core/module";
import { ERPModule } from "@/core/module/erp-module.interface";

import { ProductsContract } from "./application/contracts";
import { ProductsUseCaseFactory } from "./application/factories";
import { ProductsKnexRepositoryFactory } from "./infra/database/knex";
import { createRouter } from "./infra/http";

export function buildProductsModule(resourceRegistry: ResourceRegistry) {
    const repositoryFactory = new ProductsKnexRepositoryFactory(knexConfig.development);
    const productsContracts = new ProductsContract(repositoryFactory);
    resourceRegistry.get("contractsRegistry").register("products", productsContracts);
    const useCaseFactory = new ProductsUseCaseFactory(repositoryFactory, resourceRegistry);
    const router = createRouter(useCaseFactory);
    const module = new ERPModule(
        { name: "products" },
        path.resolve(__dirname, "infra", "database", "knex", "migrations"),
        [],
        { prefix: "products", privateRouter: router },
    );
    return module;
}
