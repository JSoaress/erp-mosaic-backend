import { Either } from "ts-arch-kit/dist/core/helpers";

import { CreateItemDTO, Item } from "@/modules/products/domain/entities/product";
import { CreateUseCaseInput, ForeignKeyValidationService } from "@/shared/application";
import { NotFoundModelError, ValidationError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type CreateItemUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
    fkValidationService: ForeignKeyValidationService;
};

export type CreateItemUseCaseInput = CreateItemDTO & CreateUseCaseInput;

export type CreateItemUseCaseOutput = Either<ValidationError | NotFoundModelError, Item>;
