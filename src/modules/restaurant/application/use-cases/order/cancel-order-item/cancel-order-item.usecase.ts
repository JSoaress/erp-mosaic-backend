import { left, right } from "ts-arch-kit/dist/core/helpers";

import { Order } from "@/modules/restaurant/domain/entities/order";
import { UseCase } from "@/shared/application";
import { NotFoundModelError } from "@/shared/errors";

import {
    CancelOrderItemUseCaseGateway,
    CancelOrderItemUseCaseInput,
    CancelOrderItemUseCaseOutput,
} from "./cancel-order-item.usecase.types";

export class CancelOrderItemUseCase extends UseCase<CancelOrderItemUseCaseInput, CancelOrderItemUseCaseOutput> {
    constructor(private gateway: CancelOrderItemUseCaseGateway) {
        super();
    }

    protected async impl({ tenant, orderId, item }: CancelOrderItemUseCaseInput): Promise<CancelOrderItemUseCaseOutput> {
        const unitOfWork = this.gateway.repositoryFactory.createUnitOfWork(tenant);
        const orderRepository = this.gateway.repositoryFactory.createOrderRepository();
        unitOfWork.prepare(orderRepository);
        return unitOfWork.execute<CancelOrderItemUseCaseOutput>(async () => {
            const order = await orderRepository.findById(orderId);
            if (!order) return left(new NotFoundModelError(Order.name, orderId));
            const cancelItemOrError = order.cancelItem(item);
            if (cancelItemOrError.isLeft()) return left(cancelItemOrError.value);
            const updatedOrder = await orderRepository.save(order);
            return right(updatedOrder);
        });
    }
}
