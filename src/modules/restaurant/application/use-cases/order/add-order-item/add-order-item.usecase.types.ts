import { Either } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";

import { IProductsContract } from "@/core/contracts";
import { CreateOrderItemDTO, Order } from "@/modules/restaurant/domain/entities/order";
import { AuthenticatedUser } from "@/modules/users/domain/entities/auth";
import { AddOrderItemError, NotFoundModelError, ValidationError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type AddOrderItemUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
    productsContract: IProductsContract;
};

export type AddOrderItemUseCaseInput = Pick<CreateOrderItemDTO, "orderId" | "quantity" | "notes"> & {
    skuPriceId: PrimaryKey;
    authenticatedUser: AuthenticatedUser;
};

export type AddOrderItemUseCaseOutput = Either<ValidationError | AddOrderItemError | NotFoundModelError, Order>;
