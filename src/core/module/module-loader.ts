import { Router } from "express";

import { ERPModule } from "./erp-module.interface";
import { ModuleRegistry } from "./module-registry";

type ModuleCache = Map<string, Map<string, ERPModule>>;

export class ModuleLoader {
    private routerCache = new Map<string, Router>();

    constructor(
        private registry: ModuleRegistry,
        private cache: ModuleCache,
        // private tenantRepository: TenantRepository,
    ) {}

    async loadForTenant(tenantId: string) {
        // 1. Verifica cache
        const cached = this.cache.get(tenantId);
        if (cached) {
            return cached;
        }

        // 2. Descobre módulos habilitados no plano
        // const enabledModules = await this.tenantRepository.getEnabledModules(tenantId);
        const enabledModules = ["users"];

        const tenantModules = new Map<string, ERPModule>();

        // eslint-disable-next-line no-restricted-syntax
        for (const moduleName of enabledModules) {
            const module = this.registry.get(moduleName);
            // eslint-disable-next-line no-continue
            if (!module) continue;

            // await module.init(context);
            tenantModules.set(moduleName, module);
        }

        // 3. Salva no cache
        this.cache.set(tenantId, tenantModules);

        return tenantModules;
    }

    getRouterFromCache(tenantId: string) {
        return this.routerCache.get(tenantId);
    }

    setRouterCache(tenantId: string, router: Router) {
        this.routerCache.set(tenantId, router);
    }
}
