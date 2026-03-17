import { Either } from "ts-arch-kit/dist/core/helpers";
import { QueryOptions } from "ts-arch-kit/dist/database";

import { NotFoundModelError } from "@/shared/errors";
import { SubscriberWhereRepository } from "@/platform/application/repositories";
import { IRepositoryFactory } from "@/platform/application/repositories/repository-factory";
import { Subscriber } from "@/platform/domain/entities/subscriber";

export type GetSubscriberUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type GetSubscriberUseCaseInput = {
    queryOptions: Omit<QueryOptions<SubscriberWhereRepository>, "pagination">;
};

export type GetSubscriberUseCaseOutput = Either<NotFoundModelError, Subscriber>;
