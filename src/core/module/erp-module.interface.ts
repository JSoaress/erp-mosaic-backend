import { Router, RequestHandler } from "express";

import { TenantResourceRegistry } from "./resource-registry";

type ERPModuleMetadata = {
    name: string;
};

export type ERPModuleInstance = {
    httpModule?: {
        prefix: string;
        middlewares?: {
            authorization: RequestHandler;
        };
        publicRouter?: Router;
        privateRouter?: Router;
    };
};

export type ERPModuleDefinition = {
    metadata: ERPModuleMetadata;
    migrations: string;
    build(ctx: TenantResourceRegistry): Promise<ERPModuleInstance>;
};
