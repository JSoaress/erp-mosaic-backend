export type OrderStatus = "open" | "closed" | "cancelled";

export class OrderStatusHistory {
    private constructor(
        readonly id: number,
        readonly orderId: number,
        readonly status: OrderStatus,
        readonly changedBy: number,
        readonly createdAt: Date,
    ) {}

    static create(orderId: number, status: OrderStatus, changedBy: number) {
        return new OrderStatusHistory(0, orderId, status, changedBy, new Date());
    }

    static restore(id: number, orderId: number, status: OrderStatus, changedBy: number, createdAt: Date) {
        return new OrderStatusHistory(id, orderId, status, changedBy, createdAt);
    }
}
