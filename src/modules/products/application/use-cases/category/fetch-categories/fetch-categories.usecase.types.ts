import { Either } from "ts-arch-kit/dist/core/helpers";

import { Category } from "@/modules/products/domain/entities/category";
import { FetchUseCaseInput } from "@/shared/application";
import { MosaicError } from "@/shared/errors";
import { Pagination } from "@/shared/helpers";

import { IRepositoryFactory } from "../../../repositories";

export type FetchCategoriesUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type FetchCategoriesUseCaseInput = FetchUseCaseInput;

export type FetchCategoriesUseCaseOutput = Either<MosaicError, Pagination<Category>>;
