import { Either } from "ts-arch-kit/dist/core/helpers";

import { Brand, CreateBrandDTO } from "@/modules/products/domain/entities/brand";
import { CreateUseCaseInput } from "@/shared/application";
import { ValidationError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type CreateBrandUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type CreateBrandUseCaseInput = CreateBrandDTO & CreateUseCaseInput;

export type CreateBrandUseCaseOutput = Either<ValidationError, Brand>;
