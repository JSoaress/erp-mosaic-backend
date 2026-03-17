import { Either } from "ts-arch-kit/dist/core/helpers";

import { CreateUserDTO, User } from "@/modules/users/domain/entities/user";
import { UseCaseInput } from "@/shared/application";
import { ValidationError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type CreateInitialUserUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type CreateInitialUserUseCaseInput = Omit<CreateUserDTO, "isAdmin"> & UseCaseInput;

export type CreateInitialUserUseCaseOutput = Either<ValidationError, User>;
