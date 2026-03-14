import { Either } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";

import { Order } from "@/modules/restaurant/domain/entities/order";
import { CancelOrderItemError, NotFoundModelError } from "@/shared/errors";
import { Tenant } from "@/system/domain/entities/tenant";

import { IRepositoryFactory } from "../../../repositories";

export type CancelOrderItemUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type CancelOrderItemUseCaseInput = {
    orderId: PrimaryKey;
    item: number;
    tenant: Tenant;
};

export type CancelOrderItemUseCaseOutput = Either<NotFoundModelError | CancelOrderItemError, Order>;
