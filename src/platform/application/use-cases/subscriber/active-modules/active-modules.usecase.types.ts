import { Either } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";

import { ModuleRegistry } from "@/core/module";
import { NotFoundModelError, ValidationError } from "@/shared/errors";
import { IRepositoryFactory } from "@/platform/application/repositories/repository-factory";
import { Subscriber } from "@/platform/domain/entities/subscriber";

export type ActiveModulesUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
    moduleRegistry: ModuleRegistry;
};

export type ActiveModulesUseCaseInput = {
    subscriberId: PrimaryKey;
    modules: string[];
};

export type ActiveModulesUseCaseOutput = Either<NotFoundModelError | ValidationError, Subscriber>;
