/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { AbstractModelProps } from "ts-arch-kit/dist/core/models";
import { SortParams } from "ts-arch-kit/dist/database";

import { Entity } from "@/shared/domain";

export type Column<D, P> = {
    columnName: string;
    pk?: boolean | { autoIncrement: boolean };
    // domainGetter?: string;
    toPersistence?: (value: D) => any;
    toDomain?: (value: P) => any;
    readOnly?: boolean;
    blockFilter?: boolean;
    // allowedFilters?: FILTER_OPERATORS[];
    beforeFiltering?: (value: unknown) => unknown;
};

export type ColumnMap<TDomain, TPersistence> = Record<string, Column<TDomain, TPersistence>>;

export type TableFilterConfig<TDomain, TPersistence> = {
    searchFields?: string[];
    customFilters?: Record<string, string[]>;
    columns: ColumnMap<TDomain, TPersistence>;
    sort?: SortParams[];
};

export abstract class AbstractMapper<TEntity extends AbstractModelProps, TPersistence> {
    abstract readonly config: TableFilterConfig<TEntity, TPersistence>;

    constructor(protected domainRestore: (props: any) => TEntity) {}

    toDomain(dto: TPersistence): TEntity {
        return this.domainRestore(this.prepareDomain(dto));
    }

    protected prepareDomain(dto: TPersistence) {
        const props: Record<string, unknown> = {};
        Object.entries<Column<TEntity, TPersistence>>(this.config.columns).forEach(([prop, config]) => {
            const { columnName, toDomain } = config;
            const value = dto[columnName as keyof TPersistence];
            props[prop] = toDomain ? toDomain(dto) : value;
        });
        return props;
    }

    toPersistence(entity: TEntity): Partial<TPersistence> {
        const result: Partial<TPersistence> = {};
        if (entity instanceof Entity) {
            for (const [prop, config] of Object.entries<Column<TEntity, TPersistence>>(this.config.columns)) {
                if (!entity.isNew && !entity.checkDirtyProps(prop)) continue;
                const { columnName, toPersistence } = config;
                const value = entity.get(prop);
                if (value === undefined) continue;
                result[columnName as keyof TPersistence] = toPersistence ? toPersistence(entity) : value;
            }
        } else {
            for (const [prop, config] of Object.entries<Column<TEntity, TPersistence>>(this.config.columns)) {
                const { columnName, toPersistence } = config;
                const value = entity[prop as keyof TEntity];
                if (value === undefined) continue;
                result[columnName as keyof TPersistence] = toPersistence ? toPersistence(entity) : value;
            }
        }
        return { ...result, _isNew: entity.id === 0 };
    }
}
