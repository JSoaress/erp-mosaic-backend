import { KnexFactory } from "@/core/infra/database/knex";
import { ModuleRegistry } from "@/core/module/module-registry";

import { PlatformUseCaseFactory } from "./application/factories";
import { PlatformKnexRepositoryFactory } from "./infra/database/knex";
import { createPlatformRouter } from "./infra/http";
import { getTenant } from "./infra/http/middlewares";

export function buildPlatformModule(knexFactory: KnexFactory, moduleRegistry: ModuleRegistry) {
    const repositoryFactory = new PlatformKnexRepositoryFactory(knexFactory.getKnex());
    const useCaseFactory = new PlatformUseCaseFactory(repositoryFactory, moduleRegistry);
    const router = createPlatformRouter(useCaseFactory);
    return { router, getTenantMiddleware: getTenant(() => useCaseFactory.getSubscriberUseCase()) };
}
