import { Router } from "express";

import { Subscriber } from "@/platform/domain/entities/subscriber";
import { Tenant } from "@/shared/domain";

import { KnexFactory } from "../infra/database/knex";
import { ERPModuleInstance } from "./erp-module.interface";
import { ModuleRegistry } from "./module-registry";
import { ResourceRegistry, TenantResourceRegistry } from "./resource-registry";

type TenantRouters = {
    publicRouter: Router;
    privateRouter: Router;
};

type TenantContext = {
    tenant: Tenant;
    subscriber: Subscriber;
    registry: TenantResourceRegistry;
    routers: TenantRouters;
};

export class ModuleLoader {
    private routerCache = new Map<string, TenantRouters>();
    // private routerPromises = new Map<string, Promise<TenantRouters>>();
    private moduleInstanceCache = new Map<string, Map<string, ERPModuleInstance>>();
    private tenantCtxCache = new Map<string, TenantContext>();

    constructor(
        private registry: ModuleRegistry,
        private resourceRegistry: ResourceRegistry,
        private knexFactory: KnexFactory,
    ) {}

    async loadForTenant(ctx: TenantContext) {
        const tenant = ctx.subscriber.getTenant();
        const tenantId = tenant.getName();

        const cached = this.moduleInstanceCache.get(tenantId);
        if (cached) return cached;

        const enabledModules = ctx.subscriber.get("enabledModules");
        const instances = new Map<string, ERPModuleInstance>();

        // eslint-disable-next-line no-restricted-syntax
        for (const moduleName of enabledModules) {
            const definition = this.registry.get(moduleName);
            // eslint-disable-next-line no-await-in-loop
            const instance = await definition.build(ctx.registry);
            instances.set(moduleName, instance);
        }
        this.moduleInstanceCache.set(tenantId, instances);
        return instances;
    }

    getRouterFromCache(tenant: string) {
        return this.routerCache.get(tenant);
    }

    async getOrCreateTenantContext(subscriber: Subscriber): Promise<TenantContext> {
        const tenant = subscriber.getTenant();
        const tenantId = tenant.getName();

        const cached = this.tenantCtxCache.get(tenantId);
        if (cached) return cached;

        const tenantRegistry = new TenantResourceRegistry(this.resourceRegistry);
        const db = this.knexFactory.getKnex(subscriber.getTenant());
        // event bus
        // outbox
        // outbox processor

        tenantRegistry.register("db", db);
        // registrar event bus e outbox

        const ctx: TenantContext = {
            tenant,
            subscriber,
            registry: tenantRegistry,
            routers: {} as TenantRouters,
        };

        const routers = await this.buildRouter(ctx);
        ctx.routers = routers;

        // start worker (simples)
        // setInterval(() => outboxProcessor.run(), 1000)

        this.tenantCtxCache.set(tenantId, ctx);
        return ctx;
    }

    private async buildRouter(ctx: TenantContext): Promise<TenantRouters> {
        const modules = await this.loadForTenant(ctx);
        const publicRouter = Router();
        const privateRouter = Router();
        modules.values().forEach((module) => {
            const { prefix, publicRouter: pub, privateRouter: priv, middlewares } = module.httpModule || {};
            if (pub) publicRouter.use(`/${prefix}`, pub);
            if (priv) {
                if (middlewares?.authorization) privateRouter.use(middlewares.authorization);
                privateRouter.use(`/${prefix}`, priv);
            }
        });
        return { publicRouter, privateRouter };
    }
}
