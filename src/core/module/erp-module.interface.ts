/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";

type ERPModuleMetadata = {
    name: string;
};

export class ERPModule {
    constructor(
        readonly metadata: ERPModuleMetadata,
        readonly migrations: string,
        readonly permissions: string[],
        // readonly events: IEventHandler<any>[],
        readonly router: Router,
    ) {}
}
