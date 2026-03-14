import path from "node:path";

import { ContractsRegistry } from "@/core/contracts";
import { ERPModule } from "@/core/module/erp-module.interface";
import { ForeignKeyValidationService } from "@/shared/application/services";
import knexConfig from "@/shared/infra/database/knex/knexfile";

import { ProductsContract } from "./application/contracts";
import { ProductsUseCaseFactory } from "./application/factories";
import { ProductsKnexRepositoryFactory } from "./infra/database/knex";
import { createRouter } from "./infra/http";

export function buildProductsModule(contractRegistry: ContractsRegistry) {
    const repositoryFactory = new ProductsKnexRepositoryFactory(knexConfig.development);
    const fkValidationService = new ForeignKeyValidationService();
    const productsContracts = new ProductsContract(repositoryFactory);
    contractRegistry.register("products", productsContracts);
    const useCaseFactory = new ProductsUseCaseFactory(repositoryFactory, fkValidationService);
    const router = createRouter(useCaseFactory);
    const module = new ERPModule(
        { name: "products" },
        path.resolve(__dirname, "infra", "database", "knex", "migrations"),
        [],
        { prefix: "products", privateRouter: router },
    );
    return module;
}
