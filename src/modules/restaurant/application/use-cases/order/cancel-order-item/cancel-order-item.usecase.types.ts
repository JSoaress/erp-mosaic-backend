import { Either } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";

import { Order } from "@/modules/restaurant/domain/entities/order";
import { UseCaseInput } from "@/shared/application";
import { CancelOrderItemError, NotFoundModelError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type CancelOrderItemUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type CancelOrderItemUseCaseInput = UseCaseInput & {
    orderId: PrimaryKey;
    item: number;
};

export type CancelOrderItemUseCaseOutput = Either<NotFoundModelError | CancelOrderItemError, Order>;
