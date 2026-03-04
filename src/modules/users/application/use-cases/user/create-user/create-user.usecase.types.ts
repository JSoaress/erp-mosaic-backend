import { Either } from "ts-arch-kit/dist/core/helpers";

import { CreateUserDTO, User } from "@/modules/users/domain/entities/user";
import { EmailTakenError, ValidationError } from "@/shared/errors";
import { Tenant } from "@/system/domain/entities/tenant";

import { IRepositoryFactory } from "../../../repositories";

export type CreateUserUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type CreateUserUseCaseInput = CreateUserDTO & {
    tenant: Tenant;
};

export type CreateUserUseCaseOutput = Either<ValidationError | EmailTakenError, User>;
