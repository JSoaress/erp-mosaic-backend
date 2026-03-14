import { left, right } from "ts-arch-kit/dist/core/helpers";

import { Attendant } from "@/modules/restaurant/domain/entities/attendant";
import { Order } from "@/modules/restaurant/domain/entities/order";
import { UseCase } from "@/shared/application";
import { NotFoundModelError } from "@/shared/errors";

import { CancelOrderUseCaseGateway, CancelOrderUseCaseInput, CancelOrderUseCaseOutput } from "./cancel-order.usecase.types";

export class CancelOrderUseCase extends UseCase<CancelOrderUseCaseInput, CancelOrderUseCaseOutput> {
    constructor(private gateway: CancelOrderUseCaseGateway) {
        super();
    }

    protected async impl(input: CancelOrderUseCaseInput): Promise<CancelOrderUseCaseOutput> {
        const unitOfWork = this.gateway.repositoryFactory.createUnitOfWork(input.tenant);
        const orderRepository = this.gateway.repositoryFactory.createOrderRepository();
        unitOfWork.prepare(orderRepository);
        return unitOfWork.execute<CancelOrderUseCaseOutput>(async () => {
            const order = await orderRepository.findById(input.id);
            if (!order) return left(new NotFoundModelError(Order.name, input.id));
            const cancelOrError = order.cancel(new Attendant(input.authenticatedUser));
            if (cancelOrError.isLeft()) return left(cancelOrError.value);
            const updatedOrder = await orderRepository.save(order);
            return right(updatedOrder);
        });
    }
}
