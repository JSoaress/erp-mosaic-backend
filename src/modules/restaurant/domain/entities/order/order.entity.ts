import { Either, left, right } from "ts-arch-kit/dist/core/helpers";
import { ZodObject } from "zod";

import { Entity, Money } from "@/shared/domain";
import {
    AddOrderItemConflictError,
    AddOrderItemError,
    CancelOrderError,
    CancelOrderItemError,
    OpenOrderError,
    ValidationError,
} from "@/shared/errors";

import { Attendant } from "../attendant";
import { OrderItem } from "./order-item.entity";
import { OrderStatus, OrderStatusHistory } from "./order-status.vo";
import { OrderDTO, CreateOrderDTO, AddOrderItemDTO, RestoreOrderDTO } from "./order.dto";

export class Order extends Entity<OrderDTO> {
    private items: OrderItem[] = [];
    private statuses: OrderStatusHistory[] = [];

    static create({ table, attendant }: CreateOrderDTO): Either<ValidationError | OpenOrderError, Order> {
        if (table.get("status") !== "opened")
            return left(new OpenOrderError(`A mesa nº${table.get("number")} não está aberta.`));
        const order = new Order({ id: 0, tableId: table.getId() });
        order.addStatus(attendant.getId(), "open");
        return right(order);
    }

    static restore({ items, statuses, ...input }: RestoreOrderDTO) {
        const order = new Order(input);
        order.items = items.sort((a, b) => a.get("item") - b.get("item"));
        order.statuses = statuses.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        return order;
    }

    update(): Either<ValidationError, void> {
        return right(undefined);
    }

    getSchema(): ZodObject {
        throw new Error("Method not implemented.");
    }

    addItem(input: AddOrderItemDTO): Either<ValidationError | AddOrderItemError, OrderItem> {
        if (this.getStatus() !== "open")
            return left(new AddOrderItemConflictError(this.getId(), "O pedido não está mais aberto."));
        const nextItem = this.getNextOrderItemNumber();
        const orderItemOrError = OrderItem.create({ ...input, item: nextItem, orderId: this.getId() });
        if (orderItemOrError.isLeft()) return left(orderItemOrError.value);
        this.items.push(orderItemOrError.value);
        return right(orderItemOrError.value);
    }

    cancelItem(item: number): Either<CancelOrderItemError, void> {
        const index = this.items.findIndex((i) => i.get("item") === item);
        if (index === -1) return left(new CancelOrderItemError(this.getId(), `O item ${item} não existe.`));
        const orderItem = this.items[index];
        if (orderItem.get("status") === "cancelled")
            return left(new CancelOrderItemError(this.getId(), "O item já está cancelado."));
        orderItem.cancel();
        this.items[index] = orderItem;
        return right(undefined);
    }

    close(attendant: Attendant): Either<AddOrderItemError, void> {
        if (this.getStatus() !== "open")
            return left(new AddOrderItemConflictError(this.getId(), "O pedido não está mais aberto."));
        this.addStatus(attendant.getId(), "closed");
        return right(undefined);
    }

    cancel(attendant: Attendant): Either<CancelOrderError, void> {
        // TODO: emitir evento de pedido cancelado
        if (this.getStatus() !== "open") return left(new CancelOrderError(this.getId(), "O pedido não está mais aberto."));
        this.addStatus(attendant.getId(), "cancelled");
        return right(undefined);
    }

    getTotalOrder() {
        let total = Money.fromCents(0);
        this.items
            .filter((item) => item.get("status") === "delivered")
            .forEach((item) => {
                total = total.add(item.getTotalItem());
            });
        return total;
    }

    getStatus(): OrderStatus {
        const currentStatus = this.statuses[this.statuses.length - 1];
        return currentStatus.status;
    }

    getItems() {
        return [...this.items];
    }

    getStatuses() {
        return [...this.statuses];
    }

    private getNextOrderItemNumber() {
        return this.items.length + 1;
    }

    private addStatus(attendantId: number, status: OrderStatus) {
        this.statuses.push(OrderStatusHistory.create(this.getId(), status, attendantId));
    }
}
