import { IPresenter } from "ts-arch-kit/dist/core/helpers";

import { Order, OrderDTO, OrderItemDTO } from "@/modules/restaurant/domain/entities/order";

type OrderItemJson = Omit<OrderItemDTO, "orderId" | "quantity" | "unitPrice"> & {
    quantity: number;
    unitPrice: number;
};

type OrderJson = OrderDTO & {
    status: string;
    total: number;
    items: OrderItemJson[];
};

export class OrderJsonPresenter implements IPresenter<Order, OrderJson> {
    present(input: Order): OrderJson {
        return {
            id: input.id,
            tableId: input.get("tableId"),
            status: input.getStatus(),
            total: input.getTotalOrder().cents,
            items: input.getItems().map((item) => ({
                id: item.id,
                item: item.get("item"),
                skuId: item.get("skuId"),
                quantity: item.get("quantity").toNumber(),
                unitPrice: item.get("unitPrice").cents,
                notes: item.get("notes"),
                status: item.get("status"),
                createdBy: item.get("createdBy"),
                createdAt: item.get("createdAt"),
            })),
        };
    }
}
