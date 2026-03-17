import { Either } from "ts-arch-kit/dist/core/helpers";

import { UseCaseInput } from "@/shared/application";
import { IJwt } from "@/shared/application/adapters";
import { InvalidCredentialsError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type AuthenticateUserUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
    jwtService: IJwt;
};

export type AuthenticateUserUseCaseInput = UseCaseInput & {
    email: string;
    password: string;
};

export type AuthenticateUserUseCaseOutput = Either<InvalidCredentialsError, { jwt: string; refreshToken: string }>;
