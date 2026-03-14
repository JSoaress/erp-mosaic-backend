import { Either } from "ts-arch-kit/dist/core/helpers";
import { QueryOptions } from "ts-arch-kit/dist/database";

import { Order } from "@/modules/restaurant/domain/entities/order";
import { FetchUseCaseInput } from "@/shared/application";
import { MosaicError } from "@/shared/errors";
import { Pagination } from "@/shared/helpers";

import { IRepositoryFactory, OrderWhereRepository } from "../../../repositories";

export type FetchOrdersUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type FetchOrdersUseCaseInput = FetchUseCaseInput & {
    queryOptions?: QueryOptions<OrderWhereRepository>;
};

export type FetchOrdersUseCaseOutput = Either<MosaicError, Pagination<Order>>;
