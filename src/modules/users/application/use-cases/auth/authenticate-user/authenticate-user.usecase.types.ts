import { Either } from "ts-arch-kit/dist/core/helpers";

import { IJwt } from "@/shared/application/adapters";
import { InvalidCredentialsError } from "@/shared/errors";
import { Tenant } from "@/system/domain/entities/tenant";

import { IRepositoryFactory } from "../../../repositories";

export type AuthenticateUserUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
    jwtService: IJwt;
};

export type AuthenticateUserUseCaseInput = {
    email: string;
    password: string;
    tenant: Tenant;
};

export type AuthenticateUserUseCaseOutput = Either<InvalidCredentialsError, { jwt: string; refreshToken: string }>;
