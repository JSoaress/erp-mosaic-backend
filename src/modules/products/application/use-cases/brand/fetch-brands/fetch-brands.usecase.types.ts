import { Either } from "ts-arch-kit/dist/core/helpers";
import { QueryOptions } from "ts-arch-kit/dist/database";

import { Brand } from "@/modules/inventory/domain/entities/brand";
import { FetchUseCaseInput } from "@/shared/application";
import { MosaicError } from "@/shared/errors";
import { Pagination } from "@/shared/helpers";

import { BrandWhereRepository, IRepositoryFactory } from "../../../repositories";

export type FetchBrandsUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type FetchBrandsUseCaseInput = FetchUseCaseInput & {
    queryOptions?: QueryOptions<BrandWhereRepository>;
};

export type FetchBrandsUseCaseOutput = Either<MosaicError, Pagination<Brand>>;
