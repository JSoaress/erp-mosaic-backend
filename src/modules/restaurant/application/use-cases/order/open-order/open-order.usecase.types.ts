import { Either } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";

import { IRepositoryFactory } from "@/modules/restaurant/application/repositories";
import { Order } from "@/modules/restaurant/domain/entities/order";
import { AuthenticatedUser } from "@/modules/users/domain/entities/auth";
import { NotFoundModelError, OpenOrderError, ValidationError } from "@/shared/errors";
import { Tenant } from "@/system/domain/entities/tenant";

export type OpenOrderUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type OpenOrderUseCaseInput = {
    tableId: PrimaryKey;
    authenticatedUser: AuthenticatedUser;
    tenant: Tenant;
};

export type OpenOrderUseCaseOutput = Either<ValidationError | OpenOrderError | NotFoundModelError, Order>;
