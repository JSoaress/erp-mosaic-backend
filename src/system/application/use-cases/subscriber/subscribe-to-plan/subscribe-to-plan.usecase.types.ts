import { Either } from "ts-arch-kit/dist/core/helpers";

import { ValidationError } from "@/shared/errors";
import { IRepositoryFactory } from "@/system/application/repositories/repository-factory";
import { CreateSubscriberDTO, Subscriber } from "@/system/domain/entities/subscriber";

export type SubscribeToPlanUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type SubscribeToPlanUseCaseInput = CreateSubscriberDTO & {
    isTrial: boolean;
};

export type SubscribeToPlanUseCaseOutput = Either<ValidationError, Subscriber>;
