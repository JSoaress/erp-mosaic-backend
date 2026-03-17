import { Either } from "ts-arch-kit/dist/core/helpers";

import { AuthenticatedUser } from "@/modules/users/domain/entities/auth";
import { UseCaseInput } from "@/shared/application";
import { ICache, IJwt } from "@/shared/application/adapters";
import { InvalidTokenError, NotFoundModelError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type CheckAuthenticatedUserUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
    jwtService: IJwt;
    cache: ICache;
};

export type CheckAuthenticatedUserUseCaseInput = UseCaseInput & {
    token: string;
};

export type CheckAuthenticatedUserUseCaseOutput = Either<InvalidTokenError | NotFoundModelError, AuthenticatedUser>;
