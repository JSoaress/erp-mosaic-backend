/* eslint-disable @typescript-eslint/no-explicit-any */
import isObject from "isobject";
import type { Knex } from "knex";
import { DatabaseFilter, DatabaseFilterOperatorParams, FilterOperators, Where } from "ts-arch-kit/dist/database";

import { TableFilterConfig } from "../../abstract-mapper";

export class KnexDatabaseFilter extends DatabaseFilter<void> {
    constructor(readonly conn: Knex.QueryBuilder) {
        super();
    }

    filter(filterOptions: TableFilterConfig<any, any>, filter?: Where) {
        if (!filter) return;
        const { columns, searchFields } = filterOptions;
        const { search, ...modifiedFilter } = filter;
        // if (searchFields && search) {
        //     const searchFilter = searchFields.map<Where>((s) => {
        //         return parseQueryFilterToDbFilter(s, search);
        //     });
        //     modifiedFilter.$or = searchFilter;
        // }
        // eslint-disable-next-line no-restricted-syntax
        for (const [field, value] of Object.entries(modifiedFilter)) {
            if (field === "$or" && Array.isArray(value)) {
                this.conn.where((qb) => {
                    value.forEach((orBlock) => {
                        qb.orWhere((inner) => {
                            this.applyFilters(inner, filterOptions, orBlock);
                        });
                    });
                });
                // eslint-disable-next-line no-continue
                continue;
            }
            const { columnName } = columns[field];
            if (!isObject(value)) this.exact({ columnName, value });
            const advancedFilter = value as FilterOperators<unknown>;
            if (advancedFilter.$exact) this.exact({ columnName, value: advancedFilter.$exact });
            if (advancedFilter.$iexact) this.iexact({ columnName, value: advancedFilter.$iexact });
            if (advancedFilter.$exclude) this.exclude({ columnName, value: advancedFilter.$exclude });
            if (advancedFilter.$like) this.like({ columnName, value: advancedFilter.$like });
            if (advancedFilter.$ilike) this.ilike({ columnName, value: advancedFilter.$ilike });
            if (advancedFilter.$startWith) this.startWith({ columnName, value: advancedFilter.$startWith });
            if (advancedFilter.$endWith) this.endWith({ columnName, value: advancedFilter.$endWith });
            if (advancedFilter.$lt) this.lt({ columnName, value: advancedFilter.$lt });
            if (advancedFilter.$lte) this.lte({ columnName, value: advancedFilter.$lte });
            if (advancedFilter.$gt) this.gt({ columnName, value: advancedFilter.$gt });
            if (advancedFilter.$gte) this.gte({ columnName, value: advancedFilter.$gte });
            if (advancedFilter.$range) this.range({ columnName, value: advancedFilter.$range });
            if (advancedFilter.$in) this.in({ columnName, value: advancedFilter.$in });
            if (advancedFilter.$notIn) this.notIn({ columnName, value: advancedFilter.$notIn });
            if (advancedFilter.$isNull) this.isNull({ columnName, value: advancedFilter.$isNull });
        }
    }

    private applyFilters(conn: Knex.QueryBuilder, filterOptions: TableFilterConfig<any, any>, filter: Where) {
        const nestedFilter = new KnexDatabaseFilter(conn);
        nestedFilter.filter(filterOptions, filter);
    }

    exact(params: DatabaseFilterOperatorParams): void {
        this.conn.where({ [params.columnName]: params.value });
    }

    iexact(params: DatabaseFilterOperatorParams): void {
        this.conn.whereILike({ [params.columnName]: `${params.value}` });
    }

    exclude(params: DatabaseFilterOperatorParams): void {
        this.conn.where(params.columnName, "<>", params.value);
    }

    like(params: DatabaseFilterOperatorParams): void {
        this.conn.whereLike(params.columnName, `%${params.value}%`);
    }

    ilike({ columnName, value }: DatabaseFilterOperatorParams): void {
        const isJson = columnName.includes("->>");
        if (!isJson) this.conn.whereILike(columnName, `%${value}%`);
        else {
            const [attr, field] = columnName.split("->>");
            this.conn.whereRaw(`${attr}->>? ILIKE ?`, [field, `%${value}%`]);
        }
    }

    startWith(params: DatabaseFilterOperatorParams): void {
        this.conn.whereILike(params.columnName, `${params.value}%`);
    }

    endWith(params: DatabaseFilterOperatorParams): void {
        this.conn.whereILike(params.columnName, `%${params.value}`);
    }

    lt(params: DatabaseFilterOperatorParams): void {
        this.conn.where(params.columnName, "<", params.value);
    }

    lte(params: DatabaseFilterOperatorParams): void {
        this.conn.where(params.columnName, "<=", params.value);
    }

    gt(params: DatabaseFilterOperatorParams): void {
        this.conn.where(params.columnName, ">", params.value);
    }

    gte(params: DatabaseFilterOperatorParams): void {
        this.conn.where(params.columnName, ">=", params.value);
    }

    range(params: DatabaseFilterOperatorParams): void {
        const { columnName, value } = params;
        const { start, end } = value as {
            start: number | Date;
            end: number | Date;
        };
        this.conn.whereBetween(columnName, [start, end]);
    }

    in({ columnName, value }: DatabaseFilterOperatorParams): void {
        const isJson = columnName.includes("->>");
        if (!isJson) this.conn.whereIn(columnName, value);
        else {
            const [attr, field] = columnName.split("->>");
            this.conn.whereRaw(`${attr}->>? = ANY (?)`, [field, value]);
        }
    }

    notIn(params: DatabaseFilterOperatorParams): void {
        this.conn.whereNotIn(params.columnName, params.value);
    }

    isNull(params: DatabaseFilterOperatorParams): void {
        const { columnName, value } = params;
        if (value) this.conn.whereNull(columnName);
        if (!value) this.conn.whereNotNull(columnName);
    }
}
