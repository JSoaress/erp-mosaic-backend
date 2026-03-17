import path from "node:path";

import knexConfig from "@/core/infra/database/knex/knexfile";
import { ResourceRegistry } from "@/core/module";
import { ERPModule } from "@/core/module/erp-module.interface";

import { RestaurantUseCaseFactory } from "./application/factories";
import { RestaurantKnexRepositoryFactory } from "./infra/database/knex";
import { createRouter } from "./infra/http";

export function buildRestaurantModule(resourceRegistry: ResourceRegistry) {
    const repositoryFactory = new RestaurantKnexRepositoryFactory(knexConfig.development);
    const useCaseFactory = new RestaurantUseCaseFactory(repositoryFactory, resourceRegistry);
    const router = createRouter(useCaseFactory);
    const module = new ERPModule(
        { name: "restaurant" },
        path.resolve(__dirname, "infra", "database", "knex", "migrations"),
        [],
        { prefix: "restaurant", privateRouter: router },
    );
    return module;
}
