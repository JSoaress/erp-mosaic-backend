import { Either } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";

import { Category, UpdateCategoryDTO } from "@/modules/products/domain/entities/category";
import { UseCaseInput } from "@/shared/application";
import { NotFoundModelError, ValidationError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type UpdateCategoryUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type UpdateCategoryUseCaseInput = Omit<UpdateCategoryDTO, "parent"> &
    UseCaseInput & {
        id: PrimaryKey;
        parentId?: Nullable<PrimaryKey>;
    };

export type UpdateCategoryUseCaseOutput = Either<NotFoundModelError | ValidationError, Category>;
