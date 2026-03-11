import { Either } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";

import { Category, UpdateCategoryDTO } from "@/modules/products/domain/entities/category";
import { NotFoundModelError, ValidationError } from "@/shared/errors";
import { Tenant } from "@/system/domain/entities/tenant";

import { IRepositoryFactory } from "../../../repositories";

export type UpdateCategoryUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type UpdateCategoryUseCaseInput = Omit<UpdateCategoryDTO, "parent"> & {
    id: PrimaryKey;
    parentId?: Nullable<PrimaryKey>;
    tenant: Tenant;
};

export type UpdateCategoryUseCaseOutput = Either<NotFoundModelError | ValidationError, Category>;
