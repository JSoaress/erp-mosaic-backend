import { left, right } from "ts-arch-kit/dist/core/helpers";

import { Attendant } from "@/modules/restaurant/domain/entities/attendant";
import { Order } from "@/modules/restaurant/domain/entities/order";
import { UseCase } from "@/shared/application";
import { NotFoundModelError } from "@/shared/errors";

import {
    AddOrderItemUseCaseGateway,
    AddOrderItemUseCaseInput,
    AddOrderItemUseCaseOutput,
} from "./add-order-item.usecase.types";

export class AddOrderItemUseCase extends UseCase<AddOrderItemUseCaseInput, AddOrderItemUseCaseOutput> {
    constructor(private gateway: AddOrderItemUseCaseGateway) {
        super();
    }

    protected async impl({ tenant, orderId, ...input }: AddOrderItemUseCaseInput): Promise<AddOrderItemUseCaseOutput> {
        const unitOfWork = this.gateway.repositoryFactory.createUnitOfWork(tenant);
        const orderRepository = this.gateway.repositoryFactory.createOrderRepository();
        unitOfWork.prepare(orderRepository);
        return unitOfWork.execute<AddOrderItemUseCaseOutput>(async () => {
            const order = await orderRepository.findById(orderId as number);
            if (!order) return left(new NotFoundModelError(Order.name, orderId));
            const skuPriceOrError = await this.gateway.productsContract.getSkuPriceById(input.skuPriceId, tenant);
            if (skuPriceOrError.isLeft()) return left(skuPriceOrError.value);
            const addOrderItemOrError = order.addItem({
                attendant: new Attendant(input.authenticatedUser),
                notes: input.notes,
                quantity: input.quantity,
                skuPrice: skuPriceOrError.value,
            });
            if (addOrderItemOrError.isLeft()) return left(addOrderItemOrError.value);
            const updatedOrder = await orderRepository.save(order);
            return right(updatedOrder);
        });
    }
}
