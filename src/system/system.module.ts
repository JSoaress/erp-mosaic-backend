import { ModuleRegistry } from "@/core/module/module-registry";
import knexConfig from "@/shared/infra/database/knex/knexfile";

import { SystemUseCaseFactory } from "./application/factories";
import { SystemKnexRepositoryFactory } from "./infra/database/knex";
import { createSystemRouter } from "./infra/http";

export function buildSystemModule(moduleRegistry: ModuleRegistry) {
    const repositoryFactory = new SystemKnexRepositoryFactory(knexConfig.development);
    const useCaseFactory = new SystemUseCaseFactory(repositoryFactory, moduleRegistry);
    const router = createSystemRouter(useCaseFactory);
    return { useCaseFactory, router };
}
