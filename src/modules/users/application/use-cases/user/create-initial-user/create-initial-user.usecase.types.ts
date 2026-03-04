import { Either } from "ts-arch-kit/dist/core/helpers";

import { CreateUserDTO, User } from "@/modules/users/domain/entities/user";
import { ValidationError } from "@/shared/errors";
import { Tenant } from "@/system/domain/entities/tenant";

import { IRepositoryFactory } from "../../../repositories";

export type CreateInitialUserUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type CreateInitialUserUseCaseInput = Omit<CreateUserDTO, "isAdmin"> & {
    tenant: Tenant;
};

export type CreateInitialUserUseCaseOutput = Either<ValidationError, User>;
