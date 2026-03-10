import { Either } from "ts-arch-kit/dist/core/helpers";

import { Brand, UpdateBrandDTO } from "@/modules/inventory/domain/entities/brand";
import { UpdateUseCaseInput } from "@/shared/application";
import { NotFoundModelError, ValidationError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type UpdateBrandUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type UpdateBrandUseCaseInput = UpdateBrandDTO & UpdateUseCaseInput;

export type UpdateBrandUseCaseOutput = Either<NotFoundModelError | ValidationError, Brand>;
