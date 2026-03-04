import { Either } from "ts-arch-kit/dist/core/helpers";

import { ModuleRegistry } from "@/core/module/module-registry";
import { ValidationError } from "@/shared/errors";
import { IRepositoryFactory } from "@/system/application/repositories/repository-factory";
import { CreateSubscriberDTO, Subscriber } from "@/system/domain/entities/subscriber";

export type SubscribeToPlanUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
    moduleRegistry: ModuleRegistry;
};

export type SubscribeToPlanUseCaseInput = CreateSubscriberDTO & {
    isTrial: boolean;
};

export type SubscribeToPlanUseCaseOutput = Either<ValidationError, Subscriber>;
