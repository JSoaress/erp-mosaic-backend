import type { Knex } from "knex";
import { QueryOptions } from "ts-arch-kit/dist/database";

import { DefaultKnexRepository } from "@/core/infra/database/knex/repositories";
import { IOrderRepository } from "@/modules/restaurant/application/repositories";
import { Order } from "@/modules/restaurant/domain/entities/order";

import { OrderKnexMapper } from "../mappers";
import { KnexFullOrderDTO, KnexOrderItemDTO, KnexOrderStatusHistoryDTO } from "../models";

const TABLE_ORDERS = "restaurant_orders";
const TABLE_ORDER_ITEMS = "restaurant_order_items";
const TABLE_ORDER_STATUS_HISTORICAL = "restaurant_order_status_historical";

export class OrderKnexRepository extends DefaultKnexRepository<Order, KnexFullOrderDTO> implements IOrderRepository {
    constructor() {
        super(TABLE_ORDERS, new OrderKnexMapper());
    }

    async find(queryOptions?: QueryOptions<Record<string, unknown>>): Promise<Order[]> {
        const trx = this.getTransaction();
        const { filter, pagination, sort } = queryOptions || {};
        const conn = trx(`${this.tableName} as o`).select(
            "o.*",
            trx.raw(`
      (
        SELECT COALESCE(
          json_agg(
            json_build_object(
              'id', oi.id,
              'order_id', oi.order_id,
              'item', oi.item,
              'sku_id', oi.sku_id,
              'quantity', oi.quantity,
              'unit_price', oi.unit_price,
              'notes', oi.notes,
              'status', oi.status,
              'created_by', oi.created_by,
              'created_at', oi.created_at
            )
          ), '[]'
        )
        FROM ${TABLE_ORDER_ITEMS} oi
        WHERE oi.order_id = o.id
      ) as items
    `),
            trx.raw(`
      (
        SELECT COALESCE(
          json_agg(
            json_build_object(
              'id', sh.id,
              'order_id', sh.order_id,
              'status', sh.status,
              'changed_by', sh.changed_by,
              'created_at', sh.created_at
            )
          ), '[]'
        )
        FROM ${TABLE_ORDER_STATUS_HISTORICAL} sh
        WHERE sh.order_id = o.id
      ) as statuses
    `),
        );
        this.filter(conn, filter);
        sort?.forEach((s) => {
            const { columnName } = this.mapper.config.columns[s.column];
            conn.orderBy(columnName, s.order, s.nulls);
        });
        if (pagination) conn.limit(pagination.limit).offset(pagination.skip);
        const rows = await conn;
        return rows.map((row) => this.mapper.toDomain(row));
    }

    async save(data: Order): Promise<Order> {
        const trx = this.getTransaction();
        const { items = [], statuses = [], _isNew, ...persistence } = this.mapper.toPersistence(data);
        const objToPersist = this.removeFieldsFromObject(persistence, ["id", "_isNew"]);
        if (_isNew) {
            const [persistedObj] = await trx(this.tableName).insert(objToPersist, "*");
            const savedOrderItems = await this.handleOrderItems(trx, persistedObj.id, items);
            const savedStatuses = await this.handleOrderStatusHistorical(trx, persistedObj.id, statuses);
            return this.mapper.toDomain({ ...persistedObj, items: savedOrderItems, statuses: savedStatuses });
        }
        const [updatedObj] = await trx(this.tableName).update(objToPersist, "*").where({ id: data.id });
        const savedOrderItems = await this.handleOrderItems(trx, data.getId(), items);
        const savedStatuses = await this.handleOrderStatusHistorical(trx, data.getId(), statuses);
        return this.mapper.toDomain({ ...updatedObj, items: savedOrderItems, statuses: savedStatuses });
    }

    private async handleOrderItems(trx: Knex.Transaction, orderId: number, items: KnexOrderItemDTO[]) {
        if (!items.length) return [];

        const toSave = items.filter((i) => i._isNew);
        const toUpdate = items.filter((i) => !i._isNew);
        const result: KnexOrderItemDTO[] = [];

        if (toSave.length) {
            const objToPersists = toSave.map((item) => ({
                ...this.removeFieldsFromObject(item, ["id", "_isNew"]),
                order_id: orderId,
            }));
            const persistedObjs = await trx(TABLE_ORDER_ITEMS).insert(objToPersists, "*");
            result.push(...persistedObjs);
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const item of toUpdate) {
            const objToPersist = this.removeFieldsFromObject(item, ["id", "_isNew"]);
            // eslint-disable-next-line no-await-in-loop
            const [updatedObj] = await trx(TABLE_ORDER_ITEMS).update(objToPersist, "*").where({ id: item.id });
            result.push(updatedObj);
        }

        return result;
    }

    private async handleOrderStatusHistorical(trx: Knex.Transaction, orderId: number, items: KnexOrderStatusHistoryDTO[]) {
        const toSave = items.filter((i) => i._isNew);
        if (!toSave.length) return items;

        const result: KnexOrderStatusHistoryDTO[] = items.filter((i) => !i._isNew);

        const objToPersists = toSave.map((item) => ({
            ...this.removeFieldsFromObject(item, ["id", "_isNew"]),
            order_id: orderId,
        }));
        const persistedObjs = await trx(TABLE_ORDER_STATUS_HISTORICAL).insert(objToPersists, "*");
        result.push(...persistedObjs);

        return result;
    }
}
