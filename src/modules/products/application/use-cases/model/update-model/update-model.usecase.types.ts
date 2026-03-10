import { Either } from "ts-arch-kit/dist/core/helpers";

import { Model, UpdateModelDTO } from "@/modules/products/domain/entities/model";
import { ForeignKeyValidationService, UpdateUseCaseInput } from "@/shared/application";
import { NotFoundModelError, ValidationError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type UpdateModelUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
    fkValidationService: ForeignKeyValidationService;
};

export type UpdateModelUseCaseInput = UpdateModelDTO & UpdateUseCaseInput;

export type UpdateModelUseCaseOutput = Either<NotFoundModelError | ValidationError, Model>;
