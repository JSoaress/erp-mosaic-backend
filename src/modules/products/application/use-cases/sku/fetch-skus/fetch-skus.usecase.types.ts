import { Either } from "ts-arch-kit/dist/core/helpers";
import { QueryOptions } from "ts-arch-kit/dist/database";

import { Sku } from "@/modules/products/domain/entities/product";
import { FetchUseCaseInput } from "@/shared/application";
import { MosaicError } from "@/shared/errors";
import { Pagination } from "@/shared/helpers";

import { IRepositoryFactory, SkuWhereRepository } from "../../../repositories";

export type FetchSkusUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type FetchSkusUseCaseInput = FetchUseCaseInput & {
    queryOptions?: QueryOptions<SkuWhereRepository>;
};

export type FetchSkusUseCaseOutput = Either<MosaicError, Pagination<Sku>>;
