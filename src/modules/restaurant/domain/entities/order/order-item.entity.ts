import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { Entity, Validity } from "@/shared/domain";
import { AddOrderItemConflictError, AddOrderItemError, ValidationError } from "@/shared/errors";
import { ZodValidator } from "@/shared/libs/zod";

import { OrderItemDTO, CreateOrderItemDTO, OrderItemSchema } from "./order-item.dto";

export class OrderItem extends Entity<OrderItemDTO> {
    static create(input: CreateOrderItemDTO): Either<ValidationError | AddOrderItemError, OrderItem> {
        if (!input.skuPrice.active)
            return left(new AddOrderItemConflictError(input.orderId as number, "O preço do produto não está ativo."));
        if (!new Validity(input.skuPrice.validFrom, input.skuPrice.validTo).isActive())
            return left(new AddOrderItemConflictError(input.orderId as number, "O preço do produto não está vigente."));
        const validDataOrError = ZodValidator.validate({ ...input, skuId: input.skuPrice.skuId }, OrderItemSchema);
        if (!validDataOrError.success) return left(new ValidationError(OrderItem.name, validDataOrError.errors));
        const { data } = validDataOrError;
        return right(
            new OrderItem({
                id: 0,
                ...data,
                unitPrice: input.skuPrice.price,
                createdAt: new Date(),
                createdBy: input.attendant.getId(),
                status: "delivered",
            }),
        );
    }

    static restore(input: OrderItemDTO) {
        return new OrderItem(input);
    }

    update(): Either<ValidationError, void> {
        return right(undefined);
    }

    getSchema() {
        return OrderItemSchema;
    }

    getTotalItem() {
        return this.get("unitPrice").multiply(this.get("quantity").toNumber());
    }

    cancel() {
        this.props.status = "cancelled";
    }
}
