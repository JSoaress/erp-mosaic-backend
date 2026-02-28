import type { Knex } from "knex";
import { parseNumber } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";
import {
    DbTransactionNotPreparedError,
    QueryOptions,
    QueryOptionsWithoutPagination,
    UnitOfWork,
    Where,
} from "ts-arch-kit/dist/database";

import { EntityProps } from "@/shared/domain";

import { AbstractMapper } from "../../abstract-mapper";
import { IRepository } from "../../repository.interface";
import { KnexModel } from "../models";
import { KnexDatabaseFilter } from "./knex-database-filter";

export class DefaultKnexRepository<
    TDomain extends EntityProps,
    TPersistence extends KnexModel,
> implements IRepository<TDomain> {
    protected uow?: UnitOfWork<Knex.Transaction>;

    constructor(
        readonly tableName: string,
        readonly mapper: AbstractMapper<TDomain, TPersistence>,
    ) {}

    setUnitOfWork(uow: UnitOfWork<Knex.Transaction>): void {
        this.uow = uow;
    }

    async count(filter?: Where<Record<string, unknown>>): Promise<number> {
        const client = this.getTransaction();
        const conn = client(this.tableName).count("id", { as: "count" });
        if (filter) this.filter(conn, filter);
        const [result] = await conn;
        return parseNumber(result.count);
    }

    async exists(where?: Where<Record<string, unknown>>): Promise<boolean> {
        const count = await this.count(where);
        return count >= 1;
    }

    async find(queryOptions?: QueryOptions<Record<string, unknown>>): Promise<TDomain[]> {
        const client = this.getTransaction();
        const { filter, pagination, sort } = queryOptions || {};
        const conn = client(this.tableName).select("*");
        this.filter(conn, filter);
        if (sort) {
            sort.forEach((s) => {
                const { columnName } = this.mapper.config.columns[s.column];
                conn.orderBy(columnName, s.order, s.nulls);
            });
        }
        if (pagination) conn.limit(pagination.limit).offset(pagination.skip);
        const rows = await conn;
        return rows.map((row) => this.mapper.toDomain(row));
    }

    async findOne(queryOptions?: QueryOptionsWithoutPagination<Record<string, unknown>>): Promise<TDomain | null> {
        const [object] = await this.find({ ...queryOptions, pagination: { limit: 1, skip: 0 } });
        return object || null;
    }

    async findById(id: PrimaryKey): Promise<TDomain | null> {
        return this.findOne({ filter: { id } });
    }

    async save(data: TDomain): Promise<TDomain> {
        const client = this.getTransaction();
        const persistence = this.mapper.toPersistence(data);
        const objToPersist = this.removeFieldsFromObject(persistence, ["id", "_isNew"]);
        if (persistence._isNew) {
            const [persistedObj] = await client(this.tableName).insert(objToPersist, "*");
            return this.mapper.toDomain(persistedObj);
        }
        const [updatedObj] = await client(this.tableName).update(objToPersist, "*").where({ id: persistence.id });
        return this.mapper.toDomain(updatedObj);
    }

    async destroy(model: TDomain): Promise<void> {
        const client = this.getTransaction();
        await client(this.tableName).where({ id: model.id }).del();
    }

    getTransaction(): Knex.Transaction {
        if (!this.uow)
            throw new DbTransactionNotPreparedError(`O UnitOfWork não foi preparado para a tabela "${this.tableName}".`);
        return this.uow.getTransaction();
    }

    filter(conn: Knex.QueryBuilder, filter?: Where) {
        const knexDatabaseFilter = new KnexDatabaseFilter(conn);
        knexDatabaseFilter.filter(this.mapper.config, filter);
    }

    removeFieldsFromObject(obj: Record<string, unknown>, ignore?: string[]): Record<string, unknown> {
        if (!ignore || !ignore.length) return obj;
        const modifiedObj: Record<string, unknown> = {};
        Object.entries(obj).forEach(([k, v]) => {
            if (v !== undefined && !ignore?.includes(k)) modifiedObj[k] = v;
        });
        return modifiedObj;
    }
}
