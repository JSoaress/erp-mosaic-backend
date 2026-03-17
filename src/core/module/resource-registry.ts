import { ForeignKeyValidationService } from "@/shared/application";
import { ICache, IJwt } from "@/shared/application/adapters";

import { ContractsRegistry } from "../contracts";

type AppResources = {
    fkValidationService: ForeignKeyValidationService;
    cache: ICache;
    jwt: IJwt;
    contractsRegistry: ContractsRegistry;
};

export class ResourceRegistry {
    private resources = new Map<string, unknown>();

    register<K extends keyof AppResources>(key: K, resource: AppResources[K]) {
        this.resources.set(key, resource);
    }

    get<K extends keyof AppResources>(key: K): AppResources[K] {
        const resource = this.resources.get(key);
        if (!resource) throw new Error(`Resource ${key} not found.`);
        return resource as AppResources[K];
    }
}
