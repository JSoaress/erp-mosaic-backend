import { Router } from "express";

import { Subscriber } from "@/system/domain/entities/subscriber";
import { Tenant } from "@/system/domain/entities/tenant";

import { ERPModule } from "./erp-module.interface";
import { ModuleRegistry } from "./module-registry";

type ModuleCache = Map<string, Map<string, ERPModule>>;

export class ModuleLoader {
    private routerCache = new Map<string, Router>();

    constructor(
        private registry: ModuleRegistry,
        private cache: ModuleCache,
    ) {}

    async loadForTenant(subscriber: Subscriber) {
        // 1. Verifica cache
        const tenantId = subscriber.getTenant().getName();
        const cached = this.cache.get(tenantId);
        if (cached) {
            return cached;
        }

        // 2. Descobre módulos habilitados no plano
        const enabledModules = subscriber.get("enabledModules");

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

    getRouterFromCache(tenant: Tenant) {
        return this.routerCache.get(tenant.getName());
    }

    setRouterCache(tenant: Tenant, router: Router) {
        this.routerCache.set(tenant.getName(), router);
    }
}
