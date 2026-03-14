import { Either } from "ts-arch-kit/dist/core/helpers";

import { AuthenticatedUser } from "@/modules/users/domain/entities/auth";
import { ICache, IJwt } from "@/shared/application/adapters";
import { InvalidTokenError, NotFoundModelError } from "@/shared/errors";
import { Tenant } from "@/system/domain/entities/tenant";

import { IRepositoryFactory } from "../../../repositories";

export type CheckAuthenticatedUserUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
    jwtService: IJwt;
    cache: ICache;
};

export type CheckAuthenticatedUserUseCaseInput = {
    token: string;
    tenant: Tenant;
};

export type CheckAuthenticatedUserUseCaseOutput = Either<InvalidTokenError | NotFoundModelError, AuthenticatedUser>;
