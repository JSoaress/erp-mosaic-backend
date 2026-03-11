import { Either } from "ts-arch-kit/dist/core/helpers";

import { CreateSkuDTO, Sku } from "@/modules/products/domain/entities/product";
import { CreateUseCaseInput, ForeignKeyValidationService } from "@/shared/application";
import { InvalidSkuCategory, NotFoundModelError, SkuCodeTakenError, ValidationError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type CreateSkuUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
    fkServiceValidation: ForeignKeyValidationService;
};

export type CreateSkuUseCaseInput = CreateSkuDTO & CreateUseCaseInput;

export type CreateSkuUseCaseOutput = Either<
    ValidationError | NotFoundModelError | SkuCodeTakenError | InvalidSkuCategory,
    Sku
>;
