import { Either } from "ts-arch-kit/dist/core/helpers";

import { CreateModelDTO, Model } from "@/modules/products/domain/entities/model";
import { CreateUseCaseInput, ForeignKeyValidationService } from "@/shared/application";
import { NotFoundModelError, ValidationError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type CreateModelUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
    fkValidationService: ForeignKeyValidationService;
};

export type CreateModelUseCaseInput = CreateModelDTO & CreateUseCaseInput;

export type CreateModelUseCaseOutput = Either<ValidationError | NotFoundModelError, Model>;
