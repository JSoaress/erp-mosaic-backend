import { Either } from "ts-arch-kit/dist/core/helpers";
import { QueryOptions } from "ts-arch-kit/dist/database";

import { Model } from "@/modules/products/domain/entities/model";
import { FetchUseCaseInput } from "@/shared/application";
import { MosaicError } from "@/shared/errors";
import { Pagination } from "@/shared/helpers";

import { IRepositoryFactory, ModelWhereRepository } from "../../../repositories";

export type FetchModelsUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type FetchModelsUseCaseInput = FetchUseCaseInput & {
    queryOptions?: QueryOptions<ModelWhereRepository>;
};

export type FetchModelsUseCaseOutput = Either<MosaicError, Pagination<Model>>;
