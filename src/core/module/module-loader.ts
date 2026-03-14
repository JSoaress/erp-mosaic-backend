import { Router } from "express";

import { Subscriber } from "@/system/domain/entities/subscriber";

import { ERPModule } from "./erp-module.interface";
import { ModuleRegistry } from "./module-registry";

type TenantRouters = {
    publicRouter: Router;
    privateRouter: Router;
};

export class ModuleLoader {
    private routerCache = new Map<string, TenantRouters>();
    private routerPromises = new Map<string, Promise<TenantRouters>>();
    private cache = new Map<string, Map<string, ERPModule>>();

    constructor(private registry: ModuleRegistry) {}

    async loadForTenant(subscriber: Subscriber) {
        // 1. Verifica cache
        const tenantId = subscriber.getTenant().getName();
        const cached = this.cache.get(tenantId);
        if (cached) return cached;

        // 2. Descobre módulos habilitados no plano
        const enabledModules = subscriber.get("enabledModules");

        const tenantModules = new Map<string, ERPModule>();

        // eslint-disable-next-line no-restricted-syntax
        for (const moduleName of enabledModules) {
            const module = this.registry.get(moduleName);
            // eslint-disable-next-line no-continue
            if (!module) continue;

            tenantModules.set(moduleName, module);
        }

        // 3. Salva no cache
        this.cache.set(tenantId, tenantModules);

        return tenantModules;
    }

    getRouterFromCache(tenant: string) {
        return this.routerCache.get(tenant);
    }

    async getOrCreateRouter(subscriber: Subscriber): Promise<TenantRouters> {
        const tenant = subscriber.getTenant().getName();
        const cached = this.routerCache.get(tenant);
        if (cached) return cached;

        const building = this.routerPromises.get(tenant);
        if (building) return building;

        const promise = this.buildRouter(subscriber);
        this.routerPromises.set(tenant, promise);

        const router = await promise;
        this.routerCache.set(tenant, router);
        this.routerPromises.delete(tenant);

        return router;
    }

    private async buildRouter(subscriber: Subscriber): Promise<TenantRouters> {
        const modules = await this.loadForTenant(subscriber);
        const publicRouter = Router();
        const privateRouter = Router();
        modules.values().forEach((module) => {
            const { prefix, publicRouter: modulePublicRouter, privateRouter: modulePrivateRouter } = module.httpModule;
            if (modulePublicRouter) {
                console.log("registrando rotas publicas de", prefix);
                publicRouter.use(`/${prefix}`, modulePublicRouter);
            }
            if (modulePrivateRouter) privateRouter.use(`/${prefix}`, modulePrivateRouter);
        });
        return { publicRouter, privateRouter };
    }
}
