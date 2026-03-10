import { Either } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";

import { DeleteUseCaseInput } from "@/shared/application";
import { NotFoundModelError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type DeleteModelUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type DeleteModelUseCaseInput = DeleteUseCaseInput & { brandId: PrimaryKey };

export type DeleteModelUseCaseOutput = Either<NotFoundModelError, void>;
