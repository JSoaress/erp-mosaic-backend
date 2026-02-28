import { ISetUnitOfWork } from "ts-arch-kit/dist/database";

import { Tenant } from "@/system/domain/entities/tenant";

export interface ITenantRepository extends ISetUnitOfWork {
    createTenant(tenant: Tenant): Promise<void>;
}
