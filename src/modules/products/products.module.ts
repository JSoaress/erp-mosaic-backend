import path from "node:path";

import { ERPModule } from "@/core/module/erp-module.interface";
import { ForeignKeyValidationService } from "@/shared/application/services";
import knexConfig from "@/shared/infra/database/knex/knexfile";

import { ProductsUseCaseFactory } from "./application/factories";
import { ProductsKnexRepositoryFactory } from "./infra/database/knex";
import { createRouter } from "./infra/http";

export function buildProductsModule() {
    const repositoryFactory = new ProductsKnexRepositoryFactory(knexConfig.development);
    const fkValidationService = new ForeignKeyValidationService();
    const useCaseFactory = new ProductsUseCaseFactory(repositoryFactory, fkValidationService);
    const router = createRouter(useCaseFactory);
    const module = new ERPModule(
        { name: "products" },
        path.resolve(__dirname, "infra", "database", "knex", "migrations"),
        [],
        { prefix: "products", router },
    );
    return module;
}
