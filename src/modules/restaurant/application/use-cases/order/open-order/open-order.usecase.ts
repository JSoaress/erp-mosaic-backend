import { left, right } from "ts-arch-kit/dist/core/helpers";

import { Attendant } from "@/modules/restaurant/domain/entities/attendant";
import { Order } from "@/modules/restaurant/domain/entities/order";
import { Table } from "@/modules/restaurant/domain/entities/table";
import { UseCase } from "@/shared/application";
import { NotFoundModelError } from "@/shared/errors";

import { OpenOrderUseCaseGateway, OpenOrderUseCaseInput, OpenOrderUseCaseOutput } from "./open-order.usecase.types";

export class OpenOrderUseCase extends UseCase<OpenOrderUseCaseInput, OpenOrderUseCaseOutput> {
    constructor(private gateway: OpenOrderUseCaseGateway) {
        super();
    }

    protected async impl({ tenant, ...input }: OpenOrderUseCaseInput): Promise<OpenOrderUseCaseOutput> {
        const unitOfWork = this.gateway.repositoryFactory.createUnitOfWork(tenant);
        const tableRepository = this.gateway.repositoryFactory.createTableRepository();
        const orderRepository = this.gateway.repositoryFactory.createOrderRepository();
        unitOfWork.prepare(tableRepository, orderRepository);
        return unitOfWork.execute<OpenOrderUseCaseOutput>(async () => {
            const table = await tableRepository.findById(input.tableId);
            if (!table) return left(new NotFoundModelError(Table.name, input.tableId));
            const orderOrError = Order.create({
                table,
                attendant: new Attendant(input.authenticatedUser),
            });
            if (orderOrError.isLeft()) return left(orderOrError.value);
            const newOrder = orderOrError.value;
            const createdOrder = await orderRepository.save(newOrder);
            return right(createdOrder);
        });
    }
}
