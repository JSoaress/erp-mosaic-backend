import { Either } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";

import { Order } from "@/modules/restaurant/domain/entities/order";
import { AuthenticatedUser } from "@/modules/users/domain/entities/auth";
import { UseCaseInput } from "@/shared/application";
import { CancelOrderError, NotFoundModelError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type CancelOrderUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type CancelOrderUseCaseInput = UseCaseInput & {
    id: PrimaryKey;
    authenticatedUser: AuthenticatedUser;
};

export type CancelOrderUseCaseOutput = Either<NotFoundModelError | CancelOrderError, Order>;
