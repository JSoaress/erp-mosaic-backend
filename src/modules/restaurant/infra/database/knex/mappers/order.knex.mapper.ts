import { Order, OrderItem, OrderStatusHistory } from "@/modules/restaurant/domain/entities/order";
import { Money, Quantity } from "@/shared/domain";
import { AbstractMapper, TableFilterConfig } from "@/shared/infra/database";

import { KnexFullOrderDTO } from "../models";

export class OrderKnexMapper extends AbstractMapper<Order, KnexFullOrderDTO> {
    readonly config: TableFilterConfig<Order, KnexFullOrderDTO> = {
        columns: {
            id: { columnName: "id", pk: true },
            tableId: { columnName: "table_id" },
            status: { columnName: "status" },
            total: { columnName: "total" },
        },
    };

    constructor() {
        super(Order.restore);
    }

    toDomain(persistence: KnexFullOrderDTO): Order {
        return Order.restore({
            id: persistence.id,
            tableId: persistence.table_id,
            items: persistence.items.map((item) => {
                return OrderItem.restore({
                    id: item.id,
                    item: item.item,
                    orderId: item.order_id,
                    skuId: item.sku_id,
                    quantity: Quantity.create(item.quantity),
                    unitPrice: Money.fromCents(item.unit_price),
                    notes: item.notes,
                    status: item.status,
                    createdBy: item.created_by,
                    createdAt: item.created_at,
                });
            }),
            statuses: persistence.statuses.map((status) => {
                return OrderStatusHistory.restore(
                    status.id,
                    status.order_id,
                    status.status,
                    status.changed_by,
                    status.created_at,
                );
            }),
        });
    }

    toPersistence(entity: Order): KnexFullOrderDTO {
        return {
            id: entity.getId(),
            table_id: entity.get("tableId"),
            status: entity.getStatus(),
            total: entity.getTotalOrder().cents,
            items: entity.getItems().map((item) => ({
                id: item.getId(),
                item: item.get("item"),
                order_id: item.get("orderId"),
                sku_id: item.get("skuId"),
                quantity: item.get("quantity").toNumber(),
                unit_price: item.get("unitPrice").cents,
                notes: item.get("notes"),
                status: item.get("status"),
                created_by: item.get("createdBy"),
                created_at: item.get("createdAt"),
                _isNew: item.isNew,
            })),
            statuses: entity.getStatuses().map((status) => ({
                id: status.id,
                order_id: status.orderId,
                status: status.status,
                changed_by: status.changedBy,
                created_at: status.createdAt,
                _isNew: status.id === 0,
            })),
            _isNew: entity.isNew,
        };
    }
}
