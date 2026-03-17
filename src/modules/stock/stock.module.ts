import path from "node:path";

import knexConfig from "@/core/infra/database/knex/knexfile";
import { ERPModule } from "@/core/module/erp-module.interface";
import { ForeignKeyValidationService } from "@/shared/application/services";

import { StockUseCaseFactory } from "./application/factories";
import { StockKnexRepositoryFactory } from "./infra/database/knex";
import { createRouter } from "./infra/http";

export function buildStockModule() {
    const repositoryFactory = new StockKnexRepositoryFactory(knexConfig.development);
    const fkValidationService = new ForeignKeyValidationService();
    const useCaseFactory = new StockUseCaseFactory(repositoryFactory, fkValidationService);
    const router = createRouter(useCaseFactory);
    const module = new ERPModule({ name: "stock" }, path.resolve(__dirname, "infra", "database", "knex", "migrations"), [], {
        prefix: "stock",
        privateRouter: router,
    });
    return module;
}
