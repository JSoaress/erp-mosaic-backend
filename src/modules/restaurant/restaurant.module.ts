import path from "node:path";

import { ERPModule } from "@/core/module/erp-module.interface";
import { ForeignKeyValidationService } from "@/shared/application/services";
import knexConfig from "@/shared/infra/database/knex/knexfile";

import { RestaurantUseCaseFactory } from "./application/factories";
import { RestaurantKnexRepositoryFactory } from "./infra/database/knex";
import { createRouter } from "./infra/http";

export function buildRestaurantModule() {
    const repositoryFactory = new RestaurantKnexRepositoryFactory(knexConfig.development);
    const fkValidationService = new ForeignKeyValidationService();
    const useCaseFactory = new RestaurantUseCaseFactory(repositoryFactory, fkValidationService);
    const router = createRouter(useCaseFactory);
    const module = new ERPModule(
        { name: "restaurant" },
        path.resolve(__dirname, "infra", "database", "knex", "migrations"),
        [],
        { prefix: "restaurant", router },
    );
    return module;
}
