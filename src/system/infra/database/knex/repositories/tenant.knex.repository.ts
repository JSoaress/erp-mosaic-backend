import type { Knex } from "knex";
import { DbTransactionNotPreparedError, UnitOfWork } from "ts-arch-kit/dist/database";

import { ITenantRepository } from "@/system/application/repositories";
import { Tenant } from "@/system/domain/entities/tenant";

export class TenantKnexRepository implements ITenantRepository {
    private uow?: UnitOfWork<Knex.Transaction>;

    setUnitOfWork(uow: UnitOfWork<Knex.Transaction>): void {
        this.uow = uow;
    }

    async createTenant(tenant: Tenant): Promise<void> {
        const trx = this.uow?.getTransaction();
        if (!trx) throw new DbTransactionNotPreparedError("UnitOfWork não preparado em TenantKnexRepository.");
        await trx.raw(`CREATE SCHEMA ${tenant.getName()};`);
    }
}
