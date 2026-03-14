/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";

type ERPModuleMetadata = {
    name: string;
};

type HTTPModule = {
    prefix: string;
    publicRouter?: Router;
    privateRouter?: Router;
};

export class ERPModule {
    constructor(
        readonly metadata: ERPModuleMetadata,
        readonly migrations: string,
        readonly permissions: string[],
        // readonly events: IEventHandler<any>[],
        readonly httpModule: HTTPModule,
    ) {}
}
