import { Either } from "ts-arch-kit/dist/core/helpers";

import { Sku, UpdateSkuDTO } from "@/modules/products/domain/entities/product";
import { ForeignKeyValidationService, UpdateUseCaseInput } from "@/shared/application";
import { InvalidSkuCategory, NotFoundModelError, ValidationError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type UpdateSkuUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
    fkServiceValidation: ForeignKeyValidationService;
};

export type UpdateSkuUseCaseInput = UpdateSkuDTO & UpdateUseCaseInput;

export type UpdateSkuUseCaseOutput = Either<NotFoundModelError | ValidationError | InvalidSkuCategory, Sku>;
