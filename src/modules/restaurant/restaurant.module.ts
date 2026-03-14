import path from "node:path";

import { ContractsRegistry, IProductsContract } from "@/core/contracts";
import { ERPModule } from "@/core/module/erp-module.interface";
import { ForeignKeyValidationService } from "@/shared/application/services";
import knexConfig from "@/shared/infra/database/knex/knexfile";

import { RestaurantUseCaseFactory } from "./application/factories";
import { RestaurantKnexRepositoryFactory } from "./infra/database/knex";
import { createRouter } from "./infra/http";

export function buildRestaurantModule(contractRegistry: ContractsRegistry) {
    const repositoryFactory = new RestaurantKnexRepositoryFactory(knexConfig.development);
    const fkValidationService = new ForeignKeyValidationService();
    const productsContract = contractRegistry.resolve<IProductsContract>("products");
    const useCaseFactory = new RestaurantUseCaseFactory(repositoryFactory, fkValidationService, productsContract);
    const router = createRouter(useCaseFactory);
    const module = new ERPModule(
        { name: "restaurant" },
        path.resolve(__dirname, "infra", "database", "knex", "migrations"),
        [],
        { prefix: "restaurant", privateRouter: router },
    );
    return module;
}
