import { Either } from "ts-arch-kit/dist/core/helpers";
import { QueryOptions } from "ts-arch-kit/dist/database";

import { CreateSkuPriceDTO, SkuPrice, UpdateSkuPriceDTO } from "@/modules/products/domain/entities/sku-price";
import {
    CreateUseCaseInput,
    DeleteUseCaseInput,
    DeleteUseCaseOutput,
    FetchUseCaseInput,
    ForeignKeyValidationService,
    UpdateUseCaseInput,
} from "@/shared/application";
import { MosaicError, NotFoundModelError, ValidationError } from "@/shared/errors";
import { Pagination } from "@/shared/helpers";

import { IRepositoryFactory, SkuPriceWhereRepository } from "../../repositories";

export type CreateSkuPriceUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
    fkValidationService: ForeignKeyValidationService;
};

export type CreateSkuPriceUseCaseInput = CreateSkuPriceDTO & CreateUseCaseInput;

export type CreateSkuPriceUseCaseOutput = Either<ValidationError | NotFoundModelError, SkuPrice>;

export type FetchSkuPricesUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type FetchSkuPricesUseCaseInput = FetchUseCaseInput & {
    queryOptions?: QueryOptions<SkuPriceWhereRepository>;
};

export type FetchSkuPricesUseCaseOutput = Either<MosaicError, Pagination<SkuPrice>>;

export type UpdateSkuPriceUseCaseGateway = CreateSkuPriceUseCaseGateway;

export type UpdateSkuPriceUseCaseInput = UpdateSkuPriceDTO & UpdateUseCaseInput;

export type UpdateSkuPriceUseCaseOutput = CreateSkuPriceUseCaseOutput;

export type DeleteSkuPriceUseCaseGateway = FetchSkuPricesUseCaseGateway;

export type DeleteSkuPriceUseCaseInput = DeleteUseCaseInput;

export type DeleteSkuPriceUseCaseOutput = DeleteUseCaseOutput;
