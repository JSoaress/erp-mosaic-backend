import { Either } from "ts-arch-kit/dist/core/helpers";

import { DeleteUseCaseInput } from "@/shared/application";
import { NotFoundModelError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type DeleteSkuUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type DeleteSkuUseCaseInput = DeleteUseCaseInput;

export type DeleteSkuUseCaseOutput = Either<NotFoundModelError, void>;
