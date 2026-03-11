import { Either } from "ts-arch-kit/dist/core/helpers";

import { Item, UpdateItemDTO } from "@/modules/products/domain/entities/product";
import { ForeignKeyValidationService, UpdateUseCaseInput } from "@/shared/application";
import { NotFoundModelError, ValidationError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type UpdateItemUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
    fkValidationService: ForeignKeyValidationService;
};

export type UpdateItemUseCaseInput = UpdateItemDTO & UpdateUseCaseInput;

export type UpdateItemUseCaseOutput = Either<NotFoundModelError | ValidationError, Item>;
