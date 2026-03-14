import { EntityProps } from "@/shared/domain";

import { Attendant } from "../attendant";
import { Table } from "../table";
import { CreateOrderItemDTO } from "./order-item.dto";
import { OrderItem } from "./order-item.entity";
import { OrderStatusHistory } from "./order-status.vo";

export type OrderDTO = EntityProps & {
    tableId: number;
};

export type CreateOrderDTO = {
    table: Table;
    attendant: Attendant;
};

export type RestoreOrderDTO = OrderDTO & {
    items: OrderItem[];
    statuses: OrderStatusHistory[];
};

export type AddOrderItemDTO = Omit<CreateOrderItemDTO, "orderId" | "item">;
