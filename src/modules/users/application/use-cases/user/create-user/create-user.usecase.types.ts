import { Either } from "ts-arch-kit/dist/core/helpers";

import { CreateUserDTO, User } from "@/modules/users/domain/entities/user";
import { UseCaseInput } from "@/shared/application";
import { EmailTakenError, ValidationError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type CreateUserUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type CreateUserUseCaseInput = CreateUserDTO & UseCaseInput;

export type CreateUserUseCaseOutput = Either<ValidationError | EmailTakenError, User>;
