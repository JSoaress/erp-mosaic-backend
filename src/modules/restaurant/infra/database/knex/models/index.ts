import { OrderStatus } from "@/modules/restaurant/domain/entities/order";
import { KnexModel } from "@/core/infra/database/knex/models";

export type KnexTableDTO = KnexModel & {
    name: string;
    number: number;
    seats: Nullable<number>;
    status: string;
    active: boolean;
};

export type KnexOrderDTO = KnexModel & {
    table_id: number;
    status: OrderStatus;
    total: number;
};

export type KnexOrderItemDTO = KnexModel & {
    item: number;
    order_id: number;
    sku_id: number;
    quantity: number;
    unit_price: number;
    notes: Nullable<string>;
    status: "delivered" | "cancelled";
    created_by: number;
    created_at: Date;
};

export type KnexOrderStatusHistoryDTO = KnexModel & {
    order_id: number;
    status: OrderStatus;
    changed_by: number;
    created_at: Date;
};

export type KnexFullOrderDTO = KnexOrderDTO & {
    items: KnexOrderItemDTO[];
    statuses: KnexOrderStatusHistoryDTO[];
};
