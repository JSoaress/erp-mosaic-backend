import { Either } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";

import { Category, CreateCategoryDTO } from "@/modules/products/domain/entities/category";
import { NotFoundModelError, ValidationError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type CreateCategoryUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type CreateCategoryUseCaseInput = Omit<CreateCategoryDTO, "parent"> & {
    parentId?: Nullable<PrimaryKey>;
};

export type CreateCategoryUseCaseOutput = Either<NotFoundModelError | ValidationError, Category>;
